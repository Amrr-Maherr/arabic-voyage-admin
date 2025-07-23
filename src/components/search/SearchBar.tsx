import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "البحث...",
  className = ""
}) => {
  const isRTL = document.dir === 'rtl';

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className={`absolute top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${isRTL ? 'left-2' : 'right-2'}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;