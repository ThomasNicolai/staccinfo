import React from 'react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-2 bg-blue-600/10 p-3 rounded-lg border border-blue-600/20 hover:bg-blue-600/20 transition-colors">
      {icon}
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</span>
    </div>
  );
};  