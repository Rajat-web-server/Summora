import { AuthPanel } from "@/components/auth-panel";

export const dynamic = "force-dynamic";

export default function Home() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return <AuthPanel googleEnabled={googleEnabled} />;
}
