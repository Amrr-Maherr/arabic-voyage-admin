
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, CheckCircle, Clock, XCircle } from 'lucide-react';

interface BookingStatsCardsProps {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  isRTL: boolean;
}

const BookingStatsCards: React.FC<BookingStatsCardsProps> = ({
  totalBookings,
  confirmedBookings,
  pendingBookings,
  cancelledBookings,
  isRTL,
}) => {
  return (
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
  );
};

export default BookingStatsCards;
