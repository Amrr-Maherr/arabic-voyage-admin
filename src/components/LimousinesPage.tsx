import React, { useState } from 'react';
import { Plus, Edit, Trash2, Phone, MapPin, User } from 'lucide-react';

const LimousinesPage = () => {
  const isRTL = document.dir === 'rtl';
  const [showAddForm, setShowAddForm] = useState(false);

  const limousines = [
    {
      id: 1,
      carType: 'مرسيدس S-Class',
      model: '2023',
      driverName: 'أحمد زكي',
      contact: '+20 123 456 789',
      pricePerHour: 50,
      route: 'القاهرة - الجيزة',
      date: '2025-06-05',
      status: 'نشط',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300'
    },
    {
      id: 2,
      carType: 'بي إم دبليو 7 Series',
      model: '2023',
      driverName: 'محمد علي',
      contact: '+20 123 456 790',
      pricePerHour: 45,
      route: 'مطار القاهرة - وسط المدينة',
      date: '2025-06-05',
      status: 'نشط',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300'
    },
    {
      id: 3,
      carType: 'أودي A8',
      model: '2022',
      driverName: 'حسن عمر',
      contact: '+20 123 456 791',
      pricePerHour: 55,
      route: 'الإسكندرية - القاهرة',
      date: '2025-06-06',
      status: 'صيانة',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الليموزين</h1>
          <p className="text-gray-600">إدارة أسطول النقل الفاخر الخاص بك</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة ليموزين</span>
        </button>
      </div>

      {/* نموذج إضافة ليموزين */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إضافة ليموزين جديد</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع السيارة</label>
              <input
                type="text"
                placeholder="مثال: مرسيدس S-Class"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">سنة الصنع</label>
              <input
                type="text"
                placeholder="مثال: 2023"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم السائق</label>
              <input
                type="text"
                placeholder="أدخل اسم السائق"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم التواصل</label>
              <input
                type="tel"
                placeholder="+20 123 456 789"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر بالساعة ($)</label>
              <input
                type="number"
                placeholder="أدخل السعر بالساعة"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRTL ? 'text-right' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">صورة السيارة</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات (اختياري)</label>
              <textarea
                rows={3}
                placeholder="ملاحظات إضافية حول السيارة أو الخدمة"
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRTL ? 'text-right' : ''}`}
              ></textarea>
            </div>
            <div className={`md:col-span-2 flex justify-end space-x-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                إضافة ليموزين
              </button>
            </div>
          </form>
        </div>
      )}

      {/* جدول الليموزين */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  السيارة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  السائق
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  السعر/الساعة
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  المسار
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  التاريخ
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
              {limousines.map((limo) => (
                <tr key={limo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <img
                        src={limo.image}
                        alt={limo.carType}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{limo.carType}</p>
                        <p className="text-sm text-gray-500">{limo.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <User className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-900">{limo.driverName}</span>
                      </div>
                      <div className={`flex items-center mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Phone className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{limo.contact}</span>
                      </div>
                    </div>
                    </td>
                    <td className={`px-6 py-4 text-gray-900 font-medium ${isRTL ? 'text-right' : ''}`}>${limo.pricePerHour}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-900">{limo.route}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-gray-900 ${isRTL ? 'text-right' : ''}`}>{limo.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        limo.status === 'نشط'
                          ? 'bg-green-100 text-green-800'
                          : limo.status === 'صيانة'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {limo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
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

export default LimousinesPage;