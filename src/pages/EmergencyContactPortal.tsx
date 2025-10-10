import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserIcon, MenuIcon, BellIcon, MapPinIcon, PhoneIcon, LogOutIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import EmergencyDashboard from './emergency/EmergencyDashboard';
import EmergencySettings from './emergency/EmergencySettings';
const EmergencyContactPortal: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {
    logout
  } = useUser();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-red-700 transition duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}>
        <div className="h-16 flex items-center justify-center border-b border-red-600">
          <div className="flex items-center">
            <PhoneIcon className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">
              Emergency Portal
            </span>
          </div>
        </div>
        <div className="mt-5 px-2">
          <nav className="space-y-1">
            <a href="/emergency" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-white bg-red-800">
              <MapPinIcon className="mr-4 h-6 w-6 text-red-300" />
              Track Tourist
            </a>
            <a href="/emergency/settings" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-red-100 hover:bg-red-600">
              <UserIcon className="mr-4 h-6 w-6 text-red-300" />
              Settings
            </a>
            <button onClick={handleLogout} className="w-full group flex items-center px-2 py-3 text-base font-medium rounded-md text-red-100 hover:bg-red-600">
              <LogOutIcon className="mr-4 h-6 w-6 text-red-300" />
              Logout
            </button>
          </nav>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center md:hidden">
                <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none">
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center">
                <div className="hidden md:block">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Emergency Contact Portal
                  </h1>
                </div>
              </div>
              <div className="flex items-center">
                <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none">
                  <BellIcon className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button className="flex items-center max-w-xs bg-gray-100 p-2 rounded-full text-sm focus:outline-none">
                      <UserIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                <Route path="/" element={<EmergencyDashboard />} />
                <Route path="/settings" element={<EmergencySettings />} />
                <Route path="*" element={<Navigate to="/emergency" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default EmergencyContactPortal;