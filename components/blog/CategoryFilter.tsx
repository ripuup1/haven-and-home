"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:overflow-visible sm:pb-0">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`shrink-0 rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-terracotta text-white"
                  : "bg-cream text-charcoal hover:text-terracotta"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
