import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  message?: string;
  type?: 'search' | 'filter' | 'pagination' | 'general';
  rows?: number;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  type = 'general',
  rows = 5,
  className = ""
}) => {
  const getLoadingMessage = () => {
    switch (type) {
      case 'search':
        return 'جاري البحث...';
      case 'filter':
        return 'تطبيق الفلاتر...';
      case 'pagination':
        return 'تحميل الصفحة...';
      default:
        return 'جاري التحميل...';
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {/* Loading header */}
        <div className="flex items-center justify-center mb-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span className="text-sm text-muted-foreground">
            {message || getLoadingMessage()}
          </span>
        </div>

        {/* Skeleton rows */}
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              {index < rows - 1 && <Skeleton className="h-px w-full" />}
            </div>
          ))}
        </div>

        {/* Loading progress indicator */}
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-1">
            <div className="bg-primary h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;