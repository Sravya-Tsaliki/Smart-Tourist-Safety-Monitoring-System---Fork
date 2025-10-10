import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, MenuIcon, LogOutIcon, UsersIcon, ClipboardListIcon, SettingsIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import CheckInRegistration from './check-in/CheckInRegistration';
import CheckInHistory from './check-in/CheckInHistory';
import CheckInSettings from './check-in/CheckInSettings';
const CheckInPortal: React.FC = () => {
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
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-green-700 transition duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}>
        <div className="h-16 flex items-center justify-center border-b border-green-600">
          <div className="flex items-center">
            <UserPlusIcon className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">
              Tourist Check-In
            </span>
          </div>
        </div>
        <div className="mt-5 px-2">
          <nav className="space-y-1">
            <a href="/check-in" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-white bg-green-800">
              <UserPlusIcon className="mr-4 h-6 w-6 text-green-300" />
              New Registration
            </a>
            <a href="/check-in/history" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-green-100 hover:bg-green-600">
              <ClipboardListIcon className="mr-4 h-6 w-6 text-green-300" />
              Registration History
            </a>
            <a href="/check-in/settings" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-green-100 hover:bg-green-600">
              <SettingsIcon className="mr-4 h-6 w-6 text-green-300" />
              Settings
            </a>
            <button onClick={handleLogout} className="w-full group flex items-center px-2 py-3 text-base font-medium rounded-md text-green-100 hover:bg-green-600">
              <LogOutIcon className="mr-4 h-6 w-6 text-green-300" />
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
                    Tourist Registration Portal
                  </h1>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div>
                    <button className="flex items-center max-w-xs bg-gray-100 p-2 rounded-full text-sm focus:outline-none">
                      <UsersIcon className="h-6 w-6 text-gray-500" />
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
                <Route path="/" element={<CheckInRegistration />} />
                <Route path="/history" element={<CheckInHistory />} />
                <Route path="/settings" element={<CheckInSettings />} />
                <Route path="*" element={<Navigate to="/check-in" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default CheckInPortal;