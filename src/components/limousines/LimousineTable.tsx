
import React from 'react';
import { Edit, Trash2, Phone, MapPin, User } from 'lucide-react';

interface Limousine {
  id: number;
  carType: string;
  model: string;
  driverName: string;
  contact: string;
  pricePerHour: number;
  route: string;
  date: string;
  status: string;
  image: string;
}

interface LimousineTableProps {
  limousines: Limousine[];
  isEmployee: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LimousineTable: React.FC<LimousineTableProps> = ({
  limousines,
  isEmployee,
  onEdit,
  onDelete
}) => {
  const isRTL = document.dir === 'rtl';

  return (
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
              {!isEmployee && (
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                  الإجراءات
                </th>
              )}
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
                {!isEmployee && (
                  <td className="px-6 py-4">
                    <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <button 
                        onClick={() => onEdit(limo.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(limo.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LimousineTable;
