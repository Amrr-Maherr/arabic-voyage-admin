
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, Globe, Plane, Hotel, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Here would be the login logic
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language Toggle */}
      <button
        onClick={() => setIsRTL(!isRTL)}
        className="fixed top-4 right-4 p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        title={isRTL ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Globe className="w-5 h-5" />
      </button>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center justify-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">TravelBook</h1>
          </div>
          <p className="text-white/80 text-lg">
            {isRTL ? 'لوحة تحكم المدير' : 'Admin Dashboard'}
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isRTL ? 'تسجيل الدخول' : 'Welcome Back'}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {isRTL ? 'أدخل بياناتك للوصول إلى لوحة التحكم' : 'Enter your credentials to access the dashboard'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-4 h-4" />
                  {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  className={`h-12 ${isRTL ? 'text-right' : ''}`}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Lock className="w-4 h-4" />
                  {isRTL ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                    className={`h-12 pr-12 ${isRTL ? 'text-right pl-12 pr-4' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isRTL ? 'left-3' : 'right-3'}`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    {isRTL ? 'تذكرني' : 'Remember me'}
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 travel-gradient text-white font-medium text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {isRTL ? 'دخول' : 'Sign In'}
                  {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </span>
              </Button>

              {/* Register Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  {isRTL ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    {isRTL ? 'إنشاء حساب جديد' : 'Create one now'}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Service Icons */}
        <div className={`flex items-center justify-center gap-8 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/80 text-sm">{isRTL ? 'طيران' : 'Flights'}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
              <Hotel className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/80 text-sm">{isRTL ? 'فنادق' : 'Hotels'}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
              <Car className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/80 text-sm">{isRTL ? 'ليموزين' : 'Limousine'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
