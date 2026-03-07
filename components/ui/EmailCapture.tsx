"use client";

import { useState, type FormEvent } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to email service (ConvertKit, Mailchimp, etc.)
    setSubmitted(true);
  }

  return (
    <section className="bg-cream rounded-2xl px-6 py-12 sm:px-12 sm:py-16 text-center max-w-2xl mx-auto">
      {submitted ? (
        <div className="space-y-3">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
            You're in!
          </h3>
          <p className="font-body text-medium-gray text-base sm:text-lg leading-relaxed">
            Watch your inbox for our next roundup.
          </p>
        </div>
      ) : (
        <>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
            Get our weekly home finds delivered to your inbox
          </h3>

          <p className="font-body text-medium-gray text-base sm:text-lg mt-3 leading-relaxed">
            The best deals, tips, and inspiration — straight from Haven &amp;&nbsp;Home.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center"
          >
            <label htmlFor="email-capture" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-72 rounded-lg border border-clay/30 bg-soft-white px-4 py-2.5 font-body text-charcoal placeholder:text-medium-gray/60 focus:outline-none focus:ring-2 focus:ring-terracotta/40 transition-shadow"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-terracotta px-6 py-2.5 font-body font-medium text-white transition-all duration-200 hover:bg-terracotta-dark hover:shadow-md active:bg-terracotta-dark/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 font-body text-sm text-medium-gray/70">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </>
      )}
    </section>
  );
}
