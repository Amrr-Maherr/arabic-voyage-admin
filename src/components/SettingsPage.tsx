
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Shield, User } from 'lucide-react';

const SettingsPage = () => {
  const [isRTL] = useState(document.dir === 'rtl');
  const [settings, setSettings] = useState({
    companyName: 'TravelBook',
    email: 'admin@travelbook.com',
    phone: '+1234567890',
    address: '123 Travel Street, City'
  });

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-800">
          {isRTL ? 'الإعدادات' : 'Settings'}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Company Information */}

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Shield className="w-5 h-5" />
              {isRTL ? 'إعدادات الأمان' : 'Security Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">
                {isRTL ? 'كلمة المرور الحالية' : 'Current Password'}
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">
                {isRTL ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <Input
                id="newPassword"
                type="password"
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">
                {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
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
        <Button className="travel-gradient text-white">
          <Save className="w-4 h-4 mr-2" />
          {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
        </Button>
        <Button variant="outline">
          {isRTL ? 'إلغاء' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
