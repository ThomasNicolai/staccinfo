'use client';

import {
  BarChart,
  LineChart,
  FileText,
  Database,
  Settings,
  LayoutGrid
} from 'lucide-react';

interface TagFilterProps {
  selectedTag: string | null;
  onSelectTagAction: (tag: string | null) => void;
  icons?: Record<string, React.ReactNode | string>;
}

export default function TagFilterToolbar({
  selectedTag,
  onSelectTagAction,
  icons = {}
}: TagFilterProps) {
  const staticTags = [
    'Escali Financials',
    'Escali Risk Management',
    'Reports',
    'Data Manager',
    'Andre Tjenester'
  ];

  const defaultIcons: Record<string, React.ReactNode> = {
    'Escali Financials': <BarChart className="w-5 h-5" />,
    'Escali Risk Management': <LineChart className="w-5 h-5" />,
    Reports: <FileText className="w-5 h-5" />,
    'Data Manager': <Database className="w-5 h-5" />,
    'Andre Tjenester': <Settings className="w-5 h-5" />
  };

  const handleTagClick = (tag: string | null) => {
    if (tag === selectedTag) {
      onSelectTagAction(null);
    } else {
      onSelectTagAction(tag);
    }
  };

  // Update the button styling to maintain consistent sizing

  return (
    <div className="flex flex-wrap rounded-xl w-full bg-background dark:bg-background h-14 shadow-lg justify-center md:justify-between">
      {/* "All" option at the beginning */}
      <button
        onClick={() => handleTagClick(null)}
        className={`cursor-pointer transition-colors duration-200 mr-1 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center font-medium ${
          selectedTag === null
            ? 'bg-primary dark:bg-secondary text-primary-foreground dark:text-secondary-foreground'
            : 'hover:text-blue-500'
        }`}
      >
        <span
          className={`flex items-center justify-center transition duration-200 ${
            selectedTag === null
              ? 'text-primary-foreground dark:text-secondary-foreground'
              : ''
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
        </span>
        <span className="ml-2">All</span>
      </button>

      {/* Static tag filters */}
      {staticTags.map((tag, index) => {
        const isActive = selectedTag === tag;
        const tagIcon = icons[tag] || defaultIcons[tag];

        return (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`cursor-pointer transition-colors duration-200 mr-1 w-full gap-2 text-center rounded-xl flex-1 flex items-center justify-center font-medium ${
              isActive
                ? 'bg-primary dark:bg-secondary text-primary-foreground dark:text-secondary-foreground'
                : 'hover:text-blue-500'
            }`}
          >
            <span
              className={`flex items-center justify-center transition duration-200 ${
                isActive
                  ? 'text-primary-foreground dark:text-secondary-foreground'
                  : ''
              }`}
            >
              {typeof tagIcon === 'string' ? (
                <img src={tagIcon} alt={`${tag} icon`} className="w-5 h-5" />
              ) : tagIcon ? (
                tagIcon
              ) : (
                <span className="w-5 h-5 flex items-center justify-center">
                  •
                </span>
              )}
            </span>
            <span className="ml-2">{tag}</span>
          </button>
        );
      })}
    </div>
  );
}
