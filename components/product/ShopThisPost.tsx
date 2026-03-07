interface ShopThisPostProduct {
  name: string;
  price: string;
  affiliateUrl: string;
}

interface ShopThisPostProps {
  products: ShopThisPostProduct[];
}

export default function ShopThisPost({ products }: ShopThisPostProps) {
  if (products.length === 0) return null;

  return (
    <aside className="rounded-xl border border-[#e5ddd0] bg-cream p-5">
      <h3 className="font-heading text-lg font-bold text-charcoal mb-4">
        Shop This Post
      </h3>

      <ul className="space-y-3">
        {products.map((product) => (
          <li key={product.affiliateUrl}>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-soft-white"
            >
              <span className="font-body text-sm font-medium leading-snug text-charcoal transition-colors duration-200 group-hover:text-terracotta">
                {product.name}
              </span>
              <span className="shrink-0 font-body text-sm font-bold text-terracotta">
                {product.price}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-[#e5ddd0] pt-3 font-body text-[11px] leading-relaxed text-medium-gray">
        As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </aside>
  );
}
