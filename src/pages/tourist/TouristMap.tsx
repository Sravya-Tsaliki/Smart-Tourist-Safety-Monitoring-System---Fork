import React from 'react';
const TouristMap: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Safety Map</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Interactive Safety Map
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            View your current location and nearby safety zones
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">
              Interactive map would be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default TouristMap;