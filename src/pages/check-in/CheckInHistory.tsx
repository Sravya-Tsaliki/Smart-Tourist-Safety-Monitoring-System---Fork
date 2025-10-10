import React from 'react';
const CheckInHistory: React.FC = () => {
  return <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Registration History</h2>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-500">
          Registration history and logs will be displayed here.
        </p>
      </div>
    </div>;
};
export default CheckInHistory;