
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Shield, Bell, Globe, User, Mail, Phone, MapPin } from 'lucide-react';

const SettingsPage = () => {
  const [isRTL] = useState(document.dir === 'rtl');
  const [settings, setSettings] = useState({
    companyName: 'TravelBook',
    email: 'admin@travelbook.com',
    phone: '+1234567890',
    address: '123 Travel Street, City',
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    language: 'en',
    timezone: 'UTC',
    currency: 'USD'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-800">
          {isRTL ? 'الإعدادات' : 'Settings'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <User className="w-5 h-5" />
              {isRTL ? 'معلومات الشركة' : 'Company Information'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">
                {isRTL ? 'اسم الشركة' : 'Company Name'}
              </Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="email">
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="phone">
                {isRTL ? 'رقم الهاتف' : 'Phone Number'}
              </Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
            <div>
              <Label htmlFor="address">
                {isRTL ? 'العنوان' : 'Address'}
              </Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={isRTL ? 'text-right' : ''}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Bell className="w-5 h-5" />
              {isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Label htmlFor="notifications">
                {isRTL ? 'تفعيل الإشعارات' : 'Enable Notifications'}
              </Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => handleInputChange('notifications', checked)}
              />
            </div>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Label htmlFor="emailNotifications">
                {isRTL ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
              </Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Label htmlFor="smsNotifications">
                {isRTL ? 'إشعارات الرسائل النصية' : 'SMS Notifications'}
              </Label>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Globe className="w-5 h-5" />
              {isRTL ? 'تفضيلات النظام' : 'System Preferences'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">
                {isRTL ? 'اللغة' : 'Language'}
              </Label>
              <Select value={settings.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">
                {isRTL ? 'المنطقة الزمنية' : 'Timezone'}
              </Label>
              <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST</SelectItem>
                  <SelectItem value="PST">PST</SelectItem>
                  <SelectItem value="GMT+3">GMT+3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">
                {isRTL ? 'العملة' : 'Currency'}
              </Label>
              <Select value={settings.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                  <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

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
