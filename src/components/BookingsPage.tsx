
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

  // Get main bookings (flights and standalone services) to avoid duplicates
  const mainBookings = bookings.filter(booking => 
    booking.type === 'flight' || 
    booking.type === 'limousine' || 
    (booking.type === 'hotel' && !booking.linkedBookingId)
  );

  const totalBookings = mainBookings.length;
  const confirmedBookings = mainBookings.filter(booking => booking.status === 'confirmed').length;
  const pendingBookings = mainBookings.filter(booking => booking.status === 'pending').length;
  const cancelledBookings = mainBookings.filter(booking => booking.status === 'cancelled').length;

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
        totalBookings={totalBookings}
        confirmedBookings={confirmedBookings}
        pendingBookings={pendingBookings}
        cancelledBookings={cancelledBookings}
        isRTL={isRTL}
      />

      <BookingTable
        bookings={mainBookings}
        isRTL={isRTL}
        onEdit={openEditDialog}
        onStatusUpdate={updateBookingStatus}
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
