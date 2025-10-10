import React, { useState } from 'react';
import { SettingsIcon, CheckIcon, XIcon, BellIcon, EyeIcon, LockIcon } from 'lucide-react';
const FamilySettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [locationUpdates, setLocationUpdates] = useState('hourly');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const toggleSetting = (setting: string) => {
    switch (setting) {
      case 'email':
        setEmailNotifications(!emailNotifications);
        break;
      case 'push':
        setPushNotifications(!pushNotifications);
        break;
      case 'sms':
        setSmsNotifications(!smsNotifications);
        break;
      case 'privacy':
        setPrivacyMode(!privacyMode);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your preferences for the family portal
          </p>
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <BellIcon className="h-5 w-5 mr-2 text-blue-500" />
            Notification Settings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Configure how you receive updates about your family members
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive updates via email
                </p>
              </div>
              <button onClick={() => toggleSetting('email')} className={`${emailNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${emailNotifications ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive alerts on your device
                </p>
              </div>
              <button onClick={() => toggleSetting('push')} className={`${pushNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${pushNotifications ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  SMS Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive text messages for urgent alerts
                </p>
              </div>
              <button onClick={() => toggleSetting('sms')} className={`${smsNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${smsNotifications ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
            <div>
              <label htmlFor="location-updates" className="block text-sm font-medium text-gray-700">
                Location Update Frequency
              </label>
              <select id="location-updates" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={locationUpdates} onChange={e => setLocationUpdates(e.target.value)}>
                <option value="realtime">Real-time (Battery intensive)</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="manual">Manual refresh only</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <EyeIcon className="h-5 w-5 mr-2 text-blue-500" />
            Privacy Settings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage how your family member's data is displayed
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Enhanced Privacy Mode
                </label>
                <p className="text-sm text-gray-500">
                  Only show approximate location instead of exact coordinates
                </p>
              </div>
              <button onClick={() => toggleSetting('privacy')} className={`${privacyMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
                <span className={`${privacyMode ? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Account Security */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <LockIcon className="h-5 w-5 mr-2 text-blue-500" />
            Account Security
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your account security settings
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Change Password
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={saveSettings} disabled={isSaving} className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
          {isSaving ? <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </> : 'Save Settings'}
        </button>
      </div>
      {saveSuccess !== null && <div className={`flex items-center ${saveSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {saveSuccess ? <>
              <CheckIcon className="h-5 w-5 mr-1" />
              <span>Settings saved successfully</span>
            </> : <>
              <XIcon className="h-5 w-5 mr-1" />
              <span>Error saving settings</span>
            </>}
        </div>}
    </div>;
};
export default FamilySettings;