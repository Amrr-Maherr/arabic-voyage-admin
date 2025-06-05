
import React, { useState } from 'react';
import { Save, Globe, Bell, Shield, Palette, Database } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'UTC+2',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30
    },
    theme: 'light'
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Simulate save
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your application preferences and configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="UTC+2">UTC+2 (Cairo)</option>
                <option value="UTC+0">UTC+0 (London)</option>
                <option value="UTC-5">UTC-5 (New York)</option>
                <option value="UTC+8">UTC+8 (Beijing)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="EGP">EGP (ج.م)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive push notifications in browser</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Palette className="w-5 h-5 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-4 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                  <div className="w-full h-16 bg-white rounded border border-gray-200 mb-2"></div>
                  <p className="text-sm font-medium text-center">Light</p>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-4 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                  <div className="w-full h-16 bg-gray-800 rounded border border-gray-600 mb-2"></div>
                  <p className="text-sm font-medium text-center">Dark</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Database className="w-5 h-5 text-orange-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="text-sm font-medium text-yellow-800">Database Backup</p>
                <p className="text-sm text-yellow-700">Last backup: 2 hours ago</p>
              </div>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Backup Now
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="text-sm font-medium text-red-800">Clear Cache</p>
                <p className="text-sm text-red-700">Clear application cache to improve performance</p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
