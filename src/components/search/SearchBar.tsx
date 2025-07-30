import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "البحث...",
  className = "",
  isLoading = false,
  disabled = false
}) => {
  const isRTL = document.dir === 'rtl';

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        {isLoading ? (
          <Loader2 className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary animate-spin ${isRTL ? 'right-3' : 'left-3'}`} />
        ) : (
          <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors ${value ? 'text-primary' : ''} ${isRTL ? 'right-3' : 'left-3'}`} />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isLoading}
          className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} transition-all duration-200 ${value ? 'ring-1 ring-primary/20' : ''} ${disabled ? 'opacity-50' : ''}`}
        />
        {value && !isLoading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            disabled={disabled}
            className={`absolute top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors ${isRTL ? 'left-2' : 'right-2'}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      {value && (
        <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 text-xs text-muted-foreground`}>
          البحث عن: "{value}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;