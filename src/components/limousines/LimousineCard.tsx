
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

interface LimousineCardProps {
  limousine: Limousine;
  isEmployee: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LimousineCard: React.FC<LimousineCardProps> = ({
  limousine,
  isEmployee,
  onEdit,
  onDelete
}) => {
  const isRTL = document.dir === 'rtl';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <img
        src={limousine.image}
        alt={limousine.carType}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-900">{limousine.carType}</h3>
          <span className="text-sm text-gray-500">{limousine.model}</span>
        </div>
        
        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <User className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-gray-900">{limousine.driverName}</span>
        </div>
        
        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Phone className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-500">{limousine.contact}</span>
        </div>
        
        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-gray-900">{limousine.route}</span>
        </div>
        
        <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <span className="text-2xl font-bold text-purple-600">${limousine.pricePerHour}</span>
            <span className="text-gray-500 text-sm">/ساعة</span>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            limousine.status === 'نشط'
              ? 'bg-green-100 text-green-800'
              : limousine.status === 'صيانة'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {limousine.status}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-3">{limousine.date}</div>
        
        {!isEmployee && (
          <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button 
              onClick={() => onEdit(limousine.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Edit className="w-4 h-4 mr-1" />
              تعديل
            </button>
            <button 
              onClick={() => onDelete(limousine.id)}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LimousineCard;
