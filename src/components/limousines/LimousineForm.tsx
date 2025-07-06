
import React from 'react';

interface LimousineFormProps {
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LimousineForm: React.FC<LimousineFormProps> = ({ onCancel, onSubmit }) => {
  const isRTL = document.dir === 'rtl';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">إضافة ليموزين جديد</h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            onClick={onCancel}
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
  );
};

export default LimousineForm;
