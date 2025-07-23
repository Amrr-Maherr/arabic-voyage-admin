import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building2, MapPin, Star } from 'lucide-react';
import SearchBar from './search/SearchBar';
import FilterPanel from './search/FilterPanel';
import SortControls from './search/SortControls';
import PaginationControls from './search/PaginationControls';
import { useSearch } from '@/hooks/useSearch';
import { useFilter } from '@/hooks/useFilter';
import { useSort } from '@/hooks/useSort';
import { usePagination } from '@/hooks/usePagination';

interface HotelsPageProps {
  isEmployee?: boolean;
}

const HotelsPage: React.FC<HotelsPageProps> = ({ isEmployee = false }) => {
  const isRTL = document.dir === 'rtl';
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<number | null>(null);

  const hotels = [
    {
      id: 1,
      name: 'فندق الفورسيزونز',
      location: 'القاهرة، مصر',
      rating: 5,
      pricePerNight: 200,
      amenities: ['مسبح', 'سبا', 'واي فاي مجاني'],
      status: 'متاح',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300'
    },
    {
      id: 2,
      name: 'فندق ماريوت',
      location: 'نيويورك، الولايات المتحدة',
      rating: 4,
      pricePerNight: 250,
      amenities: ['موقف سيارات', 'خدمة غرف', 'مركز لياقة'],
      status: 'محجوز',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300'
    },
    {
      id: 3,
      name: 'فندق ريتز كارلتون',
      location: 'باريس، فرنسا',
      rating: 5,
      pricePerNight: 350,
      amenities: ['مطعم', 'بار', 'خدمة كونسيرج'],
      status: 'متاح',
      image: 'https://images.unsplash.com/photo-1541169784-643e5e6931c3?w=300'
    }
  ];

  const handleEdit = (hotelId: number) => {
    if (!isEmployee) {
      setEditingHotel(hotelId);
    }
  };

  const handleDelete = (hotelId: number) => {
    if (!isEmployee) {
      console.log('Deleting hotel:', hotelId);
    }
  };

  // Search, Filter, Sort, and Pagination
  const { searchTerm, setSearchTerm, filteredData: searchedHotels } = useSearch({
    data: hotels,
    searchFields: ['name', 'location']
  });

  const statusOptions = [
    { value: 'متاح', label: 'متاح' },
    { value: 'محجوز', label: 'محجوز' }
  ];

  const { filters, setFilters, filteredData } = useFilter({
    data: searchedHotels
  });

  const sortOptions = [
    { value: 'name', label: 'اسم الفندق' },
    { value: 'location', label: 'الموقع' },
    { value: 'rating', label: 'التقييم' },
    { value: 'pricePerNight', label: 'السعر لليلة' }
  ];

  const { sortConfig, setSortConfig, sortedData } = useSort({
    data: filteredData,
    initialSort: { field: 'rating', direction: 'desc' }
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
    initialItemsPerPage: 9
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEmployee ? 'الفنادق' : 'إدارة الفنادق'}
          </h1>
          <p className="text-gray-600">
            {isEmployee ? 'عرض الفنادق المتاحة للحجز' : 'إدارة الفنادق وحجوزاتها'}
          </p>
        </div>
        {!isEmployee && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة فندق</span>
          </button>
        )}
      </div>

      {/* Add Form - Only for Admin */}
      {showAddForm && !isEmployee && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إضافة فندق جديد</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم الفندق</label>
              <input
                type="text"
                placeholder="أدخل اسم الفندق"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
              <input
                type="text"
                placeholder="المدينة، الدولة"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التقييم</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر لكل ليلة ($)</label>
              <input
                type="number"
                placeholder="أدخل السعر لكل ليلة"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">المرافق</label>
              <input
                type="text"
                placeholder="مثال: مسبح، سبا، واي فاي مجاني (مفصولة بفواصل)"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div className={`md:col-span-2 flex justify-end space-x-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                إضافة فندق
              </button>
            </div>
          </form>
        </div>
      )}

      {/* أدوات البحث والفلترة */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث في الفنادق..."
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
        عرض {paginatedData.length} من {totalItems} فندق
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-gray-600">{hotel.location}</span>
              </div>
              
              <div className="mb-3">
                <div className={`flex flex-wrap gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {hotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <span className="text-2xl font-bold text-green-600">${hotel.pricePerNight}</span>
                  <span className="text-gray-500 text-sm">/ليلة</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  hotel.status === 'متاح'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {hotel.status}
                </span>
              </div>
              
              {!isEmployee && (
                <div className={`flex space-x-2 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button 
                    onClick={() => handleEdit(hotel.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(hotel.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    حذف
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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

export default HotelsPage;
