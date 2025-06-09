
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, Clock, Plane, Hotel, Car, Link, Edit } from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingTableProps {
  bookings: Booking[];
  isRTL: boolean;
  onEdit: (booking: Booking) => void;
  onStatusUpdate: (id: string, status: Booking['status']) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  isRTL,
  onEdit,
  onStatusUpdate,
}) => {
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
            onClick={() => onEdit(booking)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusUpdate(booking.id, 'confirmed')}
            disabled={booking.status === 'confirmed'}
          >
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusUpdate(booking.id, 'pending')}
            disabled={booking.status === 'pending'}
          >
            <Clock className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusUpdate(booking.id, 'cancelled')}
            disabled={booking.status === 'cancelled'}
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
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
              {bookings.map((booking) => renderBookingRow(booking))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTable;
