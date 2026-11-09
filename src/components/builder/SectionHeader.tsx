import React from 'react';
import { Plus } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  onAdd,
  addLabel = 'Add Entry',
}) => {
  return (
    <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>

      {onAdd && (
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{addLabel}</span>
        </button>
      )}
    </div>
  );
};

