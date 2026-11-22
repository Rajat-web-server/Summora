import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <Link className="wordmark" href="/" aria-label="Summora home">
          <span className="wordmark-icon" aria-hidden="true">
            s
          </span>
          summora
        </Link>
        <SignOutButton />
      </header>
      <section className="dashboard-welcome">
        <span className="eyebrow">YOUR SPACE</span>
        <h1>Welcome, {session.user.name || session.user.email}.</h1>
        <p>You’re signed in and ready to make space for what matters.</p>
      </section>
    </main>
  );
}
