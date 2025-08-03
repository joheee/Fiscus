// Location: app/(protected)/layout.tsx

import { redirect } from "next/navigation";
import { getUserSession } from "../lib/session";
import ProtectedLayoutClient from "./ProtectedLayoutClient";

/**
 * This is the main server-side layout for all protected routes.
 * Its primary job is to verify the user's session. If the user is
 * not authenticated, it redirects them to the login page.
 *
 * It then renders the client-side layout component which handles
 * the interactive navbar and sidebar.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <ProtectedLayoutClient session={session}>{children}</ProtectedLayoutClient>
  );
}
