import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserIcon, MenuIcon, BellIcon, MapPinIcon, PhoneIcon, LogOutIcon, SettingsIcon, UsersIcon, HomeIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import FamilyHome from './family/FamilyHome';
import FamilySettings from './family/FamilySettings';
import FamilyMembers from './family/FamilyMembers';
const FamilyDashboard: React.FC = () => {
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
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-600 transition duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}>
        <div className="h-16 flex items-center justify-center border-b border-blue-500">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">
              Family Portal
            </span>
          </div>
        </div>
        <div className="mt-5 px-2">
          <nav className="space-y-1">
            <a href="/family" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-white bg-blue-700">
              <HomeIcon className="mr-4 h-6 w-6 text-blue-200" />
              Dashboard
            </a>
            <a href="/family/members" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-blue-100 hover:bg-blue-700">
              <UsersIcon className="mr-4 h-6 w-6 text-blue-200" />
              My Travelers
            </a>
            <a href="/family/settings" className="group flex items-center px-2 py-3 text-base font-medium rounded-md text-blue-100 hover:bg-blue-700">
              <SettingsIcon className="mr-4 h-6 w-6 text-blue-200" />
              Settings
            </a>
            <button onClick={handleLogout} className="w-full group flex items-center px-2 py-3 text-base font-medium rounded-md text-blue-100 hover:bg-blue-700">
              <LogOutIcon className="mr-4 h-6 w-6 text-blue-200" />
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
                    Family Traveler Tracking
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
                <Route path="/" element={<FamilyHome />} />
                <Route path="/members" element={<FamilyMembers />} />
                <Route path="/settings" element={<FamilySettings />} />
                <Route path="*" element={<Navigate to="/family" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default FamilyDashboard;