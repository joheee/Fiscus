import { redirect } from "next/navigation";
import { getUserSession } from "../lib/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="h-screen flex items-center justify-center bg-blue-accent p-6">
      <div
        className="sm:w-full sm:max-w-md sm:h-fit 
        rounded-lg p-6 bg-background shadow-md w-screen h-full"
      >
        {children}
      </div>
    </main>
  );
}
