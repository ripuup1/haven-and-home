import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-soft-white/90 shadow-sm backdrop-blur-sm px-8 py-16 text-center sm:px-16">
        <h1 className="font-heading text-5xl font-bold text-charcoal md:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md font-body text-lg text-medium-gray">
          It looks like this page has moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-terracotta px-8 py-3 font-body text-sm font-semibold tracking-wide text-soft-white transition-colors duration-200 hover:bg-terracotta-dark"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
