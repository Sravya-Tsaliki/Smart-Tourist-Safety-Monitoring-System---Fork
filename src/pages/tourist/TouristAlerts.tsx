import React from 'react';
import { BellIcon, AlertTriangleIcon } from 'lucide-react';
const TouristAlerts: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Alerts & Notifications
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Alerts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 flex items-center">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Weather Alert
                </p>
                <p className="text-sm text-gray-500">
                  Heavy rainfall expected in your area
                </p>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </li>
            <li className="px-4 py-4 flex items-center">
              <BellIcon className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Safety Reminder
                </p>
                <p className="text-sm text-gray-500">
                  Remember to check in at your accommodation
                </p>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>;
};
export default TouristAlerts;