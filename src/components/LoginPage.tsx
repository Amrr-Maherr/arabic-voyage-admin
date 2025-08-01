
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Plane, Hotel, Car, Shield, User, Calendar, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin' // 'admin' or 'employee'
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('محاولة تسجيل الدخول:', formData);
    
    // توجيه المستخدم حسب نوع الحساب
    if (formData.userType === 'admin') {
      navigate('/admin-dashboard');
    } else if (formData.userType === 'employee') {
      navigate('/employee-dashboard');
    } else if (formData.userType === 'date-pricing') {
      navigate('/date-pricing-dashboard');
    } else if (formData.userType === 'room-manager') {
      navigate('/room-manager-dashboard');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      {/* خلفيات متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* شعار وعنوان */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-white">قافله الايمان</h1>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* كرت تسجيل الدخول */}
        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">أهلاً بعودتك</CardTitle>
            <p className="text-gray-600 mt-2">أدخل بياناتك للوصول إلى لوحة التحكم</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* نوع المستخدم */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">نوع الحساب</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('userType', 'admin')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.userType === 'admin'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm font-medium">مدير</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('userType', 'employee')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.userType === 'employee'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">موظف</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('userType', 'date-pricing')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.userType === 'date-pricing'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">يوزر تاريخ</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('userType', 'room-manager')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.userType === 'room-manager'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Building className="w-5 h-5" />
                      <span className="text-sm font-medium">مدير الغرف</span>
                    </div>
                  </button>
                </div>
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
                  className="h-12"
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
                    className="h-12"
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

              {/* زر تسجيل الدخول */}
              <Button
                type="submit"
                className="w-full h-12 travel-gradient text-white font-medium text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">
                  تسجيل الدخول كـ {
                    formData.userType === 'admin' ? 'مدير' :
                    formData.userType === 'employee' ? 'موظف' :
                    formData.userType === 'date-pricing' ? 'يوزر تاريخ' :
                    'مدير الغرف'
                  }
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>

              {/* رابط التسجيل */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  ليس لديك حساب؟{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    أنشئ حساب الآن
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* خدمات مصورة */}
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

export default LoginPage;
