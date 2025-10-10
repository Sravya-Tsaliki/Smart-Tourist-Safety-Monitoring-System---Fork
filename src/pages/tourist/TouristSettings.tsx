import React, { useState } from 'react';
import { SettingsIcon, CheckIcon, XIcon } from 'lucide-react';
const TouristSettings: React.FC = () => {
  const [locationTracking, setLocationTracking] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const toggleSetting = (setting: string) => {
    switch (setting) {
      case 'location':
        setLocationTracking(!locationTracking);
        break;
      case 'notifications':
        setPushNotifications(!pushNotifications);
        break;
      case 'shareData':
        setShareData(!shareData);
        break;
      case 'darkMode':
        setDarkMode(!darkMode);
        // Apply dark mode if it was a real app
        // document.documentElement.classList.toggle('dark', !darkMode)
        break;
    }
  };
  const saveSettings = () => {
    // Show loading state
    setIsSaving(true);
    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(null), 3000);
    }, 1000);
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            App Settings
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location Tracking
                </label>
                <p className="text-sm text-gray-500">
                  Allow location tracking for safety monitoring
                </p>
              </div>
              <button onClick={() => toggleSetting('location')} className={`${locationTracking ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${locationTracking ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive safety alerts and updates
                </p>
              </div>
              <button onClick={() => toggleSetting('notifications')} className={`${pushNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${pushNotifications ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Share Data with Authorities
                </label>
                <p className="text-sm text-gray-500">
                  Share your travel data with local authorities for safety
                  purposes
                </p>
              </div>
              <button onClick={() => toggleSetting('shareData')} className={`${shareData ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${shareData ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Dark Mode
                </label>
                <p className="text-sm text-gray-500">
                  Use dark theme for the application
                </p>
              </div>
              <button onClick={() => toggleSetting('darkMode')} className={`${darkMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${darkMode ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={saveSettings} disabled={isSaving} className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
              {isSaving ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </> : 'Save Settings'}
            </button>
            {saveSuccess !== null && <div className={`mt-3 flex items-center ${saveSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {saveSuccess ? <>
                    <CheckIcon className="h-5 w-5 mr-1" />
                    <span>Settings saved successfully</span>
                  </> : <>
                    <XIcon className="h-5 w-5 mr-1" />
                    <span>Error saving settings</span>
                  </>}
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default TouristSettings;