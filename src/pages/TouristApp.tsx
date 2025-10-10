import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TouristAppHeader from '../components/tourist-app/TouristAppHeader';
import TouristAppSidebar from '../components/tourist-app/TouristAppSidebar';
import TouristDashboard from './tourist/TouristDashboard';
import TouristMap from './tourist/TouristMap';
import TouristEmergency from './tourist/TouristEmergency';
import TouristProfile from './tourist/TouristProfile';
import TouristAlerts from './tourist/TouristAlerts';
import TouristItinerary from './tourist/TouristItinerary';
import TouristSettings from './tourist/TouristSettings';
const TouristApp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return <div className="h-screen flex overflow-hidden bg-gray-100">
      <TouristAppSidebar isOpen={sidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <TouristAppHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                <Route path="/" element={<TouristDashboard />} />
                <Route path="/map" element={<TouristMap />} />
                <Route path="/emergency" element={<TouristEmergency />} />
                <Route path="/profile" element={<TouristProfile />} />
                <Route path="/alerts" element={<TouristAlerts />} />
                <Route path="/itinerary" element={<TouristItinerary />} />
                <Route path="/settings" element={<TouristSettings />} />
                <Route path="*" element={<Navigate to="/tourist" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default TouristApp;