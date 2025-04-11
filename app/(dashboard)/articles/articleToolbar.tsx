'use client';

interface ArticleToolbarProps {
  categories: string[];
  onCategoryChangeAction: (category: string | null) => void; // Renamed prop
  activeCategory: string | null;
}

export function ArticleToolbar({
  categories,
  onCategoryChangeAction, // Renamed prop
  activeCategory
}: ArticleToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button
        onClick={() => onCategoryChangeAction(null)} // Updated function call
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          activeCategory === null
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChangeAction(category)} // Updated function call
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
