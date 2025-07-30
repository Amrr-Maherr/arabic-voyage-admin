import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  showResetFilters?: boolean;
  onResetFilters?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "لا توجد نتائج",
  description = "لم نتمكن من العثور على أي عناصر تطابق البحث أو الفلاتر المحددة",
  icon,
  actionLabel,
  onAction,
  showResetFilters = false,
  onResetFilters,
  className = ""
}) => {
  const isRTL = document.dir === 'rtl';

  return (
    <Card className={`${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-4 opacity-40">
          {icon || <Search className="h-16 w-16" />}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
          {description}
        </p>

        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} flex-wrap gap-3 justify-center`}>
          {showResetFilters && onResetFilters && (
            <Button
              variant="outline"
              onClick={onResetFilters}
              className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}
            >
              <RotateCcw className="h-4 w-4" />
              <span>مسح الفلاتر</span>
            </Button>
          )}
          
          {actionLabel && onAction && (
            <Button onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>

        <div className="mt-6 text-xs text-muted-foreground space-y-1">
          <p>نصائح للبحث:</p>
          <ul className="list-disc list-inside space-y-0.5 text-muted-foreground/80">
            <li>تأكد من صحة الإملاء</li>
            <li>جرب كلمات مختلفة أو أقل تحديداً</li>
            <li>تحقق من الفلاتر المطبقة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;