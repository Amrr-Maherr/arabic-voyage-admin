import { useState, useMemo } from 'react';

interface UseSearchProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  initialSearchTerm?: string;
}

interface UseSearchReturn<T> {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredData: T[];
  clearSearch: () => void;
}

export function useSearch<T>({
  data,
  searchFields,
  initialSearchTerm = ''
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        
        return String(value).toLowerCase().includes(lowercaseSearchTerm);
      });
    });
  }, [data, searchFields, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch
  };
}