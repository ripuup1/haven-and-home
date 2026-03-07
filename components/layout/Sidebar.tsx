import Link from "next/link";

interface SidebarPost {
  slug: string;
  title: string;
  category?: string;
}

interface SidebarProps {
  popularPosts?: SidebarPost[];
}

export default function Sidebar({ popularPosts = [] }: SidebarProps) {
  return (
    <aside className="flex flex-col gap-8">
      {/* Email Signup Card */}
      <div className="rounded-xl bg-cream p-6 border border-clay/15">
        <h3 className="font-heading text-lg font-semibold text-charcoal">
          Get Inspired Weekly
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-medium-gray">
          Simple home ideas, favorite finds, and a little encouragement —
          delivered to your inbox every Friday.
        </p>
        <form
          className="mt-4 flex flex-col gap-3"
          action="#"
          method="POST"
        >
          <label htmlFor="sidebar-email" className="sr-only">
            Email address
          </label>
          <input
            id="sidebar-email"
            name="email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full rounded-lg border border-clay/30 bg-soft-white px-4 py-2.5 font-body text-sm text-charcoal placeholder:text-medium-gray/60 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta transition-colors"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-terracotta px-4 py-2.5 font-body text-sm font-medium text-soft-white transition-colors hover:bg-terracotta-dark focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-cream"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 font-body text-xs text-medium-gray/70">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div>
          <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
            Popular Posts
          </h3>
          <ul className="flex flex-col gap-3">
            {popularPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-lg p-3 transition-colors hover:bg-cream"
                >
                  {post.category && (
                    <span className="font-body text-xs font-medium uppercase tracking-wider text-terracotta">
                      {post.category}
                    </span>
                  )}
                  <p className="font-body text-sm font-medium leading-snug text-charcoal transition-colors group-hover:text-terracotta mt-0.5">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Follow on Pinterest */}
      <div className="rounded-xl bg-cream p-6 border border-clay/15 text-center">
        <h3 className="font-heading text-lg font-semibold text-charcoal">
          Find Us on Pinterest
        </h3>
        <p className="mt-2 font-body text-sm text-medium-gray">
          Boards full of home inspiration, room makeovers, and curated finds.
        </p>
        <a
          href="https://pinterest.com/havenandhomeco"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-charcoal px-5 py-2.5 font-body text-sm font-medium text-soft-white transition-colors hover:bg-charcoal/85 focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2 focus:ring-offset-cream"
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
    </aside>
  );
}
