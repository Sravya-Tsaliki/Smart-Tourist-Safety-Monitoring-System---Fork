import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPinIcon, ShieldIcon, BellIcon, PhoneIcon, MapIcon, SettingsIcon, UserIcon, FileTextIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
}
const TouristAppSidebar: React.FC<SidebarProps> = ({
  isOpen
}) => {
  const location = useLocation();
  const menuItems = [{
    name: 'Dashboard',
    icon: <ShieldIcon className="h-5 w-5" />,
    path: '/tourist'
  }, {
    name: 'My Profile',
    icon: <UserIcon className="h-5 w-5" />,
    path: '/tourist/profile'
  }, {
    name: 'Safety Map',
    icon: <MapIcon className="h-5 w-5" />,
    path: '/tourist/map'
  }, {
    name: 'Emergency',
    icon: <PhoneIcon className="h-5 w-5" />,
    path: '/tourist/emergency'
  }, {
    name: 'Alerts',
    icon: <BellIcon className="h-5 w-5" />,
    path: '/tourist/alerts'
  }, {
    name: 'Itinerary',
    icon: <FileTextIcon className="h-5 w-5" />,
    path: '/tourist/itinerary'
  }, {
    name: 'Settings',
    icon: <SettingsIcon className="h-5 w-5" />,
    path: '/tourist/settings'
  }];
  return <div className={`bg-white shadow-lg fixed inset-y-0 left-0 z-30 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="h-16 flex items-center justify-center border-b">
        <div className="flex items-center">
          <MapPinIcon className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            TourGuard
          </span>
        </div>
      </div>
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return <Link key={item.name} to={item.path} className={`group flex items-center px-2 py-3 text-base font-medium rounded-md ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <div className={`mr-4 ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                {item.name}
              </Link>;
        })}
        </div>
      </nav>
    </div>;
};
export default TouristAppSidebar;