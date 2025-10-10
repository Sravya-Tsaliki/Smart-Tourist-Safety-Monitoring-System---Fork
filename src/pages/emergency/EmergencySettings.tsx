import React from 'react';
const EmergencySettings: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Emergency Contact Settings
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-500">
          Configure how you receive emergency notifications
        </p>
      </div>
    </div>;
};
export default EmergencySettings;