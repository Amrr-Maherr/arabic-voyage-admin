
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import LimousineForm from './limousines/LimousineForm';
import LimousineTable from './limousines/LimousineTable';
import SearchBar from './search/SearchBar';
import FilterPanel from './search/FilterPanel';
import SortControls from './search/SortControls';
import PaginationControls from './search/PaginationControls';
import { useSearch } from '@/hooks/useSearch';
import { useFilter } from '@/hooks/useFilter';
import { useSort } from '@/hooks/useSort';
import { usePagination } from '@/hooks/usePagination';

interface LimousinesPageProps {
  isEmployee?: boolean;
}

const LimousinesPage: React.FC<LimousinesPageProps> = ({ isEmployee = false }) => {
  const isRTL = document.dir === 'rtl';
  const [showAddForm, setShowAddForm] = useState(false);

  const limousines = [
    {
      id: 1,
      carType: 'مرسيدس S-Class',
      model: '2023',
      driverName: 'أحمد زكي',
      contact: '+20 123 456 789',
      pricePerHour: 50,
      route: 'القاهرة - الجيزة',
      date: '2025-06-05',
      status: 'نشط',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300'
    },
    {
      id: 2,
      carType: 'بي إم دبليو 7 Series',
      model: '2023',
      driverName: 'محمد علي',
      contact: '+20 123 456 790',
      pricePerHour: 45,
      route: 'مطار القاهرة - وسط المدينة',
      date: '2025-06-05',
      status: 'نشط',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300'
    },
    {
      id: 3,
      carType: 'أودي A8',
      model: '2022',
      driverName: 'حسن عمر',
      contact: '+20 123 456 791',
      pricePerHour: 55,
      route: 'الإسكندرية - القاهرة',
      date: '2025-06-06',
      status: 'صيانة',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300'
    }
  ];

  const handleEdit = (limoId: number) => {
    if (!isEmployee) {
      console.log('Editing limousine:', limoId);
    }
  };

  const handleDelete = (limoId: number) => {
    if (!isEmployee) {
      console.log('Deleting limousine:', limoId);
    }
  };

  // Search, Filter, Sort, and Pagination
  const { searchTerm, setSearchTerm, filteredData: searchedData } = useSearch({
    data: limousines,
    searchFields: ['carType', 'driverName', 'route']
  });

  const statusOptions = [
    { value: 'نشط', label: 'نشط' },
    { value: 'صيانة', label: 'صيانة' }
  ];

  const { filters, setFilters, filteredData } = useFilter({
    data: searchedData
  });

  const sortOptions = [
    { value: 'carType', label: 'نوع السيارة' },
    { value: 'driverName', label: 'اسم السائق' },
    { value: 'pricePerHour', label: 'السعر بالساعة' },
    { value: 'date', label: 'التاريخ' }
  ];

  const { sortConfig, setSortConfig, sortedData } = useSort({
    data: filteredData,
    initialSort: { field: 'date', direction: 'desc' }
  });

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
    setItemsPerPage
  } = usePagination({
    data: sortedData,
    initialItemsPerPage: 10
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new limousine');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEmployee ? 'الليموزين' : 'إدارة الليموزين'}
          </h1>
          <p className="text-gray-600">
            {isEmployee ? 'عرض خدمات الليموزين المتاحة' : 'إدارة أسطول النقل الفاخر الخاص بك'}
          </p>
        </div>
        {!isEmployee && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة ليموزين</span>
          </button>
        )}
      </div>

      {/* نموذج إضافة ليموزين */}
      {showAddForm && !isEmployee && (
        <LimousineForm 
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* أدوات البحث والفلترة */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث في الليموزين..."
          />
          <SortControls
            sortConfig={sortConfig}
            onSortChange={setSortConfig}
            sortOptions={sortOptions}
          />
        </div>
        
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          statusOptions={statusOptions}
        />
      </div>

      {/* عداد النتائج */}
      <div className="text-sm text-muted-foreground">
        عرض {paginatedData.length} من {totalItems} ليموزين
      </div>

      {/* جدول الليموزين */}
      <LimousineTable 
        limousines={paginatedData}
        isEmployee={isEmployee}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* أدوات التنقل بين الصفحات */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={goToPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default LimousinesPage;
