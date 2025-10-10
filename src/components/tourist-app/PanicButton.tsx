import React, { useState } from 'react';
import { AlertCircleIcon, XIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
const PanicButton: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [emergencySent, setEmergencySent] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState<{
    open: boolean;
    type: string | null;
  }>({
    open: false,
    type: null
  });
  const activatePanic = () => {
    setIsActivated(true);
    // Start countdown
    let count = 5;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        // In a real app, this would send an emergency alert
        console.log('Emergency alert sent!');
        setEmergencySent(true);
        // Show success message and then reset after 3 seconds
        setTimeout(() => {
          setIsActivated(false);
          setCountdown(5);
          setEmergencySent(false);
        }, 3000);
      }
    }, 1000);
  };
  const cancelPanic = () => {
    setIsActivated(false);
    setCountdown(5);
    // In a real app, this would cancel the alert
  };
  const handleCallButton = (type: string) => {
    setCallModalOpen({
      open: true,
      type
    });
    // Simulate call connection
    setTimeout(() => {
      setCallModalOpen({
        open: false,
        type: null
      });
    }, 3000);
  };
  return <div className="p-4">
      {!isActivated ? <div className="flex flex-col items-center">
          <button onClick={activatePanic} className="w-32 h-32 rounded-full bg-red-600 hover:bg-red-700 shadow-lg flex items-center justify-center transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300" aria-label="Activate panic button">
            <div className="text-white flex flex-col items-center">
              <AlertCircleIcon className="h-12 w-12 mb-1" />
              <span className="font-bold text-sm">SOS</span>
            </div>
          </button>
          <p className="mt-4 text-sm text-gray-600 text-center max-w-sm">
            Press the button in case of an emergency. This will alert
            authorities and your emergency contacts.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            <button onClick={() => handleCallButton('police')} className="flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow">
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call Police
            </button>
            <button onClick={() => handleCallButton('hospital')} className="flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow">
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call Hospital
            </button>
          </div>
        </div> : <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <AlertCircleIcon className="h-8 w-8 text-red-600 animate-pulse mr-3" />
              <h3 className="text-xl font-bold text-red-700">
                {emergencySent ? 'Emergency Alert Sent' : 'Emergency Alert Activated'}
              </h3>
            </div>
            {!emergencySent && <button onClick={cancelPanic} className="bg-white rounded-full p-1 hover:bg-gray-100" aria-label="Cancel panic alert">
                <XIcon className="h-5 w-5 text-red-700" />
              </button>}
          </div>
          {emergencySent ? <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <PhoneIcon className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-green-700 font-medium">
                Emergency services have been notified and are on their way.
              </p>
            </div> : <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-700 font-medium">
                    Sending alert in {countdown}...
                  </span>
                  <span className="text-red-700 font-bold">{countdown}</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full animate-pulse" style={{
              width: `${(5 - countdown) * 20}%`
            }}></div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Your location will be shared with:
                    </h4>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1 pl-4">
                      <li>• Local emergency services</li>
                      <li>• Nearest police station</li>
                      <li>• Your emergency contacts</li>
                      <li>• Tour operator / District officials</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button onClick={cancelPanic} className="w-full py-3 bg-white border border-red-300 hover:bg-red-50 text-red-700 font-medium rounded-lg flex items-center justify-center">
                <XIcon className="h-5 w-5 mr-2" />
                Cancel Emergency Alert
              </button>
            </>}
        </div>}
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
              <button onClick={() => setCallModalOpen({
            open: false,
            type: null
          })} className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <XIcon className="h-4 w-4 mr-2" />
                End Call
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default PanicButton;