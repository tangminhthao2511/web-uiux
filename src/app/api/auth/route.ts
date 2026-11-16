import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  GUEST_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  deleteAuthSession,
  getAuthUserBySessionToken,
  loginAuthUser,
  registerAuthUser,
} from "@/lib/services/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const user = getAuthUserBySessionToken(token);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to read auth session:", error);
    return NextResponse.json(
      { error: "Không thể kiểm tra trạng thái đăng nhập." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = body.action;

    if (typeof action !== "string") {
      return NextResponse.json(
        { error: "Thiếu hành động xác thực." },
        { status: 400 }
      );
    }

    if (action === "login") {
      const identifier =
        typeof body.identifier === "string" ? body.identifier : "";
      const password = typeof body.password === "string" ? body.password : "";
      const rememberMe =
        typeof body.rememberMe === "boolean" ? body.rememberMe : true;

      const { user, token, maxAgeSeconds } = loginAuthUser({
        identifier,
        password,
        rememberMe,
      });

      const response = NextResponse.json({ user });
      response.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        ...(maxAgeSeconds ? { maxAge: maxAgeSeconds } : {}),
      });
      response.cookies.delete(GUEST_COOKIE_NAME);
      return response;
    }

    if (action === "register") {
      const identifier =
        typeof body.identifier === "string" ? body.identifier : "";
      const password = typeof body.password === "string" ? body.password : "";
      const displayName =
        typeof body.displayName === "string" ? body.displayName : "";
      const rememberMe =
        typeof body.rememberMe === "boolean" ? body.rememberMe : true;

      const { user, token, maxAgeSeconds } = registerAuthUser({
        identifier,
        password,
        displayName,
        rememberMe,
      });

      const response = NextResponse.json({ user });
      response.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        ...(maxAgeSeconds ? { maxAge: maxAgeSeconds } : {}),
      });
      response.cookies.delete(GUEST_COOKIE_NAME);
      return response;
    }

    if (action === "guest") {
      const response = NextResponse.json({ guest: true });
      response.cookies.set(GUEST_COOKIE_NAME, "1", {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    }

    if (action === "logout") {
      const cookieStore = await cookies();
      const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
      deleteAuthSession(token);
      const response = NextResponse.json({ ok: true });
      response.cookies.delete(SESSION_COOKIE_NAME);
      response.cookies.delete(GUEST_COOKIE_NAME);
      return response;
    }

    return NextResponse.json(
      { error: "Hành động xác thực không được hỗ trợ." },
      { status: 400 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể xử lý đăng nhập.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
