import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TouristApp from './pages/TouristApp';
import AdminDashboard from './pages/AdminDashboard';
import CheckInPortal from './pages/CheckInPortal';
import DistrictOfficialPortal from './pages/DistrictOfficialPortal';
import EmergencyContactPortal from './pages/EmergencyContactPortal';
import FamilyDashboard from './pages/FamilyDashboard';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
export function App() {
  return <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tourist/*" element={<ProtectedRoute userType="tourist">
                  <TouristApp />
                </ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>} />
            <Route path="/check-in/*" element={<ProtectedRoute userType="check-in">
                  <CheckInPortal />
                </ProtectedRoute>} />
            <Route path="/district/*" element={<ProtectedRoute userType="district">
                  <DistrictOfficialPortal />
                </ProtectedRoute>} />
            <Route path="/emergency/*" element={<ProtectedRoute userType="emergency">
                  <EmergencyContactPortal />
                </ProtectedRoute>} />
            <Route path="/family/*" element={<ProtectedRoute userType="family">
                  <FamilyDashboard />
                </ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>;
}