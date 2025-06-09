
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, CheckCircle, XCircle, Clock, Plane, Hotel, Car, Link, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bookingFormSchema = z.object({
  customer: z.string().min(1, 'Customer name is required'),
  date: z.string().min(1, 'Date is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  flightCosts: z.number().min(0, 'Flight costs must be positive').optional(),
  hotelAmount: z.number().min(0, 'Hotel amount must be positive').optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface Booking {
  id: string;
  customer: string;
  type: 'flight' | 'hotel' | 'limousine';
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  isPackage?: boolean;
  packagePrice?: number;
  linkedBookingId?: string;
  linkedBooking?: Booking;
  flightCosts?: number;
}

const initialBookings: Booking[] = [
  {
    id: 'BKG001',
    customer: 'Ahmed Zaki',
    type: 'flight',
    date: '2024-03-15',
    amount: 750,
    status: 'confirmed',
    linkedBookingId: 'BKG001H',
    flightCosts: 100,
  },
  {
    id: 'BKG001H',
    customer: 'Ahmed Zaki',
    type: 'hotel',
    date: '2024-03-15',
    amount: 500,
    status: 'confirmed',
    linkedBookingId: 'BKG001',
  },
  {
    id: 'BKG002',
    customer: 'Lama Ahmed',
    type: 'flight',
    date: '2024-03-20',
    amount: 800,
    status: 'pending',
    linkedBookingId: 'BKG002H',
    flightCosts: 120,
  },
  {
    id: 'BKG002H',
    customer: 'Lama Ahmed',
    type: 'hotel',
    date: '2024-03-20',
    amount: 600,
    status: 'pending',
    linkedBookingId: 'BKG002',
  },
  {
    id: 'BKG003',
    customer: 'Youssef Ali',
    type: 'limousine',
    date: '2024-03-25',
    amount: 200,
    status: 'confirmed',
  },
  {
    id: 'BKG004',
    customer: 'Sara Omar',
    type: 'flight',
    date: '2024-03-28',
    amount: 900,
    status: 'cancelled',
    linkedBookingId: 'BKG004H',
    flightCosts: 150,
  },
  {
    id: 'BKG004H',
    customer: 'Sara Omar',
    type: 'hotel',
    date: '2024-03-28',
    amount: 700,
    status: 'cancelled',
    linkedBookingId: 'BKG004',
  },
  {
    id: 'BKG005',
    customer: 'Khaled Tamer',
    type: 'flight',
    date: '2024-04-01',
    amount: 1000,
    status: 'confirmed',
    linkedBookingId: 'BKG005H',
    flightCosts: 200,
  },
  {
    id: 'BKG005H',
    customer: 'Khaled Tamer',
    type: 'hotel',
    date: '2024-04-01',
    amount: 800,
    status: 'confirmed',
    linkedBookingId: 'BKG005',
  },
  {
    id: 'BKG006',
    customer: 'Noha Salem',
    type: 'limousine',
    date: '2024-04-05',
    amount: 250,
    status: 'pending',
  },
  // New bookings - Mix of hotel+flight only
  {
    id: 'BKG007',
    customer: 'محمد عبدالله',
    type: 'flight',
    date: '2024-04-10',
    amount: 850,
    status: 'confirmed',
    linkedBookingId: 'BKG007H',
    flightCosts: 130,
  },
  {
    id: 'BKG007H',
    customer: 'محمد عبدالله',
    type: 'hotel',
    date: '2024-04-10',
    amount: 650,
    status: 'confirmed',
    linkedBookingId: 'BKG007',
  },
  {
    id: 'BKG008',
    customer: 'فاطمة أحمد',
    type: 'flight',
    date: '2024-04-12',
    amount: 920,
    status: 'pending',
    linkedBookingId: 'BKG008H',
    flightCosts: 180,
  },
  {
    id: 'BKG008H',
    customer: 'فاطمة أحمد',
    type: 'hotel',
    date: '2024-04-12',
    amount: 720,
    status: 'pending',
    linkedBookingId: 'BKG008',
  },
  {
    id: 'BKG009',
    customer: 'علي حسن',
    type: 'flight',
    date: '2024-04-15',
    amount: 780,
    status: 'confirmed',
    linkedBookingId: 'BKG009H',
    flightCosts: 110,
  },
  {
    id: 'BKG009H',
    customer: 'علي حسن',
    type: 'hotel',
    date: '2024-04-15',
    amount: 580,
    status: 'confirmed',
    linkedBookingId: 'BKG009',
  },
  // New booking with flight+hotel+limousine
  {
    id: 'BKG010',
    customer: 'مريم خالد',
    type: 'flight',
    date: '2024-04-18',
    amount: 1200,
    status: 'confirmed',
    linkedBookingId: 'BKG010H',
    flightCosts: 250,
  },
  {
    id: 'BKG010H',
    customer: 'مريم خالد',
    type: 'hotel',
    date: '2024-04-18',
    amount: 950,
    status: 'confirmed',
    linkedBookingId: 'BKG010',
  },
  {
    id: 'BKG010L',
    customer: 'مريم خالد',
    type: 'limousine',
    date: '2024-04-18',
    amount: 300,
    status: 'confirmed',
  },
  {
    id: 'BKG011',
    customer: 'أحمد سالم',
    type: 'flight',
    date: '2024-04-20',
    amount: 1100,
    status: 'pending',
    linkedBookingId: 'BKG011H',
    flightCosts: 220,
  },
  {
    id: 'BKG011H',
    customer: 'أحمد سالم',
    type: 'hotel',
    date: '2024-04-20',
    amount: 850,
    status: 'pending',
    linkedBookingId: 'BKG011',
  },
  {
    id: 'BKG011L',
    customer: 'أحمد سالم',
    type: 'limousine',
    date: '2024-04-20',
    amount: 280,
    status: 'pending',
  },
  {
    id: 'BKG012',
    customer: 'ليلى محمود',
    type: 'flight',
    date: '2024-04-22',
    amount: 950,
    status: 'confirmed',
    linkedBookingId: 'BKG012H',
    flightCosts: 170,
  },
  {
    id: 'BKG012H',
    customer: 'ليلى محمود',
    type: 'hotel',
    date: '2024-04-22',
    amount: 750,
    status: 'confirmed',
    linkedBookingId: 'BKG012',
  },
  {
    id: 'BKG012L',
    customer: 'ليلى محمود',
    type: 'limousine',
    date: '2024-04-22',
    amount: 320,
    status: 'confirmed',
  },
  // More hotel+flight combinations
  {
    id: 'BKG013',
    customer: 'حسام عادل',
    type: 'flight',
    date: '2024-04-25',
    amount: 880,
    status: 'cancelled',
    linkedBookingId: 'BKG013H',
    flightCosts: 140,
  },
  {
    id: 'BKG013H',
    customer: 'حسام عادل',
    type: 'hotel',
    date: '2024-04-25',
    amount: 680,
    status: 'cancelled',
    linkedBookingId: 'BKG013',
  },
  {
    id: 'BKG014',
    customer: 'رانيا يوسف',
    type: 'flight',
    date: '2024-04-28',
    amount: 1050,
    status: 'confirmed',
    linkedBookingId: 'BKG014H',
    flightCosts: 190,
  },
  {
    id: 'BKG014H',
    customer: 'رانيا يوسف',
    type: 'hotel',
    date: '2024-04-28',
    amount: 820,
    status: 'confirmed',
    linkedBookingId: 'BKG014',
  },
];

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

  const renderBookingRow = (booking: Booking) => (
    <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
      <td className="p-3">
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {booking.linkedBooking && (
            <Link className="w-4 h-4 text-blue-500" />
          )}
          <span className="font-medium text-foreground">{booking.id}</span>
        </div>
      </td>
      <td className={`p-3 text-foreground ${isRTL ? 'text-right' : ''}`}>{booking.customer}</td>
      <td className="p-3">
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {booking.type === 'flight' && <Plane className="w-4 h-4 text-blue-500" />}
          {booking.type === 'hotel' && <Hotel className="w-4 h-4 text-green-500" />}
          {booking.type === 'limousine' && <Car className="w-4 h-4 text-purple-500" />}
          <span className="text-foreground">
            {booking.type === 'flight' && (isRTL ? 'طيران' : 'Flight')}
            {booking.type === 'hotel' && (isRTL ? 'فندق' : 'Hotel')}
            {booking.type === 'limousine' && (isRTL ? 'ليموزين' : 'Limousine')}
          </span>
          {booking.linkedBooking && (
            <Badge variant="secondary" className="text-xs">
              {isRTL ? 'مع فندق' : 'with Hotel'}
            </Badge>
          )}
        </div>
      </td>
      <td className={`p-3 text-muted-foreground ${isRTL ? 'text-right' : ''}`}>{booking.date}</td>
      <td className={`p-3 text-foreground ${isRTL ? 'text-right' : ''}`}>
        <div>
          <div className="font-medium">${booking.amount}</div>
          {booking.flightCosts && (
            <div className="text-xs text-muted-foreground">
              {isRTL ? 'تكاليف الطيران' : 'Flight costs'}: ${booking.flightCosts}
            </div>
          )}
          {booking.linkedBooking && (
            <div className="text-xs text-muted-foreground">
              + ${booking.linkedBooking.amount} ({isRTL ? 'فندق' : 'hotel'})
            </div>
          )}
        </div>
      </td>
      <td className="p-3">
        <Badge 
          variant={
            booking.status === 'confirmed' ? 'default' : 
            booking.status === 'pending' ? 'secondary' : 
            'destructive'
          }
        >
          {booking.status === 'confirmed' && (isRTL ? 'مؤكد' : 'Confirmed')}
          {booking.status === 'pending' && (isRTL ? 'معلق' : 'Pending')}
          {booking.status === 'cancelled' && (isRTL ? 'ملغي' : 'Cancelled')}
        </Badge>
      </td>
      <td className="p-3">
        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditDialog(booking)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
            disabled={booking.status === 'confirmed'}
          >
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateBookingStatus(booking.id, 'pending')}
            disabled={booking.status === 'pending'}
          >
            <Clock className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
            disabled={booking.status === 'cancelled'}
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-foreground">
          {isRTL ? 'إدارة الحجوزات' : 'Bookings Management'}
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Eye className="w-5 h-5" />
              {isRTL ? 'إجمالي الحجوزات' : 'Total Bookings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBookings}</div>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'عدد جميع الحجوزات' : 'Number of all bookings'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-5 h-5 text-green-500" />
              {isRTL ? 'الحجوزات المؤكدة' : 'Confirmed Bookings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{confirmedBookings}</div>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'عدد الحجوزات المؤكدة' : 'Number of confirmed bookings'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-5 h-5 text-yellow-500" />
              {isRTL ? 'الحجوزات المعلقة' : 'Pending Bookings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{pendingBookings}</div>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'عدد الحجوزات المعلقة' : 'Number of pending bookings'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <XCircle className="w-5 h-5 text-red-500" />
              {isRTL ? 'الحجوزات الملغاة' : 'Cancelled Bookings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{cancelledBookings}</div>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'عدد الحجوزات الملغاة' : 'Number of cancelled bookings'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Eye className="w-5 h-5" />
            {isRTL ? 'جميع الحجوزات' : 'All Bookings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'رقم الحجز' : 'Booking ID'}
                  </th>
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'العميل' : 'Customer'}
                  </th>
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'النوع' : 'Type'}
                  </th>
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'التاريخ' : 'Date'}
                  </th>
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'المبلغ' : 'Amount'}
                  </th>
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'الحالة' : 'Status'}
                  </th>
                  <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {isRTL ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mainBookings.map((booking) => renderBookingRow(booking))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isRTL ? 'تعديل تفاصيل الحجز' : 'Edit Booking Details'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isRTL ? 'اسم العميل' : 'Customer Name'}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isRTL ? 'تاريخ الحجز' : 'Booking Date'}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {editingBooking?.type === 'flight' && (isRTL ? 'سعر الطيران' : 'Flight Price')}
                      {editingBooking?.type === 'limousine' && (isRTL ? 'سعر الليموزين' : 'Limousine Price')}
                      {editingBooking?.type === 'hotel' && (isRTL ? 'سعر الفندق' : 'Hotel Price')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {editingBooking?.type === 'flight' && (
                <>
                  <FormField
                    control={form.control}
                    name="flightCosts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isRTL ? 'تكاليف الطيران' : 'Flight Costs'}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {editingBooking?.linkedBooking && (
                    <FormField
                      control={form.control}
                      name="hotelAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{isRTL ? 'سعر الفندق المرتبط' : 'Linked Hotel Price'}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button type="submit">
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsPage;
