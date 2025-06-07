import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, Clock, Plane, Hotel, Car, Link } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
}

const initialBookings: Booking[] = [
  {
    id: 'BKG001',
    customer: 'Ahmed Zaki',
    type: 'flight',
    date: '2024-03-15',
    amount: 750,
    status: 'confirmed',
  },
  {
    id: 'BKG002',
    customer: 'Lama Ahmed',
    type: 'hotel',
    date: '2024-03-20',
    amount: 500,
    status: 'pending',
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
    amount: 800,
    status: 'cancelled',
  },
  {
    id: 'BKG005',
    customer: 'Khaled Tamer',
    type: 'hotel',
    date: '2024-04-01',
    amount: 600,
    status: 'confirmed',
  },
  {
    id: 'BKG006',
    customer: 'Noha Salem',
    type: 'limousine',
    date: '2024-04-05',
    amount: 250,
    status: 'pending',
  },
  {
    id: 'BKG007',
    customer: 'Ali Hassan',
    type: 'flight',
    date: '2024-04-10',
    amount: 900,
    status: 'confirmed',
  },
  {
    id: 'BKG008',
    customer: 'Salma Said',
    type: 'hotel',
    date: '2024-04-15',
    amount: 700,
    status: 'cancelled',
  },
  {
    id: 'BKG009',
    customer: 'Tamer Yasser',
    type: 'limousine',
    date: '2024-04-20',
    amount: 300,
    status: 'confirmed',
  },
  {
    id: 'BKG010',
    customer: 'Hala Mohamed',
    type: 'flight',
    date: '2024-04-25',
    amount: 1000,
    status: 'pending',
  },
  {
    id: 'BKG011',
    customer: 'Ahmed Zaki',
    type: 'flight',
    date: '2024-05-01',
    amount: 1200,
    status: 'confirmed',
    isPackage: true,
    packagePrice: 1100,
  },
  {
    id: 'BKG012',
    customer: 'Lama Ahmed',
    type: 'hotel',
    date: '2024-05-05',
    amount: 800,
    status: 'pending',
    isPackage: true,
    packagePrice: 750,
  },
  {
    id: 'BKG013',
    customer: 'Youssef Ali',
    type: 'limousine',
    date: '2024-05-10',
    amount: 400,
    status: 'confirmed',
    linkedBookingId: 'BKG003',
  },
];

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isRTL] = useState(document.dir === 'rtl');

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed').length;
  const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled').length;

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status } : booking
      )
    );

    toast({
      title: 'Booking Status Updated',
      description: `Booking ${id} status updated to ${status}`,
    });
  };

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
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {booking.linkedBookingId && (
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
                        {booking.isPackage && (
                          <Badge variant="secondary" className="text-xs">
                            {isRTL ? 'باقة' : 'Package'}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className={`p-3 text-muted-foreground ${isRTL ? 'text-right' : ''}`}>{booking.date}</td>
                    <td className={`p-3 text-foreground ${isRTL ? 'text-right' : ''}`}>
                      {booking.packagePrice ? (
                        <div>
                          <div className="font-medium">${booking.packagePrice}</div>
                          <div className="text-xs text-muted-foreground line-through">${booking.amount}</div>
                        </div>
                      ) : (
                        `$${booking.amount}`
                      )}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsPage;
