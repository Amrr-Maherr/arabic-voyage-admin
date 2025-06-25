import React from 'react';
import { Plane, Building2, Car, DollarSign, Calendar } from 'lucide-react';

const DashboardHome = () => {
  const isRTL = document.dir === 'rtl';
  const stats = [
    {
      title: 'الرحلات',
      value: '154',
      icon: 'Plane',
      gradient: 'bg-gradient-to-r from-blue-700 to-blue-500',
      change: '+12%',
    },
    {
      title: 'الفنادق',
      value: '93',
      icon: 'Building2',
      gradient: 'bg-gradient-to-r from-blue-600 to-blue-400',
      change: '+8%',
    },
    {
      title: 'الليموزين',
      value: '41',
      icon: 'Car',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-300',
      change: '+15%',
    },
    {
      title: 'أرباح اليوم',
      value: '3200 ريال',
      icon: 'DollarSign',
      gradient: 'bg-gradient-to-r from-green-600 to-green-400',
      change: '+5%',
    },
  ];

  const recentBookings = [
    { id: 1, type: 'رحلة جوية', customer: 'سارة عبدالله', destination: 'القاهرة إلى دبي', amount: '1500 ريال', status: 'مؤكد' },
    { id: 2, type: 'فندق', customer: 'محمد علي', destination: 'قصر النيل', amount: '900 ريال', status: 'معلق' },
    { id: 3, type: 'ليموزين', customer: 'أحمد زكي', destination: 'نقل من المطار', amount: '300 ريال', status: 'مؤكد' },
    { id: 4, type: 'رحلة جوية', customer: 'ليلى خالد', destination: 'لندن إلى القاهرة', amount: '2000 ريال', status: 'مؤكد' },
  ];

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">لوحة تحكم السفر</h1>
        <p className="text-gray-600">راقب أداء أعمال السفر الخاصة بك</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          let Icon;
          switch (stat.icon) {
            case 'Plane':
              Icon = Plane;
              break;
            case 'Building2':
              Icon = Building2;
              break;
            case 'Car':
              Icon = Car;
              break;
            case 'DollarSign':
              Icon = DollarSign;
              break;
            default:
              Icon = null;
          }
          return (
            <div key={index} className="card-hover">
              <div className={`${stat.gradient} rounded-lg p-6 text-white shadow-lg`}>
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-white/80 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-white/80 text-sm">{stat.change} مقارنة بالشهر الماضي</p>
                  </div>
                  {Icon && <Icon className="w-8 h-8 text-white/80" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* الحجوزات الأخيرة */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-900">الحجوزات الأخيرة</h3>
          <Calendar className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-3">
          {recentBookings.map((booking) => (
            <div key={booking.id} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${
                  booking.status === 'مؤكد' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="font-medium text-gray-900">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.type} - {booking.destination}</p>
                </div>
              </div>
              <div className={isRTL ? 'text-left' : 'text-right'}>
                <p className="font-semibold text-gray-900">{booking.amount}</p>
                <p className={`text-sm ${
                  booking.status === 'مؤكد' ? 'text-green-600' : 'text-yellow-600'
                }`}>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;