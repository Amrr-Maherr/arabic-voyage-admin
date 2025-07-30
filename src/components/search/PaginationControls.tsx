import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  className?: string;
  isLoading?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  className = "",
  isLoading = false
}) => {
  const isRTL = document.dir === 'rtl';
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between ${isRTL ? 'lg:flex-row-reverse' : ''} space-y-4 lg:space-y-0 gap-4 ${className} ${isLoading ? 'opacity-50' : ''}`}>
      
      {/* Items info and per page selector */}
      <div className={`flex flex-col sm:flex-row items-center ${isRTL ? 'sm:flex-row-reverse space-x-reverse' : ''} space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground`}>
        <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-md">
          <span className="font-medium">
            عرض {startItem.toLocaleString('ar')} - {endItem.toLocaleString('ar')} من {totalItems.toLocaleString('ar')} عنصر
          </span>
        </div>
        
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
          <span className="whitespace-nowrap">عناصر لكل صفحة:</span>
          <Select 
            value={itemsPerPage.toString()} 
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-xs text-muted-foreground">
            صفحة {currentPage.toLocaleString('ar')} من {totalPages.toLocaleString('ar')}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => !isLoading && onPageChange(currentPage - 1)}
                  className={`transition-all ${currentPage === 1 || isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-primary/10'}`}
                />
              </PaginationItem>
              
              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => !isLoading && onPageChange(page as number)}
                      isActive={currentPage === page}
                      className={`cursor-pointer transition-all ${currentPage === page ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => !isLoading && onPageChange(currentPage + 1)}
                  className={`transition-all ${currentPage === totalPages || isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-primary/10'}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {totalPages === 0 && (
        <div className="text-sm text-muted-foreground text-center py-4">
          لا توجد صفحات لعرضها
        </div>
      )}
    </div>
  );
};

export default PaginationControls;