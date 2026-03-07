import EmailCapture from "@/components/ui/EmailCapture";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "About",
};

const offerings = [
  {
    icon: "📋",
    title: "Product Reviews",
    description:
      "Honest, detailed reviews of home products we've actually used. No fluff, no filler — just the truth about what's worth your money.",
  },
  {
    icon: "✨",
    title: "Organization Tips",
    description:
      "Practical systems and storage solutions that actually stick. We focus on methods that work for real life, not just Instagram photos.",
  },
  {
    icon: "🏠",
    title: "Room Makeovers",
    description:
      "Step-by-step transformations that prove you don't need a huge budget to make a big impact. Real rooms, real budgets, real results.",
  },
  {
    icon: "💰",
    title: "Budget-Friendly Finds",
    description:
      "The best home products at every price point. We scour Amazon so you don't have to, finding pieces that look high-end without the price tag.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-soft-white">
      {/* Hero Section */}
      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h1 className="font-heading text-4xl font-bold text-charcoal sm:text-5xl lg:text-6xl">
              About Haven &amp; Home
            </h1>
            <p className="mt-4 font-accent text-xl italic text-medium-gray sm:text-2xl">
              Creating spaces worth coming home to.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="space-y-6 font-body text-base leading-relaxed text-medium-gray sm:text-lg">
              <p>
                Haven &amp; Home started with a simple belief: everyone deserves
                a space that feels like a retreat. We know how overwhelming it
                can be to sort through thousands of products, trends, and
                opinions when all you really want is a home that feels calm,
                beautiful, and unmistakably yours. That&apos;s why we started
                this site — to cut through the noise and share what actually
                works.
              </p>
              <p>
                We spend hours researching, testing, and living with the products
                we recommend. Every item featured on Haven &amp; Home has been
                personally vetted by our team. If we wouldn&apos;t put it in our
                own home, we won&apos;t recommend it for yours. From kitchen
                organization systems to cozy bedroom essentials, we focus on
                pieces that are well-made, thoughtfully designed, and
                budget-friendly — because creating a beautiful home shouldn&apos;t
                mean emptying your savings account.
              </p>
              <p>
                Whether you&apos;re tackling your first apartment, refreshing a
                room that&apos;s felt &ldquo;off&rdquo; for years, or just looking for
                that one perfect piece to tie everything together, we&apos;re here
                to help. Think of us as that friend who always knows where to
                find the good stuff — the one you text before you buy anything
                for your home. Welcome in. We&apos;re glad you&apos;re here.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What You'll Find Here */}
      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-charcoal text-center sm:text-4xl">
              What You&apos;ll Find Here
            </h2>
            <p className="mt-3 text-center font-body text-medium-gray text-lg max-w-2xl mx-auto">
              Everything you need to create a home you love — without the
              guesswork.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {offerings.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <article className="flex flex-col rounded-xl border border-clay/15 bg-soft-white p-6 sm:p-8 transition-shadow duration-300 hover:shadow-md">
                  <span className="text-3xl" role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-medium-gray sm:text-base">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-soft-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <EmailCapture />
        </ScrollReveal>
      </section>

      {/* Affiliate Disclosure */}
      <section className="border-t border-clay/15 bg-soft-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-lg bg-cream/60 p-6">
              <h3 className="font-heading text-base font-semibold text-charcoal">
                Affiliate Disclosure
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-medium-gray">
                Haven &amp; Home is a participant in the Amazon Services LLC
                Associates Program, an affiliate advertising program designed to
                provide a means for sites to earn advertising fees by advertising
                and linking to Amazon.com. When you purchase through our links, we
                may earn a small commission at no extra cost to you. This helps us
                keep the site running and continue creating content. We only
                recommend products we genuinely believe in and have personally
                vetted. Your trust means everything to us.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
