import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Shield, User } from 'lucide-react';

const SettingsPage = () => {
  const isRTL = document.dir === 'rtl';
  const [settings, setSettings] = useState({
    companyName: 'ترافل بوك',
    email: 'admin@travelbook.com',
    phone: '+1234567890',
    address: '123 شارع السفر، المدينة'
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-800">
          الإعدادات
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* معلومات الشركة */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <User className="w-5 h-5" />
              معلومات الشركة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">اسم الشركة</Label>
              <Input
                id="companyName"
                type="text"
                value={settings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الأمان */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Shield className="w-5 h-5" />
              إعدادات الأمان
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">
                كلمة المرور الحالية
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">
                كلمة المرور الجديدة
              </Label>
              <Input
                id="newPassword"
                type="password"
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">
                تأكيد كلمة المرور
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className={isRTL ? 'text-right' : ''}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          حفظ التغييرات
        </Button>
        <Button variant="outline">
          إلغاء
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;