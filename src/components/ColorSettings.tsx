
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Save, RotateCcw, Eye } from 'lucide-react';

const ColorSettings = () => {
  const [isRTL] = useState(document.dir === 'rtl');
  const [colors, setColors] = useState({
    primary: '#222247',
    secondary: '#f1f5f9',
    accent: '#3b82f6',
    background: '#ffffff',
    foreground: '#0f172a'
  });

  const [previewMode, setPreviewMode] = useState(false);

  // Load saved colors from localStorage on component mount
  useEffect(() => {
    const savedColors = localStorage.getItem('siteColors');
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }
  }, []);

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const applyColors = () => {
    const root = document.documentElement;
    
    // Convert hex to HSL for CSS variables
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply colors to CSS variables
    root.style.setProperty('--primary', hexToHsl(colors.primary));
    root.style.setProperty('--secondary', hexToHsl(colors.secondary));
    root.style.setProperty('--accent', hexToHsl(colors.accent));
    root.style.setProperty('--background', hexToHsl(colors.background));
    root.style.setProperty('--foreground', hexToHsl(colors.foreground));

    // Save to localStorage
    localStorage.setItem('siteColors', JSON.stringify(colors));
    
    console.log('Colors applied successfully');
  };

  const resetColors = () => {
    const defaultColors = {
      primary: '#222247',
      secondary: '#f1f5f9',
      accent: '#3b82f6',
      background: '#ffffff',
      foreground: '#0f172a'
    };
    
    setColors(defaultColors);
    localStorage.removeItem('siteColors');
    
    // Reset CSS variables to defaults
    const root = document.documentElement;
    root.style.removeProperty('--primary');
    root.style.removeProperty('--secondary');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--background');
    root.style.removeProperty('--foreground');
  };

  const togglePreview = () => {
    if (!previewMode) {
      applyColors();
    }
    setPreviewMode(!previewMode);
  };

  const colorOptions = [
    {
      key: 'primary',
      label: isRTL ? 'اللون الأساسي' : 'Primary Color',
      description: isRTL ? 'اللون الرئيسي للموقع' : 'Main site color'
    },
    {
      key: 'secondary',
      label: isRTL ? 'اللون الثانوي' : 'Secondary Color',
      description: isRTL ? 'اللون الثانوي للخلفيات' : 'Secondary background color'
    },
    {
      key: 'accent',
      label: isRTL ? 'لون التركيز' : 'Accent Color',
      description: isRTL ? 'لون التركيز والروابط' : 'Accent and link color'
    },
    {
      key: 'background',
      label: isRTL ? 'لون الخلفية' : 'Background Color',
      description: isRTL ? 'لون خلفية الصفحة' : 'Page background color'
    },
    {
      key: 'foreground',
      label: isRTL ? 'لون النص' : 'Text Color',
      description: isRTL ? 'لون النص الأساسي' : 'Main text color'
    }
  ];

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isRTL ? 'إعدادات الألوان' : 'Color Settings'}
          </h1>
          <p className="text-gray-600">
            {isRTL ? 'تخصيص ألوان الموقع' : 'Customize your website colors'}
          </p>
        </div>
        
        <Button
          onClick={togglePreview}
          variant={previewMode ? "default" : "outline"}
          className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Eye className="w-4 h-4" />
          {isRTL ? (previewMode ? 'إيقاف المعاينة' : 'معاينة') : (previewMode ? 'Stop Preview' : 'Preview')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Palette className="w-5 h-5" />
            {isRTL ? 'ألوان الموقع' : 'Website Colors'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorOptions.map((option) => (
              <div key={option.key} className="space-y-2">
                <Label htmlFor={option.key} className="text-sm font-medium">
                  {option.label}
                </Label>
                <p className="text-xs text-gray-500 mb-2">{option.description}</p>
                
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div 
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
                    style={{ backgroundColor: colors[option.key as keyof typeof colors] }}
                  />
                  <Input
                    id={option.key}
                    type="color"
                    value={colors[option.key as keyof typeof colors]}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className="w-20 h-12 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={colors[option.key as keyof typeof colors]}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className={`flex-1 ${isRTL ? 'text-right' : ''}`}
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Color Preview Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? 'معاينة الألوان' : 'Color Preview'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorOptions.map((option) => (
                <div key={`preview-${option.key}`} className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg border border-gray-200 mb-2"
                    style={{ backgroundColor: colors[option.key as keyof typeof colors] }}
                  />
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-gray-500">{colors[option.key as keyof typeof colors]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`flex gap-4 pt-4 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button onClick={applyColors} className="travel-gradient text-white">
              <Save className="w-4 h-4 mr-2" />
              {isRTL ? 'حفظ وتطبيق' : 'Save & Apply'}
            </Button>
            <Button onClick={resetColors} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              {isRTL ? 'إعادة تعيين' : 'Reset'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          {isRTL ? 'نصائح لاختيار الألوان:' : 'Color Selection Tips:'}
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            {isRTL ? '• تأكد من وجود تباين كافي بين ألوان النص والخلفية' : '• Ensure sufficient contrast between text and background colors'}
          </li>
          <li>
            {isRTL ? '• استخدم الألوان الفاتحة للخلفيات والألوان الداكنة للنصوص' : '• Use light colors for backgrounds and dark colors for text'}
          </li>
          <li>
            {isRTL ? '• اختبر الألوان على أجهزة مختلفة قبل التطبيق النهائي' : '• Test colors on different devices before final application'}
          </li>
          <li>
            {isRTL ? '• احفظ نسخة من الألوان الحالية قبل التغيير' : '• Save a copy of current colors before changing'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorSettings;
