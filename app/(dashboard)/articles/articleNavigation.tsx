'use client';

interface ArticleNavigationProps {
  categories: string[];
  onCategoryChangeAction: (category: string | null) => void;
  activeCategory: string | null;
}

export function ArticleNavigation({
  categories,
  onCategoryChangeAction,
  activeCategory
}: ArticleNavigationProps) {
  return (
    <div className="mb-6">
      {/* Top navigation bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <nav className="felx felx-wrap gap-52" aria-label="Categories">
            <button
              onClick={() => onCategoryChangeAction(null)}
              className={`p-4 py-2 rounded-md font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              All Articles
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChangeAction(category)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
