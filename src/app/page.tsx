import { cookies } from "next/headers";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import {
  SESSION_COOKIE_NAME,
  getAuthUserBySessionToken,
} from "@/lib/services/auth";
import { getDashboardSnapshot } from "@/lib/services/dashboard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const initialSnapshot = getDashboardSnapshot();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const initialAuthUser = getAuthUserBySessionToken(token);

  return (
    <DashboardClient
      initialSnapshot={initialSnapshot}
      initialAuthUser={initialAuthUser}
    />
  );
}
