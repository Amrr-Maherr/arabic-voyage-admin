import { useState, useMemo } from 'react';

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface UseSortProps<T> {
  data: T[];
  initialSort?: SortConfig;
}

interface UseSortReturn<T> {
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  sortedData: T[];
  toggleSort: (field: string) => void;
}

export function useSort<T>({
  data,
  initialSort = { field: 'date', direction: 'desc' }
}: UseSortProps<T>): UseSortReturn<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSort);

  const sortedData = useMemo(() => {
    if (!sortConfig.field) return data;

    return [...data].sort((a: any, b: any) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Handle different types of values
      let comparison = 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // Convert to string for comparison
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const toggleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
    sortConfig,
    setSortConfig,
    sortedData,
    toggleSort
  };
}