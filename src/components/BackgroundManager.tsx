
import React, { useState } from 'react';
import { Upload, Image, Video, Eye, Trash2 } from 'lucide-react';

const BackgroundManager = () => {
  const [selectedFiles, setSelectedFiles] = useState<{[key: string]: File | null}>({
    dashboard: null,
    flights: null,
    hotels: null,
    limousines: null
  });

  const backgroundSections = [
    {
      id: 'dashboard',
      title: 'Home Page',
      titleAr: 'صفحة لوحة التحكم',
      description: 'Background for the Home page',
      descriptionAr: 'خلفية الصفحة الرئيسية للوحة التحكم',
      currentPreview: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
      gradient: 'travel-gradient'
    },
    {
      id: 'flights',
      title: 'Flights Page',
      titleAr: 'صفحة الرحلات',
      description: 'Background for flight management',
      descriptionAr: 'خلفية إدارة الرحلات',
      currentPreview: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
      gradient: 'flight-gradient'
    },
    {
      id: 'hotels',
      title: 'Hotels Page',
      titleAr: 'صفحة الفنادق',
      description: 'Background for hotel management',
      descriptionAr: 'خلفية إدارة الفنادق',
      currentPreview: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      gradient: 'hotel-gradient'
    },
    {
      id: 'limousines',
      title: 'Limousines Page',
      titleAr: 'صفحة الليموزين',
      description: 'Background for limousine management',
      descriptionAr: 'خلفية إدارة الليموزين',
      currentPreview: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
      gradient: 'limo-gradient'
    }
  ];

  const handleFileSelect = (sectionId: string, file: File) => {
    setSelectedFiles(prev => ({
      ...prev,
      [sectionId]: file
    }));
  };

  const handleUpload = (sectionId: string) => {
    const file = selectedFiles[sectionId];
    if (file) {
      // Simulate upload process
      console.log(`Uploading ${file.name} for ${sectionId} section`);
      // Reset selected file after upload
      setSelectedFiles(prev => ({
        ...prev,
        [sectionId]: null
      }));
    }
  };

  const handleRemoveBackground = (sectionId: string) => {
    console.log(`Removing background for ${sectionId} section`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Background Manager</h1>
        <p className="text-gray-600">Manage background images and videos for each page section</p>
      </div>

      {/* Background Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {backgroundSections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Section Header */}
            <div className={`${section.gradient} p-4 text-white`}>
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-white/80 text-sm">{section.description}</p>
            </div>

            {/* Current Preview */}
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Background</label>
                <div className="relative">
                  <img
                    src={section.currentPreview}
                    alt={`${section.title} background`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Upload New Background</label>
                
                {/* File Input */}
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
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4 up to 10MB</p>
                    </div>
                  </label>
                </div>

                {/* Selected File */}
                {selectedFiles[section.id] && (
                  <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {selectedFiles[section.id]?.type.startsWith('video/') ? (
                        <Video className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Image className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-700">{selectedFiles[section.id]?.name}</span>
                    </div>
                    <button
                      onClick={() => setSelectedFiles(prev => ({ ...prev, [section.id]: null }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpload(section.id)}
                    disabled={!selectedFiles[section.id]}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      selectedFiles[section.id]
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload
                  </button>
                  <button
                    onClick={() => handleRemoveBackground(section.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Upload Progress (Mock) */}
              <div className="mt-3 hidden">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Tips for Best Results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use high-resolution images (1920x1080 or higher) for best quality</li>
          <li>• Keep file sizes under 10MB for faster loading</li>
          <li>• Consider using subtle overlays to ensure text readability</li>
          <li>• Videos should be under 30 seconds for optimal performance</li>
        </ul>
      </div>
    </div>
  );
};

export default BackgroundManager;
