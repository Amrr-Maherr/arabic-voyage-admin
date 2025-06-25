import React, { useState } from 'react';
import { Plus, Star, Edit, Trash2, MapPin, Wifi, Coffee, Waves } from 'lucide-react';

const HotelsPage = () => {
  const isRTL = document.dir === 'rtl';
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'قصر النيل',
      city: 'القاهرة',
      stars: 4,
      rooms: 80,
      price: 120,
      status: 'نشط',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
      services: ['واي فاي', 'إفطار', 'مسبح']
    },
    {
      id: 2,
      name: 'منتجع الكثبان الحمراء',
      city: 'دبي',
      stars: 5,
      rooms: 150,
      price: 250,
      status: 'غير نشط',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300',
      services: ['واي فاي', 'إفطار', 'مسبح']
    },
    {
      id: 3,
      name: 'جنة الساحل',
      city: 'الإسكندرية',
      stars: 4,
      rooms: 120,
      price: 180,
      status: 'نشط',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300',
      services: ['واي فاي', 'مسبح']
    }
  ]);

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // معالجة منطق إرسال النموذج هنا
    setShowAddForm(false);
    setEditingHotel(null);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getServiceIcon = (service) => {
    switch (service) {
      case 'واي فاي':
        return <Wifi className="w-4 h-4" />;
      case 'إفطار':
        return <Coffee className="w-4 h-4" />;
      case 'مسبح':
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الفنادق</h1>
          <p className="text-gray-600">إدارة مخزون الفنادق والحجوزات الخاصة بك</p>
        </div>
        <button
          onClick={() => {
            setEditingHotel(null);
            setShowAddForm(!showAddForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة فندق</span>
        </button>
      </div>

      {/* نموذج إضافة/تعديل فندق */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingHotel ? 'تعديل فندق' : 'إضافة فندق جديد'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم الفندق</label>
              <input
                type="text"
                placeholder="أدخل اسم الفندق"
                defaultValue={editingHotel?.name || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
              <input
                type="text"
                placeholder="أدخل المدينة"
                defaultValue={editingHotel?.city || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تصنيف النجوم</label>
              <select 
                defaultValue={editingHotel?.stars || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              >
                <option value="">اختر التصنيف</option>
                <option value="1">نجمة واحدة</option>
                <option value="2">نجمتان</option>
                <option value="3">ثلاث نجوم</option>
                <option value="4">أربع نجوم</option>
                <option value="5">خمس نجوم</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عدد الغرف</label>
              <input
                type="number"
                placeholder="أدخل عدد الغرف"
                defaultValue={editingHotel?.rooms || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر لليلة ($)</label>
              <input
                type="number"
                placeholder="أدخل السعر"
                defaultValue={editingHotel?.price || ''}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رفع الصور</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
              <textarea
                rows={3}
                placeholder="أدخل وصف الفندق"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'text-right' : ''}`}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">الخدمات</label>
              <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <Wifi className="w-4 h-4 mr-1" />
                  واي فاي
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <Coffee className="w-4 h-4 mr-1" />
                  إفطار
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <Waves className="w-4 h-4 mr-1" />
                  مسبح
                </label>
              </div>
            </div>
            <div className={`md:col-span-2 flex justify-end space-x-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingHotel(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingHotel ? 'تحديث الفندق' : 'إضافة فندق'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* جدول الفنادق */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الفندق
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الموقع
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  التصنيف
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الغرف
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  السعر/الليلة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الخدمات
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الحالة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{hotel.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{hotel.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}>{renderStars(hotel.stars)}</div>
                  </td>
                  <td className={`px-6 py-4 text-gray-900 ${isRTL ? 'text-right' : ''}`}>{hotel.rooms}</td>
                  <td className={`px-6 py-4 text-gray-900 font-medium ${isRTL ? 'text-right' : ''}`}>${hotel.price}</td>
                  <td className="px-6 py-4">
                    <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {hotel.services.map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          {getServiceIcon(service)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      hotel.status === 'نشط'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <button 
                        onClick={() => handleEdit(hotel)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(hotel.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;