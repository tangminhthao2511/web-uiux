import crypto from "node:crypto";
import { getDb } from "@/lib/db/sqlite";

export interface AuthUser {
  id: string;
  identifier: string;
  displayName: string;
}

export const SESSION_COOKIE_NAME = "meow_session";
export const GUEST_COOKIE_NAME = "meow_guest";
const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;
const SESSION_ONE_DAY_SECONDS = 60 * 60 * 24;

function normalizeIdentifier(raw: string): string {
  return raw.trim().toLowerCase();
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 2) return false;
  const [salt, originalHex] = parts;
  if (!salt || !originalHex) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const original = Buffer.from(originalHex, "hex");
  if (derived.length !== original.length) return false;
  return crypto.timingSafeEqual(derived, original);
}

function createSessionForUser(
  userId: string,
  rememberMe: boolean
): { token: string; maxAgeSeconds?: number } {
  const db = getDb();
  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date();
  const ttlSeconds = rememberMe ? THIRTY_DAYS_SECONDS : SESSION_ONE_DAY_SECONDS;
  const expiresAt = new Date(now.getTime() + ttlSeconds * 1000).toISOString();

  db.prepare(
    `INSERT INTO auth_sessions (token, user_id, remember_me, expires_at, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(token, userId, rememberMe ? 1 : 0, expiresAt, now.toISOString());

  return {
    token,
    maxAgeSeconds: rememberMe ? THIRTY_DAYS_SECONDS : undefined,
  };
}

function syncProfileDisplayName(displayName: string): void {
  const db = getDb();
  db.prepare(
    "UPDATE user_profile SET name = ?, updated_at = ? WHERE id = 'primary-learner'"
  ).run(displayName, new Date().toISOString());
}

export function registerAuthUser(input: {
  identifier: string;
  password: string;
  displayName?: string;
  rememberMe?: boolean;
}): { user: AuthUser; token: string; maxAgeSeconds?: number } {
  const identifier = normalizeIdentifier(input.identifier);
  if (identifier.length < 3 || /\s/.test(identifier)) {
    throw new Error(
      "Email hoặc tên đăng nhập cần tối thiểu 3 ký tự và không chứa khoảng trắng."
    );
  }
  if (input.password.length < 6) {
    throw new Error("Mật khẩu cần tối thiểu 6 ký tự.");
  }

  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM auth_users WHERE identifier = ?")
    .get(identifier) as { id: string } | undefined;
  if (existing) {
    throw new Error("Email hoặc tên đăng nhập này đã được đăng ký.");
  }

  const rawDisplay = (input.displayName ?? "").trim();
  const fallbackName = identifier.includes("@")
    ? identifier.split("@")[0]
    : identifier;
  const displayName = rawDisplay.length >= 2 ? rawDisplay : fallbackName;

  const id = `usr-${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  const passwordHash = hashPassword(input.password);

  db.prepare(
    `INSERT INTO auth_users (id, identifier, display_name, password_hash, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, identifier, displayName, passwordHash, now, now);

  syncProfileDisplayName(displayName);
  const rememberMe = input.rememberMe !== false;
  const { token, maxAgeSeconds } = createSessionForUser(id, rememberMe);

  return {
    user: { id, identifier, displayName },
    token,
    maxAgeSeconds,
  };
}

export function loginAuthUser(input: {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}): { user: AuthUser; token: string; maxAgeSeconds?: number } {
  const identifier = normalizeIdentifier(input.identifier);
  if (!identifier || !input.password) {
    throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
  }

  const db = getDb();
  const row = db
    .prepare(
      `SELECT id, identifier, display_name, password_hash
       FROM auth_users
       WHERE identifier = ?`
    )
    .get(identifier) as
    | {
        id: string;
        identifier: string;
        display_name: string;
        password_hash: string;
      }
    | undefined;

  if (!row || !verifyPassword(input.password, row.password_hash)) {
    throw new Error("Email/tên đăng nhập hoặc mật khẩu chưa chính xác.");
  }

  syncProfileDisplayName(row.display_name);
  const rememberMe = input.rememberMe !== false;
  const { token, maxAgeSeconds } = createSessionForUser(row.id, rememberMe);

  return {
    user: {
      id: row.id,
      identifier: row.identifier,
      displayName: row.display_name,
    },
    token,
    maxAgeSeconds,
  };
}

export function getAuthUserBySessionToken(
  token: string | undefined
): AuthUser | null {
  if (!token) return null;
  const db = getDb();
  const row = db
    .prepare(
      `SELECT s.expires_at, u.id, u.identifier, u.display_name
       FROM auth_sessions s
       JOIN auth_users u ON u.id = s.user_id
       WHERE s.token = ?`
    )
    .get(token) as
    | {
        expires_at: string;
        id: string;
        identifier: string;
        display_name: string;
      }
    | undefined;

  if (!row) return null;
  if (new Date(row.expires_at).getTime() <= Date.now()) {
    db.prepare("DELETE FROM auth_sessions WHERE token = ?").run(token);
    return null;
  }

  return {
    id: row.id,
    identifier: row.identifier,
    displayName: row.display_name,
  };
}

export function deleteAuthSession(token: string | undefined): void {
  if (!token) return;
  const db = getDb();
  db.prepare("DELETE FROM auth_sessions WHERE token = ?").run(token);
}
