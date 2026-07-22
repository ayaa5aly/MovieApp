"use client";

import { useState } from "react";
import Link from "next/link";

// Client Component — controlled form inputs need interactivity.
// Wired up to Firebase Auth in Phase 3: Build (core).
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-4xl tracking-wide mb-8 text-center">
        Sign in
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block font-mono text-xs uppercase text-muted mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent-gold"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase text-muted mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent-gold"
          />
        </div>
        <button
          type="submit"
          disabled
          className="w-full py-2 bg-accent text-foreground rounded-sm text-sm opacity-50 cursor-not-allowed"
          title="Wired up once Firebase Auth ships in Phase 3"
        >
          Sign in
        </button>
      </form>
      <p className="mt-6 text-center font-mono text-xs text-muted">
        No account?{" "}
        <Link href="/register" className="text-accent-gold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
