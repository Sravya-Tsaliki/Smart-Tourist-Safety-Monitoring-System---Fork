import React, { useState } from 'react';
import { PhoneIcon, MessageCircleIcon, AlertCircleIcon, MapIcon, BatteryIcon, CalendarIcon, ClockIcon, RefreshCwIcon, UserIcon, ShieldIcon, ChevronRightIcon, HeartIcon, UsersIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const FamilyHome: React.FC = () => {
  // Mock data for tracked family members
  const [familyMembers, setFamilyMembers] = useState([{
    id: 1,
    name: 'John Smith',
    relationship: 'Son',
    touristId: 'TID-12345-IN',
    currentLocation: 'Gangtok, Sikkim',
    lastUpdated: '10 minutes ago',
    status: 'safe',
    batteryLevel: 68,
    photo: null,
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
    }],
    recentActivities: [{
      activity: 'Checked in at Hotel Himalayan Heights',
      time: 'Yesterday, 8:30 PM'
    }, {
      activity: 'Visited MG Marg Market',
      time: 'Yesterday, 2:15 PM'
    }]
  }, {
    id: 2,
    name: 'Emma Wilson',
    relationship: 'Daughter',
    touristId: 'TID-67890-IN',
    currentLocation: 'Darjeeling, West Bengal',
    lastUpdated: '25 minutes ago',
    status: 'warning',
    batteryLevel: 32,
    photo: null,
    itinerary: [{
      location: 'Darjeeling',
      date: 'Dec 10, 2023',
      status: 'completed'
    }, {
      location: 'Tiger Hill',
      date: 'Dec 12, 2023',
      status: 'current'
    }],
    recentActivities: [{
      activity: 'Entered moderate risk area',
      time: '25 minutes ago'
    }, {
      activity: 'Battery level low (32%)',
      time: '1 hour ago'
    }]
  }]);
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState<{
    open: boolean;
    type: string | null;
    status: 'pending' | 'success' | 'error';
  }>({
    open: false,
    type: null,
    status: 'pending'
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
  const refreshLocation = () => {
    setRefreshing(true);
    // Simulate API call to refresh tourist location
    setTimeout(() => {
      setFamilyMembers(prevMembers => prevMembers.map(member => member.id === selectedMember.id ? {
        ...member,
        lastUpdated: 'Just now',
        currentLocation: member.id === 1 ? 'MG Marg, Gangtok, Sikkim' : 'Batasia Loop, Darjeeling',
        recentActivities: [{
          activity: 'Location refreshed',
          time: 'Just now'
        }, ...member.recentActivities]
      } : member));
      setSelectedMember(prev => ({
        ...prev,
        lastUpdated: 'Just now',
        currentLocation: prev.id === 1 ? 'MG Marg, Gangtok, Sikkim' : 'Batasia Loop, Darjeeling',
        recentActivities: [{
          activity: 'Location refreshed',
          time: 'Just now'
        }, ...prev.recentActivities]
      }));
      setRefreshing(false);
    }, 2000);
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
        // Add message to activities if sending message
        if (type === 'message') {
          setFamilyMembers(prevMembers => prevMembers.map(member => member.id === selectedMember.id ? {
            ...member,
            recentActivities: [{
              activity: 'Message received from family',
              time: 'Just now'
            }, ...member.recentActivities]
          } : member));
          setSelectedMember(prev => ({
            ...prev,
            recentActivities: [{
              activity: 'Message received from family',
              time: 'Just now'
            }, ...prev.recentActivities]
          }));
        }
      }, 2000);
    }, 2000);
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Family Dashboard
          </h1>
          <p className="text-gray-500">
            Track and monitor your traveling family members
          </p>
        </div>
        <Link to="/family/members" className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <UsersIcon className="h-4 w-4 mr-2" />
          Manage Travelers
        </Link>
      </div>
      {/* Traveler selection cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {familyMembers.map(member => <div key={member.id} className={`bg-white overflow-hidden shadow rounded-lg border-2 cursor-pointer transition-all ${selectedMember.id === member.id ? 'border-blue-500 transform scale-[1.02]' : 'border-transparent hover:border-blue-200'}`} onClick={() => setSelectedMember(member)}>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {member.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {getStatusIcon(member.status)}
                      <span className="ml-1">
                        {member.status.toUpperCase()}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    <span>{member.currentLocation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      {/* Selected traveler details */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedMember.name}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500 mr-2">
                  {selectedMember.touristId}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedMember.status)}`}>
                  {getStatusIcon(selectedMember.status)}
                  <span className="ml-1">
                    {selectedMember.status.toUpperCase()}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => handleActionButton('call')} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call
            </button>
            <button onClick={() => handleActionButton('message')} className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <MessageCircleIcon className="h-4 w-4 mr-2" />
              Message
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Current Location */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
                Current Location
              </h3>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {selectedMember.currentLocation}
                    </h4>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-500">
                        Last updated: {selectedMember.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button onClick={refreshLocation} disabled={refreshing} className={`w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${refreshing ? 'opacity-75 cursor-not-allowed' : ''}`}>
                    <RefreshCwIcon className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh Location'}
                  </button>
                </div>
              </div>
            </div>
            {/* Itinerary */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
                Current Itinerary
              </h3>
              <div className="mt-4">
                <ul className="space-y-4">
                  {selectedMember.itinerary.map((item, index) => <li key={index} className="flex items-start">
                      <div className={`mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <div className="ml-3.5 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {item.location}
                          </p>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getItineraryStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.date}
                        </p>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
            {/* Status & Recent Activities */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
                Recent Activities
              </h3>
              <div className="mt-4">
                {/* Battery Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 flex items-center">
                      <BatteryIcon className="h-4 w-4 mr-1" />
                      Battery Status
                    </span>
                    <span className={`${selectedMember.batteryLevel > 60 ? 'text-green-600' : selectedMember.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedMember.batteryLevel}%
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${selectedMember.batteryLevel > 60 ? 'bg-green-500' : selectedMember.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                    width: `${selectedMember.batteryLevel}%`
                  }}></div>
                  </div>
                </div>
                {/* Activities */}
                <ul className="mt-6 space-y-4">
                  {selectedMember.recentActivities.map((activity, index) => <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <ClockIcon className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.activity}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Map View */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MapIcon className="h-5 w-5 mr-2 text-blue-500" />
            Location Map
          </h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            Full Screen
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </button>
        </div>
        <div className="h-80 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">
              Interactive map would be displayed here
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="font-medium text-gray-900">
                  {selectedMember.currentLocation}
                </p>
                <p className="text-sm text-gray-500">
                  Last updated: {selectedMember.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Family Actions</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h4 className="font-medium text-blue-800 flex items-center">
                <HeartIcon className="h-5 w-5 mr-2" />
                Stay Connected
              </h4>
              <p className="mt-1 text-sm text-blue-600">
                Keep in touch with your family member during their travels
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button onClick={() => handleActionButton('call')} className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call
                </button>
                <button onClick={() => handleActionButton('message')} className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <MessageCircleIcon className="h-4 w-4 mr-2" />
                  Message
                </button>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
              <h4 className="font-medium text-yellow-800 flex items-center">
                <AlertCircleIcon className="h-5 w-5 mr-2" />
                Emergency Assistance
              </h4>
              <p className="mt-1 text-sm text-yellow-600">
                Request help if you believe your family member is in danger
              </p>
              <div className="mt-4">
                <button onClick={() => handleActionButton('emergency')} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  <AlertCircleIcon className="h-4 w-4 mr-2" />
                  Request Emergency Assistance
                </button>
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
                  <div className="bg-blue-100 rounded-full p-4">
                    <PhoneIcon className="h-12 w-12 text-blue-500" />
                  </div>
                  <p className="text-xl font-medium mt-4">
                    {showModal.status === 'pending' ? 'Calling...' : 'Call connected!'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {showModal.status === 'pending' ? `Connecting to ${selectedMember.name}` : `You are now connected with ${selectedMember.name}`}
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
                    {showModal.status === 'pending' ? 'Your message is being delivered' : `Your message has been delivered to ${selectedMember.name}`}
                  </p>
                </>}
              {showModal.type === 'emergency' && <>
                  <div className="bg-yellow-100 rounded-full p-4">
                    <AlertCircleIcon className="h-12 w-12 text-yellow-500" />
                  </div>
                  <p className="text-xl font-medium mt-4">
                    {showModal.status === 'pending' ? 'Requesting assistance...' : 'Assistance requested!'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {showModal.status === 'pending' ? 'Contacting local emergency services' : 'Local authorities have been notified and will check on your family member'}
                  </p>
                </>}
              <div className="flex mt-6">
                <button onClick={() => setShowModal({
              open: false,
              type: null,
              status: 'pending'
            })} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  {showModal.status === 'pending' ? 'Cancel' : 'OK'}
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default FamilyHome;