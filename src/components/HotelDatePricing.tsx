import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarIcon, DollarSign, Hotel, Save } from 'lucide-react';

const HotelDatePricing = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [dailyPrice, setDailyPrice] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  
  // Mock hotels data
  const hotels = [
    { id: '1', name: 'فندق النيل الأزرق' },
    { id: '2', name: 'فندق الهرم الذهبي' },
    { id: '3', name: 'فندق البحر الأحمر' },
    { id: '4', name: 'فندق الأقصر الفاخر' }
  ];

  // Mock pricing data
  const [pricingData, setPricingData] = useState<any>({
    '2024-01-15': { hotel: '1', price: 250, available: true },
    '2024-01-16': { hotel: '1', price: 280, available: false },
    '2024-01-17': { hotel: '2', price: 300, available: true }
  });

  const handleSavePricing = () => {
    if (!selectedDate || !selectedHotel || !dailyPrice) return;
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    setPricingData({
      ...pricingData,
      [dateKey]: {
        hotel: selectedHotel,
        price: parseFloat(dailyPrice),
        available: isAvailable
      }
    });
    
    setDailyPrice('');
    alert('تم حفظ التسعير بنجاح');
  };

  const getDayModifiers = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    const pricing = pricingData[dateKey];
    
    if (pricing) {
      return pricing.available ? 'available' : 'unavailable';
    }
    return '';
  };

  const getDayPrice = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    const pricing = pricingData[dateKey];
    return pricing ? `$${pricing.price}` : '';
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center space-x-2 space-x-reverse">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">إدارة تسعير الفنادق</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              التقويم الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className={cn("w-full pointer-events-auto")}
              modifiers={{
                available: (date) => getDayModifiers(date) === 'available',
                unavailable: (date) => getDayModifiers(date) === 'unavailable'
              }}
              modifiersStyles={{
                available: { backgroundColor: '#dcfce7', color: '#166534' },
                unavailable: { backgroundColor: '#fecaca', color: '#dc2626' }
              }}
            />
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <span className="text-sm">متاح</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 rounded"></div>
                <span className="text-sm">غير متاح</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              تحديد الأسعار والتوفر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>اختر الفندق</Label>
              <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر فندق" />
                </SelectTrigger>
                <SelectContent>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>التاريخ المحدد</Label>
              <div className="p-3 bg-muted rounded-md">
                {selectedDate ? selectedDate.toLocaleDateString('ar-EG') : 'لم يتم تحديد تاريخ'}
              </div>
            </div>

            <div className="space-y-2">
              <Label>السعر اليومي (دولار)</Label>
              <Input
                type="number"
                value={dailyPrice}
                onChange={(e) => setDailyPrice(e.target.value)}
                placeholder="ادخل السعر"
              />
            </div>

            <div className="space-y-2">
              <Label>حالة التوفر</Label>
              <Select 
                value={isAvailable ? 'available' : 'unavailable'} 
                onValueChange={(value) => setIsAvailable(value === 'available')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">متاح</SelectItem>
                  <SelectItem value="unavailable">غير متاح</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSavePricing}
              className="w-full"
              disabled={!selectedDate || !selectedHotel || !dailyPrice}
            >
              <Save className="h-4 w-4 ml-2" />
              حفظ التسعير
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5" />
            الأسعار الحالية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-2">التاريخ</th>
                  <th className="text-right p-2">الفندق</th>
                  <th className="text-right p-2">السعر</th>
                  <th className="text-right p-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pricingData).map(([date, data]: [string, any]) => {
                  const hotel = hotels.find(h => h.id === data.hotel);
                  return (
                    <tr key={date} className="border-b">
                      <td className="p-2">{new Date(date).toLocaleDateString('ar-EG')}</td>
                      <td className="p-2">{hotel?.name}</td>
                      <td className="p-2">${data.price}</td>
                      <td className="p-2">
                        <Badge variant={data.available ? 'default' : 'destructive'}>
                          {data.available ? 'متاح' : 'غير متاح'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelDatePricing;