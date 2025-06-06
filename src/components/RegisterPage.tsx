
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building, ArrowRight, ArrowLeft, Globe, Plane, Hotel, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
    // Here would be the registration logic
  };

  const countries = [
    { value: 'ae', label: isRTL ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
    { value: 'sa', label: isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    { value: 'eg', label: isRTL ? 'مصر' : 'Egypt' },
    { value: 'us', label: isRTL ? 'الولايات المتحدة' : 'United States' },
    { value: 'uk', label: isRTL ? 'المملكة المتحدة' : 'United Kingdom' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Language Toggle */}
      <button
        onClick={() => setIsRTL(!isRTL)}
        className="fixed top-4 right-4 p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-50"
        title={isRTL ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Globe className="w-5 h-5" />
      </button>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo and Title */}
        <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center justify-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">TravelBook</h1>
          </div>
          <p className="text-white/80 text-lg">
            {isRTL ? 'انضم إلى منصة إدارة السفر الرائدة' : 'Join the Leading Travel Management Platform'}
          </p>
        </div>

        {/* Register Card */}
        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isRTL ? 'إنشاء حساب جديد' : 'Create Your Account'}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {isRTL ? 'املأ المعلومات أدناه لإنشاء حسابك' : 'Fill in the information below to create your account'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className="w-4 h-4" />
                    {isRTL ? 'الاسم الأول' : 'First Name'}
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder={isRTL ? 'أدخل اسمك الأول' : 'Enter your first name'}
                    className={`h-12 ${isRTL ? 'text-right' : ''}`}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className="w-4 h-4" />
                    {isRTL ? 'اسم العائلة' : 'Last Name'}
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder={isRTL ? 'أدخل اسم العائلة' : 'Enter your last name'}
                    className={`h-12 ${isRTL ? 'text-right' : ''}`}
                    required
                  />
                </div>
              </div>

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

              {/* Phone and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Phone className="w-4 h-4" />
                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone'}
                    className={`h-12 ${isRTL ? 'text-right' : ''}`}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Building className="w-4 h-4" />
                    {isRTL ? 'اسم الشركة' : 'Company Name'}
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder={isRTL ? 'أدخل اسم شركتك' : 'Enter your company'}
                    className={`h-12 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-4 h-4" />
                  {isRTL ? 'البلد' : 'Country'}
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={isRTL ? 'اختر بلدك' : 'Select your country'} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter password'}
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Lock className="w-4 h-4" />
                    {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder={isRTL ? 'أعد كتابة كلمة المرور' : 'Confirm password'}
                      className={`h-12 pr-12 ${isRTL ? 'text-right pl-12 pr-4' : ''}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isRTL ? 'left-3' : 'right-3'}`}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Newsletter */}
              <div className="space-y-4">
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-gray-600 leading-relaxed">
                    {isRTL ? (
                      <>
                        أوافق على{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                          الشروط والأحكام
                        </Link>{' '}
                        و{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                          سياسة الخصوصية
                        </Link>
                      </>
                    ) : (
                      <>
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                          Privacy Policy
                        </Link>
                      </>
                    )}
                  </Label>
                </div>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-sm text-gray-600">
                    {isRTL ? 'أريد تلقي النشرة الإخبارية والتحديثات' : 'I want to receive newsletter and updates'}
                  </Label>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={!formData.agreeTerms}
                className="w-full h-12 travel-gradient text-white font-medium text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {isRTL ? 'إنشاء الحساب' : 'Create Account'}
                  {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </span>
              </Button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    {isRTL ? 'تسجيل الدخول' : 'Sign in here'}
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

export default RegisterPage;
