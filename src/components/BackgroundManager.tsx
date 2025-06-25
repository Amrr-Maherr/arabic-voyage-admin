import React, { useState } from 'react';
import { Upload, Image, Video, Eye, Trash2 } from 'lucide-react';

const BackgroundManager = () => {
  const isRTL = document.dir === 'rtl';
  const [selectedFiles, setSelectedFiles] = useState({
    dashboard: { file: null, preview: null, type: null },
    flights: { file: null, preview: null, type: null },
    hotels: { file: null, preview: null, type: null },
    limousines: { file: null, preview: null, type: null }
  });

  const [content, setContent] = useState({
    dashboard: { title: '', text: '', buttonText: '' },
    flights: { title: '', text: '', buttonText: '' },
    hotels: { title: '', text: '', buttonText: '' },
    limousines: { title: '', text: '', buttonText: '' }
  });

  const backgroundSections = [
    {
      id: 'dashboard',
      title: 'صفحة لوحة التحكم',
      description: 'خلفية الصفحة الرئيسية للوحة التحكم',
      defaultPreview: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800'
    },
    {
      id: 'flights',
      title: 'صفحة الرحلات',
      description: 'خلفية إدارة الرحلات',
      defaultPreview: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'
    },
    {
      id: 'hotels',
      title: 'صفحة الفنادق',
      description: 'خلفية إدارة الفنادق',
      defaultPreview: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      id: 'limousines',
      title: 'صفحة الليموزين',
      description: 'خلفية إدارة الليموزين',
      defaultPreview: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'
    }
  ];

  const handleFileSelect = (sectionId, file) => {
    if (file) {
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      const previewUrl = URL.createObjectURL(file);
      setSelectedFiles(prev => ({
        ...prev,
        [sectionId]: { file, preview: previewUrl, type: fileType }
      }));
    }
  };

  const handleContentChange = (sectionId, field, value) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
  };

  const handleUpload = (sectionId) => {
    const fileObj = selectedFiles[sectionId];
    if (fileObj?.file) {
      console.log(`رفع ${fileObj.file.name} (${fileObj.type}) لقسم ${backgroundSections.find(section => section.id === sectionId).title}`);
      // تنظيف عنوان URL لتجنب تسرب الذاكرة
      URL.revokeObjectURL(fileObj.preview);
      setSelectedFiles(prev => ({
        ...prev,
        [sectionId]: { file: null, preview: null, type: null }
      }));
    }
  };

  const handleRemoveBackground = (sectionId) => {
    console.log(`إزالة الخلفية لقسم ${backgroundSections.find(section => section.id === sectionId).title}`);
    const fileObj = selectedFiles[sectionId];
    if (fileObj?.preview) {
      URL.revokeObjectURL(fileObj.preview); // تنظيف عنوان URL
    }
    setSelectedFiles(prev => ({
      ...prev,
      [sectionId]: { file: null, preview: null, type: null }
    }));
    setContent(prev => ({
      ...prev,
      [sectionId]: { title: '', text: '', buttonText: '' }
    }));
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">إدارة الخلفيات</h1>
        <p className="text-gray-600">إدارة صور أو مقاطع فيديو الخلفية، العناوين، النصوص، والأزرار لكل قسم في الصفحة</p>
      </div>

      {/* أقسام الخلفيات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {backgroundSections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* رأس القسم */}
            <div className={`${section.gradient || 'bg-gray-500'} p-4 text-white`}>
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-white/80 text-sm">{section.description}</p>
            </div>

            {/* المعاينة الحالية */}
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">الخلفية الحالية</label>
                <div className="relative">
                  {selectedFiles[section.id].preview ? (
                    selectedFiles[section.id].type === 'video' ? (
                      <video
                        src={selectedFiles[section.id].preview}
                        controls
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={selectedFiles[section.id].preview}
                        alt={`خلفية ${section.title}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )
                  ) : (
                    <img
                      src={section.defaultPreview}
                      alt={`خلفية ${section.title}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity p-4">
                    <h4 className="text-white font-semibold mb-1">{content[section.id].title || 'عنوان نموذجي'}</h4>
                    <p className="text-white text-sm mb-2">{content[section.id].text || 'نص نموذجي هنا'}</p>
                    <button className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{content[section.id].buttonText || 'استكشف الآن'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* مدخلات المحتوى */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                  <input
                    type="text"
                    value={content[section.id].title}
                    onChange={(e) => handleContentChange(section.id, 'title', e.target.value)}
                    placeholder="أدخل العنوان"
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">النص</label>
                  <textarea
                    value={content[section.id].text}
                    onChange={(e) => handleContentChange(section.id, 'text', e.target.value)}
                    placeholder="أدخل نص الوصف"
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRTL ? 'text-right' : ''}`}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نص الزر</label>
                  <input
                    type="text"
                    value={content[section.id].buttonText}
                    onChange={(e) => handleContentChange(section.id, 'buttonText', e.target.value)}
                    placeholder="أدخل نص الزر"
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
              </div>

              {/* رفع الملف */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">رفع خلفية جديدة</label>
                
                {/* حقل إدخال الملف */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(section.id, file);
                    }}
                    className="hidden"
                    id={`file-input-${section.id}`}
                  />
                  <label htmlFor={`file-input-${section.id}`} className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">انقر للرفع أو اسحب وأفلت</p>
                      <p className="text-xs text-gray-500">PNG، JPG، MP4 بحد أقصى 10 ميجابايت</p>
                    </div>
                  </label>
                </div>

                {/* الملف المحدد */}
                {selectedFiles[section.id].file && (
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {selectedFiles[section.id].type === 'video' ? (
                        <Video className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Image className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-700">{selectedFiles[section.id].file.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveBackground(section.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* أزرار الإجراءات */}
                <div className={`flex space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => handleUpload(section.id)}
                    disabled={!selectedFiles[section.id].file}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      selectedFiles[section.id].file
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    رفع
                  </button>
                  <button
                    onClick={() => handleRemoveBackground(section.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    إزالة
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* النصائح */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">نصائح للحصول على أفضل النتائج:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• استخدم صورًا عالية الدقة (1920x1080 أو أعلى) للحصول على أفضل جودة</li>
          <li>• استخدم مقاطع فيديو قصيرة (أقل من 30 ثانية، تنسيق MP4) لأداء مثالي</li>
          <li>• حافظ على حجم الملفات أقل من 10 ميجابايت لتحميل أسرع</li>
          <li>• استخدم عناوين ونصوص وأزرار موجزة لتحسين القراءة</li>
        </ul>
      </div>
    </div>
  );
};

export default BackgroundManager;