import React, { useState } from 'react';
import { PhoneIcon, MessageCircleIcon, AlertCircleIcon, MapIcon, BatteryIcon, CalendarIcon, ClockIcon, RefreshCwIcon, UserIcon, ShieldIcon, ChevronRightIcon, CheckIcon, XIcon } from 'lucide-react';
const EmergencyDashboard: React.FC = () => {
  // Mock data for a tourist being tracked by an emergency contact
  const [touristData, setTouristData] = useState({
    name: 'John Smith',
    id: 'TID-12345-IN',
    currentLocation: 'Gangtok, Sikkim',
    lastUpdated: '10 minutes ago',
    status: 'safe',
    batteryLevel: 68,
    itinerary: [{
      location: 'Gangtok',
      date: 'Dec 10, 2023',
      status: 'completed'
    }, {
      location: 'Tsomgo Lake',
      date: 'Dec 12, 2023',
      status: 'current'
    }, {
      location: 'Nathula Pass',
      date: 'Dec 14, 2023',
      status: 'upcoming'
    }, {
      location: 'Yumthang Valley',
      date: 'Dec 16, 2023',
      status: 'upcoming'
    }],
    recentActivities: [{
      activity: 'Checked in at Hotel Himalayan Heights',
      time: 'Yesterday, 8:30 PM'
    }, {
      activity: 'Visited MG Marg Market',
      time: 'Yesterday, 2:15 PM'
    }, {
      activity: 'Entered moderate risk area',
      time: 'Yesterday, 11:20 AM'
    }],
    contactInfo: {
      phone: '+91 98765 43210',
      email: 'john.smith@email.com',
      accommodation: 'Hotel Himalayan Heights, Gangtok'
    }
  });
  const [showModal, setShowModal] = useState<{
    open: boolean;
    type: string | null;
    status: 'pending' | 'success' | 'error';
  }>({
    open: false,
    type: null,
    status: 'pending'
  });
  const [refreshing, setRefreshing] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'sos':
        return 'bg-red-600 text-white animate-pulse';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'danger':
        return 'bg-red-50';
      case 'sos':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <ShieldIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'danger':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      case 'sos':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ShieldIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const getItineraryStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleActionButton = (type: string) => {
    setShowModal({
      open: true,
      type,
      status: 'pending'
    });
    // Simulate API call for the action
    setTimeout(() => {
      setShowModal(prev => ({
        ...prev,
        status: 'success'
      }));
      // Close modal after showing success
      setTimeout(() => {
        setShowModal({
          open: false,
          type: null,
          status: 'pending'
        });
        // Update tourist status if alerting authorities
        if (type === 'authorities') {
          setTouristData(prev => ({
            ...prev,
            status: 'warning',
            recentActivities: [{
              activity: 'Emergency authorities notified',
              time: 'Just now'
            }, ...prev.recentActivities]
          }));
        }
        // Add message to activities if sending message
        if (type === 'message') {
          setTouristData(prev => ({
            ...prev,
            recentActivities: [{
              activity: 'Message sent to tourist',
              time: 'Just now'
            }, ...prev.recentActivities]
          }));
        }
      }, 2000);
    }, 2000);
  };
  const refreshLocation = () => {
    setRefreshing(true);
    // Simulate API call to refresh tourist location
    setTimeout(() => {
      setTouristData(prevData => ({
        ...prevData,
        lastUpdated: 'Just now',
        currentLocation: 'MG Marg, Gangtok, Sikkim',
        recentActivities: [{
          activity: 'Location refreshed',
          time: 'Just now'
        }, ...prevData.recentActivities]
      }));
      setRefreshing(false);
    }, 2000);
  };
  const toggleMapFullscreen = () => {
    setMapFullscreen(!mapFullscreen);
  };
  return <div className="space-y-6">
      {/* Header with tourist summary */}
      <div className={`${getStatusBgColor(touristData.status)} border-l-4 ${touristData.status === 'safe' ? 'border-green-500' : touristData.status === 'warning' ? 'border-yellow-500' : 'border-red-500'} rounded-lg shadow-sm p-6`}>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">
                {touristData.name}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 mr-2">
                  {touristData.id}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(touristData.status)}`}>
                  {getStatusIcon(touristData.status)}
                  <span className="ml-1">
                    {touristData.status.toUpperCase()}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button onClick={() => handleActionButton('call')} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call Tourist
            </button>
            <button onClick={() => handleActionButton('authorities')} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              <AlertCircleIcon className="h-4 w-4 mr-2" />
              Alert Authorities
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Tourist details */}
        <div className="md:col-span-1 space-y-6">
          {/* Current Location Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <MapIcon className="h-5 w-5 mr-2 text-blue-500" />
                Current Location
              </h3>
              <button onClick={refreshLocation} className={`inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${refreshing ? 'opacity-75 cursor-not-allowed' : ''}`} disabled={refreshing}>
                <RefreshCwIcon className={`h-3 w-3 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {touristData.currentLocation}
                  </h4>
                  <div className="flex items-center mt-1">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="ml-1 text-sm text-gray-500">
                      Last updated: {touristData.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Contact Information
              </h3>
            </div>
            <div className="px-4 py-5">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    Phone
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {touristData.contactInfo.phone}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {touristData.contactInfo.email}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Accommodation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {touristData.contactInfo.accommodation}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <BatteryIcon className="h-4 w-4 mr-1" />
                    Battery
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${touristData.batteryLevel > 60 ? 'bg-green-500' : touristData.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                        width: `${touristData.batteryLevel}%`
                      }}></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-700">
                        {touristData.batteryLevel}%
                      </span>
                    </div>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex space-x-3">
                <button onClick={() => handleActionButton('message')} className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MessageCircleIcon className="h-4 w-4 mr-2" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Map, itinerary, and activities */}
        <div className="md:col-span-2 space-y-6">
          {/* Map Card */}
          <div className={`bg-white rounded-lg shadow overflow-hidden ${mapFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Location Map
              </h3>
              <button onClick={toggleMapFullscreen} className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                {mapFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className={`${mapFullscreen ? 'h-full' : 'h-80'} bg-gray-200 relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">
                  Interactive map would be displayed here
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
                <div className="flex items-center">
                  <MapIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {touristData.currentLocation}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {touristData.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary and Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Itinerary Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center">
                <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Itinerary
                </h3>
              </div>
              <div className="px-4 py-3">
                <ul className="divide-y divide-gray-200">
                  {touristData.itinerary.map((item, index) => <li key={index} className="py-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.location}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.date}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full self-start ${getItineraryStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>

            {/* Recent Activities Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center">
                <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activities
                </h3>
              </div>
              <div className="px-4 py-3">
                <ul className="divide-y divide-gray-200">
                  {touristData.recentActivities.map((activity, index) => <li key={index} className="py-3">
                      <div className="flex items-start">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.activity}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Emergency Actions
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 flex items-center">
                    <AlertCircleIcon className="h-5 w-5 mr-2" />
                    SOS Actions
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    Use these actions in case of an emergency
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button onClick={() => handleActionButton('call')} className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Call Tourist
                    </button>
                    <button onClick={() => handleActionButton('authorities')} className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      <AlertCircleIcon className="h-4 w-4 mr-2" />
                      Alert Authorities
                    </button>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 flex items-center">
                    <ShieldIcon className="h-5 w-5 mr-2" />
                    Support Actions
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Additional support options for the tourist
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button onClick={() => handleActionButton('message')} className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <MessageCircleIcon className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                    <button onClick={refreshLocation} className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={refreshing}>
                      <RefreshCwIcon className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                      Refresh Location
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for action buttons */}
      {showModal.open && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <div className="animate-pulse flex flex-col items-center">
              {showModal.type === 'call' && <>
                  <div className="bg-red-100 rounded-full p-4">
                    <PhoneIcon className="h-12 w-12 text-red-500" />
                  </div>
                  <p className="text-xl font-medium mt-4">
                    {showModal.status === 'pending' ? 'Calling tourist...' : 'Call connected!'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {showModal.status === 'pending' ? `Connecting to ${touristData.contactInfo.phone}` : 'You are now connected with the tourist'}
                  </p>
                </>}
              {showModal.type === 'message' && <>
                  <div className="bg-blue-100 rounded-full p-4">
                    <MessageCircleIcon className="h-12 w-12 text-blue-500" />
                  </div>
                  <p className="text-xl font-medium mt-4">
                    {showModal.status === 'pending' ? 'Sending message...' : 'Message sent!'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {showModal.status === 'pending' ? 'Your message is being delivered' : 'Your message has been delivered to the tourist'}
                  </p>
                </>}
              {showModal.type === 'authorities' && <>
                  <div className="bg-yellow-100 rounded-full p-4">
                    <AlertCircleIcon className="h-12 w-12 text-yellow-500" />
                  </div>
                  <p className="text-xl font-medium mt-4">
                    {showModal.status === 'pending' ? 'Contacting local authorities...' : 'Authorities notified!'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {showModal.status === 'pending' ? 'Alerting nearest emergency services' : 'Local authorities have been notified of the situation'}
                  </p>
                </>}
              <div className="flex mt-6 space-x-3">
                {showModal.status === 'pending' ? <button onClick={() => setShowModal({
              open: false,
              type: null,
              status: 'pending'
            })} className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <XIcon className="h-4 w-4 mr-2" />
                    Cancel
                  </button> : <button onClick={() => setShowModal({
              open: false,
              type: null,
              status: 'pending'
            })} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    <CheckIcon className="h-4 w-4 mr-2" />
                    OK
                  </button>}
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default EmergencyDashboard;