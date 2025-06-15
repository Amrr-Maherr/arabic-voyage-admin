import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Save, RotateCcw, Eye, Trash2, Plus, Trash } from 'lucide-react';

const ColorSettings = () => {
  const [isRTL] = useState(document.dir === 'rtl');
  const [colors, setColors] = useState({
    primary: '#222247',
    secondary: '#f1f5f9',
    accent: '#3b82f6',
    background: '#ffffff',
    foreground: '#0f172a'
  });
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [newTickerText, setNewTickerText] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  // Load saved colors and ticker items from localStorage on component mount
  useEffect(() => {
    const savedColors = localStorage.getItem('siteColors');
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }
    const savedTickerItems = localStorage.getItem('tickerItems');
    if (savedTickerItems) {
      setTickerItems(JSON.parse(savedTickerItems));
    }
  }, []);

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleAddTickerItem = () => {
    if (newTickerText.trim()) {
      const updatedItems = [...tickerItems, newTickerText.trim()];
      setTickerItems(updatedItems);
      setNewTickerText('');
      localStorage.setItem('tickerItems', JSON.stringify(updatedItems));
    }
  };

  const handleDeleteTickerItem = (index: number) => {
    const updatedItems = tickerItems.filter((_, i) => i !== index);
    setTickerItems(updatedItems);
    localStorage.setItem('tickerItems', JSON.stringify(updatedItems));
  };

  const handleClearTickerItems = () => {
    setTickerItems([]);
    localStorage.removeItem('tickerItems');
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
            {isRTL ? 'إعدادات الألوان وشريط الأخبار' : 'Color & Ticker Settings'}
          </h1>
        </div>
      </div>

      {/* Color Settings Card */}
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
            <Button onClick={togglePreview} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              {isRTL ? 'معاينة' : 'Preview'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ticker Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Eye className="w-5 h-5" />
            {isRTL ? 'إعدادات شريط الأخبار' : 'News Ticker Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Ticker Item */}
          <div className="space-y-2">
            <Label htmlFor="ticker-input" className="text-sm font-medium">
              {isRTL ? 'إضافة نص جديد لشريط الأخبار' : 'Add New Ticker Text'}
            </Label>
            <p className="text-xs text-gray-500 mb-2">
              {isRTL ? 'أدخل النص الذي سيظهر في شريط الأخبار' : 'Enter text to display in the news ticker'}
            </p>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Input
                id="ticker-input"
                type="text"
                value={newTickerText}
                onChange={(e) => setNewTickerText(e.target.value)}
                placeholder={isRTL ? 'أدخل نص الخبر...' : 'Enter ticker text...'}
                className={`flex-1 ${isRTL ? 'text-right' : ''}`}
              />
              <Button onClick={handleAddTickerItem} className="travel-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                {isRTL ? 'إضافة' : 'Add'}
              </Button>
              <Button 
                onClick={handleClearTickerItems} 
                variant="outline" 
                className="text-red-500 hover:text-red-700 border-red-300 hover:bg-red-50"
                disabled={tickerItems.length === 0}
              >
                <Trash className="w-4 h-4 mr-2" />
                {isRTL ? 'مسح الكل' : 'Clear All'}
              </Button>
            </div>
            {/* Ticker Items List */}
            {tickerItems.length > 0 && (
              <ul className="space-y-2 mt-3">
                {tickerItems.map((item, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center justify-between bg-gray-50 rounded-lg p-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <span 
                      className={`text-sm break-words overflow-wrap-anywhere ${isRTL ? 'text-right' : ''}`}
                      style={{ maxWidth: 'calc(100% - 40px)' }}
                    >
                      {item}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTickerItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Ticker Preview */}
          {tickerItems.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                {isRTL ? 'معاينة شريط الأخبار' : 'Ticker Preview'}
              </h3>
              <div
                className="bg-gray-200 rounded-lg p-3"
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  direction: isRTL ? 'rtl' : 'ltr'
                }}
              >
                <ul className="space-y-2">
                  {tickerItems.map((item, index) => (
                    <li key={index} className="text-sm break-words overflow-wrap-anywhere">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          {isRTL ? 'نصائح لإعدادات الألوان وشريط الأخبار:' : 'Color & Ticker Tips:'}
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            {isRTL ? '• تأكد من وجود تباين كافي بين ألوان النص والخلفية' : '• Ensure sufficient contrast between text and background colors'}
          </li>
          <li>
            {isRTL ? '• استخدم الألوان الفاتحة للخلفيات والألوان الداكنة للنصوص' : '• Use light colors for backgrounds and dark colors for text'}
          </li>
          <li>
            {isRTL ? '• اجعل نصوص شريط الأخبار موجزة وواضحة' : '• Keep ticker texts concise and clear'}
          </li>
          <li>
            {isRTL ? '• اختبر الألوان والنصوص على أجهزة مختلفة قبل التطبيق النهائي' : '• Test colors and ticker texts on different devices before final application'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorSettings;