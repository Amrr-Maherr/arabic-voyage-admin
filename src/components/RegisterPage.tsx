import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Plane, Hotel, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('محاولة تسجيل:', formData);
    // منطق التسجيل هنا
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* الشعار والعنوان */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-white">قافله الايمان</h1>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* كرت التسجيل */}
        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">إنشاء حساب جديد</CardTitle>
            <p className="text-gray-600 mt-2">املأ البيانات للبدء</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* الاسم الكامل */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  الاسم الكامل
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="h-11"
                  required
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="h-11"
                  required
                />
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="أدخل رقم هاتفك"
                  className="h-11 text-right"
                  required
                />
              </div>

              {/* كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="h-11 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 left-3"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* تأكيد كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  تأكيد كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="أعد إدخال كلمة المرور"
                    className="h-11 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 left-3"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* زر إنشاء الحساب */}
              <Button
                type="submit"
                className="w-full h-12 travel-gradient text-white font-medium text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 mt-6"
              >
                <span className="flex items-center justify-center gap-2">
                  إنشاء حساب
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>

              {/* رابط تسجيل الدخول */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  لديك حساب بالفعل؟{' '}
                  <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                    سجل دخولك من هنا
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* أيقونات الخدمات */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/80 text-sm">رحلات الطيران</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
              <Hotel className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/80 text-sm">الفنادق</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
              <Car className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/80 text-sm">الليموزين</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
