"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type AuthPanelProps = {
  googleEnabled: boolean;
};

export function AuthPanel({ googleEnabled }: AuthPanelProps) {
  const router = useRouter();
  const { data: session, isPending: isCheckingSession } =
    authClient.useSession();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [router, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result =
        mode === "sign-in"
          ? await authClient.signIn.email({
              email,
              password,
              callbackURL: "/dashboard",
            })
          : await authClient.signUp.email({
              name,
              email,
              password,
              callbackURL: "/dashboard",
            });

      if (result.error) {
        setError(result.error.message || "Unable to authenticate. Try again.");
        return;
      }

      router.push("/dashboard");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to authenticate. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(result.error.message || "Google sign-in failed. Try again.");
        setIsSubmitting(false);
      }
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Google sign-in failed. Try again.",
      );
      setIsSubmitting(false);
    }
  }

  if (isCheckingSession || session) {
    return (
      <main className="auth-loading" aria-live="polite">
        <span className="loading-mark" aria-hidden="true" />
        <p>Getting things ready…</p>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <section className="auth-story" aria-label="About Summora">
        <Link className="wordmark" href="/" aria-label="Summora home">
          <span className="wordmark-icon" aria-hidden="true">
            s
          </span>
          summora
        </Link>
        <div className="story-copy">
          <span className="eyebrow">A little more clarity</span>
          <h1>Make space for what matters.</h1>
          <p>
            Your ideas, notes, and next steps — together in one calm place.
          </p>
        </div>
        <div className="story-decoration" aria-hidden="true">
          <span className="decoration-orbit orbit-one" />
          <span className="decoration-orbit orbit-two" />
          <span className="decoration-orbit orbit-three" />
          <span className="decoration-sun" />
          <span className="decoration-dot dot-one" />
          <span className="decoration-dot dot-two" />
        </div>
        <p className="story-footer">A softer way to get things done.</p>
      </section>

      <section className="auth-content">
        <div className="auth-card">
          <div className="mobile-wordmark">
            <span className="wordmark-icon" aria-hidden="true">
              s
            </span>
            summora
          </div>
          <div className="auth-heading">
            <span className="eyebrow">
              {mode === "sign-in" ? "WELCOME BACK" : "GET STARTED"}
            </span>
            <h2>
              {mode === "sign-in" ? "Sign in to Summora" : "Create your account"}
            </h2>
            <p>
              {mode === "sign-in"
                ? "Pick up right where you left off."
                : "A clearer headspace is just around the corner."}
            </p>
          </div>

          {googleEnabled && (
            <>
              <button
                className="google-button"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <div className="divider">
                <span>or continue with email</span>
              </div>
            </>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "sign-up" && (
              <label className="field">
                <span>Your name</span>
                <input
                  autoComplete="name"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Alex Morgan"
                  required
                  value={name}
                />
              </label>
            )}
            <label className="field">
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                autoComplete={
                  mode === "sign-in" ? "current-password" : "new-password"
                }
                minLength={8}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                required
                type="password"
                value={password}
              />
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Please wait…"
                : mode === "sign-in"
                  ? "Sign in"
                  : "Create account"}
              {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "sign-in"
              ? "New to Summora?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode(mode === "sign-in" ? "sign-up" : "sign-in");
              }}
            >
              {mode === "sign-in" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
        <p className="legal-note">Securely access your personal Summora space.</p>
      </section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="google-icon" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        transform="translate(0 4)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.71 5.98c4.5-4.16 7.08-10.29 7.08-17.63Z"
        transform="translate(0 0)"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
        transform="translate(0 4)"
      />
      <path
        fill="#34A853"
        d="M24 48c6.47 0 11.91-2.13 15.88-5.82l-7.71-5.98c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
        transform="translate(0 -4)"
      />
    </svg>
  );
}
