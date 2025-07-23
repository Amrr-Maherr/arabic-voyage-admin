import { useState, useMemo } from 'react';

export interface FilterOptions {
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  amountFrom?: number;
  amountTo?: number;
  [key: string]: any;
}

interface UseFilterProps<T> {
  data: T[];
  initialFilters?: FilterOptions;
}

interface UseFilterReturn<T> {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  filteredData: T[];
  clearFilters: () => void;
  updateFilter: (key: string, value: any) => void;
}

export function useFilter<T>({
  data,
  initialFilters = {}
}: UseFilterProps<T>): UseFilterReturn<T> {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      // Status filter
      if (filters.status && item.status !== filters.status) {
        return false;
      }

      // Type filter
      if (filters.type && item.type !== filters.type) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        const itemDate = new Date(item.date);
        
        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          if (itemDate < fromDate) return false;
        }
        
        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          if (itemDate > toDate) return false;
        }
      }

      // Amount range filter
      if (filters.amountFrom !== undefined || filters.amountTo !== undefined) {
        const amount = item.amount || item.pricePerHour || item.pricePerNight || 0;
        
        if (filters.amountFrom !== undefined && amount < filters.amountFrom) {
          return false;
        }
        
        if (filters.amountTo !== undefined && amount > filters.amountTo) {
          return false;
        }
      }

      // Custom filters
      for (const [key, value] of Object.entries(filters)) {
        if (!['status', 'type', 'dateFrom', 'dateTo', 'amountFrom', 'amountTo'].includes(key)) {
          if (value && item[key] !== value) {
            return false;
          }
        }
      }

      return true;
    });
  }, [data, filters]);

  const clearFilters = () => {
    setFilters({});
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    filters,
    setFilters,
    filteredData,
    clearFilters,
    updateFilter
  };
}