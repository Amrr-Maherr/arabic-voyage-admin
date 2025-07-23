
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { Booking, BookingFormData } from '@/types/booking';
import { initialBookings } from '@/data/mockBookings';
import { bookingFormSchema } from '@/schemas/bookingSchema';
import BookingStatsCards from './bookings/BookingStatsCards';
import BookingTable from './bookings/BookingTable';
import BookingEditDialog from './bookings/BookingEditDialog';
import SearchBar from './search/SearchBar';
import FilterPanel from './search/FilterPanel';
import SortControls from './search/SortControls';
import PaginationControls from './search/PaginationControls';
import { useSearch } from '@/hooks/useSearch';
import { useFilter } from '@/hooks/useFilter';
import { useSort } from '@/hooks/useSort';
import { usePagination } from '@/hooks/usePagination';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    // Link bookings together
    const linkedBookings = initialBookings.map(booking => {
      if (booking.linkedBookingId) {
        const linkedBooking = initialBookings.find(b => b.id === booking.linkedBookingId);
        return { ...booking, linkedBooking };
      }
      return booking;
    });
    return linkedBookings;
  });
  
  const [isRTL] = useState(document.dir === 'rtl');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customer: '',
      date: '',
      amount: 0,
      flightCosts: 0,
      hotelAmount: 0,
    },
  });

  // Calculate stats for each booking type
  const flightBookings = bookings.filter(booking => booking.type === 'flight');
  const hotelBookings = bookings.filter(booking => booking.type === 'hotel');
  const limousineBookings = bookings.filter(booking => booking.type === 'limousine');

  const flightStats = {
    count: flightBookings.length,
    totalAmount: flightBookings.reduce((sum, booking) => sum + booking.amount, 0)
  };

  const hotelStats = {
    count: hotelBookings.length,
    totalAmount: hotelBookings.reduce((sum, booking) => sum + booking.amount, 0)
  };

  const limousineStats = {
    count: limousineBookings.length,
    totalAmount: limousineBookings.reduce((sum, booking) => sum + booking.amount, 0)
  };

  // Get main bookings (flights and standalone services) to avoid duplicates
  const mainBookings = bookings.filter(booking => 
    booking.type === 'flight' || 
    booking.type === 'limousine' || 
    (booking.type === 'hotel' && !booking.linkedBookingId)
  );

  // Search, Filter, Sort, and Pagination
  const { searchTerm, setSearchTerm, filteredData: searchedBookings } = useSearch({
    data: mainBookings,
    searchFields: ['customer', 'id']
  });

  const statusOptions = [
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'pending', label: 'قيد الانتظار' },
    { value: 'cancelled', label: 'ملغي' }
  ];

  const typeOptions = [
    { value: 'flight', label: 'رحلة جوية' },
    { value: 'hotel', label: 'فندق' },
    { value: 'limousine', label: 'ليموزين' }
  ];

  const { filters, setFilters, filteredData } = useFilter({
    data: searchedBookings
  });

  const sortOptions = [
    { value: 'date', label: 'التاريخ' },
    { value: 'customer', label: 'العميل' },
    { value: 'amount', label: 'المبلغ' },
    { value: 'status', label: 'الحالة' }
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

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prevBookings =>
      prevBookings.map(booking => {
        if (booking.id === id) {
          return { ...booking, status };
        }
        // Also update linked booking status
        if (booking.linkedBookingId === id) {
          return { ...booking, status };
        }
        return booking;
      })
    );

    toast({
      title: 'Booking Status Updated',
      description: `Booking ${id} status updated to ${status}`,
    });
  };

  const openEditDialog = (booking: Booking) => {
    setEditingBooking(booking);
    form.reset({
      customer: booking.customer,
      date: booking.date,
      amount: booking.amount,
      flightCosts: booking.flightCosts || 0,
      hotelAmount: booking.linkedBooking?.amount || 0,
    });
    setIsEditDialogOpen(true);
  };

  const onEditSubmit = (data: BookingFormData) => {
    if (!editingBooking) return;

    setBookings(prevBookings =>
      prevBookings.map(booking => {
        if (booking.id === editingBooking.id) {
          return {
            ...booking,
            customer: data.customer,
            date: data.date,
            amount: data.amount,
            flightCosts: data.flightCosts,
          };
        }
        // Also update linked booking (hotel) customer, date, and amount
        if (booking.linkedBookingId === editingBooking.id) {
          return {
            ...booking,
            customer: data.customer,
            date: data.date,
            amount: data.hotelAmount || booking.amount,
          };
        }
        return booking;
      })
    );

    toast({
      title: isRTL ? 'تم تحديث الحجز' : 'Booking Updated',
      description: isRTL ? `تم تحديث تفاصيل الحجز ${editingBooking.id}` : `Booking ${editingBooking.id} details updated successfully`,
    });

    setIsEditDialogOpen(false);
    setEditingBooking(null);
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-foreground">
          {isRTL ? 'إدارة الحجوزات' : 'Bookings Management'}
        </h1>
      </div>

      <BookingStatsCards
        flightBookings={flightStats.count}
        flightTotalAmount={flightStats.totalAmount}
        hotelBookings={hotelStats.count}
        hotelTotalAmount={hotelStats.totalAmount}
        limousineBookings={limousineStats.count}
        limousineTotalAmount={limousineStats.totalAmount}
        isRTL={isRTL}
      />

      {/* أدوات البحث والفلترة */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث في الحجوزات..."
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
          typeOptions={typeOptions}
        />
      </div>

      {/* عداد النتائج */}
      <div className="text-sm text-muted-foreground">
        عرض {paginatedData.length} من {totalItems} حجز
      </div>

      <BookingTable
        bookings={paginatedData}
        isRTL={isRTL}
        onEdit={openEditDialog}
        onStatusUpdate={updateBookingStatus}
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

      <BookingEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingBooking={editingBooking}
        form={form}
        onSubmit={onEditSubmit}
        isRTL={isRTL}
      />
    </div>
  );
};

export default BookingsPage;
