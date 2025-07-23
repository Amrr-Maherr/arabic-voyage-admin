import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface SortOption {
  value: string;
  label: string;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface SortControlsProps {
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
  sortOptions: SortOption[];
  className?: string;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortConfig,
  onSortChange,
  sortOptions,
  className = ""
}) => {
  const isRTL = document.dir === 'rtl';

  const handleFieldChange = (field: string) => {
    onSortChange({
      field,
      direction: sortConfig.direction
    });
  };

  const toggleDirection = () => {
    onSortChange({
      field: sortConfig.field,
      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = () => {
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="h-4 w-4" />;
    } else {
      return <ArrowDown className="h-4 w-4" />;
    }
  };

  return (
    <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2 ${className}`}>
      <span className="text-sm text-muted-foreground">ترتيب حسب:</span>
      
      <Select value={sortConfig.field} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="اختر الحقل" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleDirection}
        className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-1`}
      >
        {getSortIcon()}
        <span className="text-xs">
          {sortConfig.direction === 'asc' ? 'تصاعدي' : 'تنازلي'}
        </span>
      </Button>
    </div>
  );
};

export default SortControls;