import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  statusOptions = [],
  typeOptions = [],
  className = ""
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

  return (
    <Card className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <CollapsibleTrigger asChild>
            <div className={`flex items-center justify-between cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CardTitle className={`text-lg flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                <Filter className="h-5 w-5" />
                <span>الفلاتر</span>
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    نشط
                  </span>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm">
                {isOpen ? 'إخفاء' : 'عرض'}
              </Button>
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              
              {statusOptions.length > 0 && (
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={filters.status || ''} onValueChange={(value) => updateFilter('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">جميع الحالات</SelectItem>
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
                  <Select value={filters.type || ''} onValueChange={(value) => updateFilter('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">جميع الأنواع</SelectItem>
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

            <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} space-x-2 pt-4`}>
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}
              >
                <RotateCcw className="h-4 w-4" />
                <span>مسح الفلاتر</span>
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FilterPanel;