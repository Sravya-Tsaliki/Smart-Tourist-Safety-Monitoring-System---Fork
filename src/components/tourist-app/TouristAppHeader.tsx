import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, BellIcon, UserIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { useUser } from '../../context/UserContext';
interface TouristAppHeaderProps {
  toggleSidebar: () => void;
}
const TouristAppHeader: React.FC<TouristAppHeaderProps> = ({
  toggleSidebar
}) => {
  const navigate = useNavigate();
  const {
    logout,
    userId
  } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const notifications = [{
    id: 1,
    message: 'Weather alert: Heavy rain expected in Gangtok',
    time: '10 min ago',
    read: false
  }, {
    id: 2,
    message: 'Your itinerary has been updated',
    time: '1 hour ago',
    read: true
  }, {
    id: 3,
    message: 'New safety zone added near your location',
    time: '3 hours ago',
    read: true
  }];
  return <header className="bg-white shadow-md z-20 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" aria-label="Open sidebar">
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="ml-4 flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">TourGuard</span>
            </div>
          </div>
          <div className="flex items-center">
            {/* Notification button */}
            <div className="relative">
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors relative" onClick={() => setShowNotifications(!showNotifications)} aria-label="Notifications">
                <BellIcon className="h-6 w-6" />
                {notifications.some(n => !n.read) && <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>}
              </button>
              {/* Notification dropdown */}
              {showNotifications && <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-2 px-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? <div className="py-1">
                        {notifications.map(notification => <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
                            <p className="text-sm text-gray-900">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>)}
                      </div> : <div className="py-4 px-4 text-center text-sm text-gray-500">
                        No new notifications
                      </div>}
                  </div>
                  <div className="py-2 px-4 border-t border-gray-100 text-center">
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-500">
                      Mark all as read
                    </button>
                  </div>
                </div>}
            </div>
            {/* User menu */}
            <div className="ml-3 relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center max-w-xs bg-gray-100 p-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors hover:bg-gray-200" aria-label="User menu">
                <UserIcon className="h-6 w-6 text-gray-500" />
              </button>
              {/* User dropdown */}
              {showDropdown && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1 border-b border-gray-100">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        Welcome
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {userId || 'User'}
                      </p>
                    </div>
                  </div>
                  <div className="py-1">
                    <button onClick={() => {
                  setShowDropdown(false);
                  navigate('/tourist/profile');
                }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <UserIcon className="mr-3 h-4 w-4 text-gray-500" />
                      Your Profile
                    </button>
                    <button onClick={() => {
                  setShowDropdown(false);
                  navigate('/tourist/settings');
                }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <SettingsIcon className="mr-3 h-4 w-4 text-gray-500" />
                      Settings
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <LogOutIcon className="mr-3 h-4 w-4 text-gray-500" />
                      Sign out
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default TouristAppHeader;