import { cookies } from "next/headers";
import { LoginClient } from "@/components/auth/LoginClient";
import {
  SESSION_COOKIE_NAME,
  getAuthUserBySessionToken,
} from "@/lib/services/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const initialUser = getAuthUserBySessionToken(token);

  return <LoginClient initialUser={initialUser} />;
}
