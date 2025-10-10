import React, { useState } from 'react';
import { PhoneIcon, AlertCircleIcon } from 'lucide-react';
import PanicButton from '../../components/tourist-app/PanicButton';
const TouristEmergency: React.FC = () => {
  const [callModalOpen, setCallModalOpen] = useState<{
    open: boolean;
    type: string | null;
  }>({
    open: false,
    type: null
  });
  const handleCallButton = (type: string) => {
    setCallModalOpen({
      open: true,
      type
    });
    // In a real app, this would initiate a call or connect to emergency services
    setTimeout(() => {
      setCallModalOpen({
        open: false,
        type: null
      });
    }, 3000); // Simulate a call connection
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Emergency</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="text-center">
          <AlertCircleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Emergency Assistance
          </h2>
          <PanicButton />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
            <button onClick={() => handleCallButton('police')} className="flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call Police
            </button>
            <button onClick={() => handleCallButton('hospital')} className="flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call Hospital
            </button>
          </div>
        </div>
        {callModalOpen.open && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <div className="animate-pulse flex flex-col items-center">
                <PhoneIcon className="h-12 w-12 text-blue-500 mb-4" />
                <p className="text-lg font-medium">
                  Connecting to{' '}
                  {callModalOpen.type === 'police' ? 'Police' : 'Hospital'}...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please stay on the line
                </p>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default TouristEmergency;