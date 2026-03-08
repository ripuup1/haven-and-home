"use client";

import { useState, type FormEvent } from "react";

export default function MiniEmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="rounded-xl border border-clay/20 bg-cream p-6">
      {submitted ? (
        <div className="text-center">
          <h3 className="font-heading text-lg font-bold text-charcoal">
            You&apos;re in!
          </h3>
          <p className="mt-2 font-body text-sm text-medium-gray">
            Watch your inbox for our next roundup.
          </p>
        </div>
      ) : (
        <>
          <h3 className="font-heading text-lg font-bold text-charcoal">
            Get Inspired Weekly
          </h3>
          <p className="mt-2 font-body text-sm text-medium-gray">
            Our best finds, tips, and deals — delivered every Thursday.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-clay/30 bg-soft-white px-3 py-2 font-body text-sm text-charcoal outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-terracotta py-2 font-body text-sm font-bold text-white transition-colors hover:bg-terracotta-dark"
            >
              Subscribe
            </button>
          </form>
        </>
      )}
    </div>
  );
}
