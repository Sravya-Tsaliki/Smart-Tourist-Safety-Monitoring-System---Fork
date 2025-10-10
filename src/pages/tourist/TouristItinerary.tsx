import React from 'react';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
const TouristItinerary: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Itinerary</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Planned Activities
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 flex items-center">
              <CalendarIcon className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Visit Tsomgo Lake
                </p>
                <p className="text-sm text-gray-500">Tomorrow, 9:00 AM</p>
              </div>
              <MapPinIcon className="h-4 w-4 text-gray-400" />
            </li>
            <li className="px-4 py-4 flex items-center">
              <CalendarIcon className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Nathula Pass Excursion
                </p>
                <p className="text-sm text-gray-500">Dec 15, 10:00 AM</p>
              </div>
              <MapPinIcon className="h-4 w-4 text-gray-400" />
            </li>
          </ul>
        </div>
      </div>
    </div>;
};
export default TouristItinerary;