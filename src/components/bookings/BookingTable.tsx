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
            {booking.type === 'flight' && 'طيران'}
            {booking.type === 'hotel' && 'فندق'}
            {booking.type === 'limousine' && 'ليموزين'}
          </span>
          {booking.linkedBooking && (
            <Badge variant="secondary" className="text-xs">
              مع فندق
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
              تكاليف الطيران: ${booking.flightCosts}
            </div>
          )}
          {booking.linkedBooking && (
            <div className="text-xs text-muted-foreground">
              + ${booking.linkedBooking.amount} (فندق)
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
          {booking.status === 'confirmed' && 'مؤكد'}
          {booking.status === 'pending' && 'معلق'}
          {booking.status === 'cancelled' && 'ملغي'}
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
          جميع الحجوزات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  رقم الحجز
                </th>
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  العميل
                </th>
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  النوع
                </th>
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  التاريخ
                </th>
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  المبلغ
                </th>
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  الحالة
                </th>
                <th className={`p-3 text-left font-medium text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  الإجراءات
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