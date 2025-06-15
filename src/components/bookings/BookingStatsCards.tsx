
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Building2, Car, DollarSign } from 'lucide-react';

interface BookingStatsCardsProps {
  flightBookings: number;
  flightTotalAmount: number;
  hotelBookings: number;
  hotelTotalAmount: number;
  limousineBookings: number;
  limousineTotalAmount: number;
  isRTL: boolean;
}

const BookingStatsCards: React.FC<BookingStatsCardsProps> = ({
  flightBookings,
  flightTotalAmount,
  hotelBookings,
  hotelTotalAmount,
  limousineBookings,
  limousineTotalAmount,
  isRTL,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Plane className="w-5 h-5 text-blue-500" />
            {isRTL ? 'حجوزات الطيران' : 'Flight Bookings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-500">{flightBookings}</div>
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-lg font-semibold text-muted-foreground">
              ${flightTotalAmount.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {isRTL ? 'إجمالي قيمة حجوزات الطيران' : 'Total flight bookings value'}
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Building2 className="w-5 h-5 text-green-500" />
            {isRTL ? 'حجوزات الفنادق' : 'Hotel Bookings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500">{hotelBookings}</div>
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-lg font-semibold text-muted-foreground">
              ${hotelTotalAmount.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {isRTL ? 'إجمالي قيمة حجوزات الفنادق' : 'Total hotel bookings value'}
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Car className="w-5 h-5 text-purple-500" />
            {isRTL ? 'حجوزات الليموزين' : 'Limousine Bookings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-500">{limousineBookings}</div>
          <div className="flex items-center gap-1 mt-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-lg font-semibold text-muted-foreground">
              ${limousineTotalAmount.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {isRTL ? 'إجمالي قيمة حجوزات الليموزين' : 'Total limousine bookings value'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStatsCards;
