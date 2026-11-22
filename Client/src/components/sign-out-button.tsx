"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setError("");
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();
      if (result.error) {
        setError(result.error.message || "Unable to sign out. Try again.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to sign out. Try again.",
      );
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="sign-out-area">
      {error && <span className="sign-out-error" role="alert">{error}</span>}
      <button
        className="sign-out-button"
        type="button"
        disabled={isSigningOut}
        onClick={signOut}
      >
        {isSigningOut ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
