import React from 'react';
import { Filter, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

export interface FilterOptions {
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  amountFrom?: number;
  amountTo?: number;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  statusOptions?: Array<{ value: string; label: string }>;
  typeOptions?: Array<{ value: string; label: string }>;
  className?: string;
  isLoading?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  statusOptions = [],
  typeOptions = [],
  className = "",
  isLoading = false
}) => {
  const isRTL = document.dir === 'rtl';
  const [isOpen, setIsOpen] = React.useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');
  const activeFiltersCount = Object.values(filters).filter(value => value !== undefined && value !== '').length;

  return (
    <Card className={`${className} transition-all duration-200 ${hasActiveFilters ? 'ring-1 ring-primary/20 shadow-md' : ''}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <CollapsibleTrigger asChild>
            <div className={`flex items-center justify-between cursor-pointer group ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CardTitle className={`text-lg flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                <Filter className={`h-5 w-5 transition-colors group-hover:text-primary ${hasActiveFilters ? 'text-primary' : ''}`} />
                <span>الفلاتر</span>
                {hasActiveFilters && (
                  <Badge variant="default" className="text-xs animate-fade-in">
                    {activeFiltersCount} نشط
                  </Badge>
                )}
              </CardTitle>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10">
                  {isOpen ? 'إخفاء' : 'عرض'}
                  {isOpen ? (
                    <ChevronUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  )}
                </Button>
              </div>
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="mr-2 text-sm text-muted-foreground">تحديث الفلاتر...</span>
              </div>
            )}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${isRTL ? 'text-right' : 'text-left'} ${isLoading ? 'opacity-50' : ''}`}>
              
              {statusOptions.length > 0 && (
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value === 'all' ? undefined : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {typeOptions.length > 0 && (
                <div className="space-y-2">
                  <Label>النوع</Label>
                  <Select value={filters.type || 'all'} onValueChange={(value) => updateFilter('type', value === 'all' ? undefined : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>من تاريخ</Label>
                <Input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>إلى تاريخ</Label>
                <Input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>المبلغ من</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.amountFrom || ''}
                  onChange={(e) => updateFilter('amountFrom', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>

              <div className="space-y-2">
                <Label>المبلغ إلى</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.amountTo || ''}
                  onChange={(e) => updateFilter('amountTo', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} flex-wrap gap-2 pt-4 border-t`}>
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters || isLoading}
                className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2 hover:bg-destructive/10 hover:text-destructive transition-colors`}
              >
                <RotateCcw className="h-4 w-4" />
                <span>مسح الفلاتر</span>
              </Button>
              {hasActiveFilters && (
                <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} flex-wrap gap-1`}>
                  {Object.entries(filters).map(([key, value]) => {
                    if (value === undefined || value === '') return null;
                    return (
                      <Badge
                        key={key}
                        variant="secondary"
                        className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => updateFilter(key as keyof FilterOptions, undefined)}
                      >
                        {key === 'status' && statusOptions.find(opt => opt.value === value)?.label}
                        {key === 'type' && typeOptions.find(opt => opt.value === value)?.label}
                        {key === 'dateFrom' && `من: ${value}`}
                        {key === 'dateTo' && `إلى: ${value}`}
                        {key === 'amountFrom' && `المبلغ من: ${value}`}
                        {key === 'amountTo' && `المبلغ إلى: ${value}`}
                        <span className="mr-1">×</span>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FilterPanel;