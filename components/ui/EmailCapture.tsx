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
        <div className="space-y-4">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
            You're in!
          </h3>
          <p className="font-body text-medium-gray text-base sm:text-lg leading-relaxed">
            Watch your inbox for our next roundup.
          </p>
          <div className="pt-2">
            <p className="font-body text-sm text-medium-gray">
              Want daily inspiration too?
            </p>
            <a
              href="https://pinterest.com/havenandhomeco"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-charcoal px-5 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-charcoal/80"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Follow @havenandhomeco
            </a>
          </div>
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
