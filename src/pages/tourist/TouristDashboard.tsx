import React, { useEffect, useState } from 'react';
import { MapPinIcon, CalendarIcon, UserIcon, BellIcon, ShieldIcon, NavigationIcon, PhoneIcon, AlertTriangleIcon, RefreshCwIcon, CheckCircleIcon } from 'lucide-react';
import SafetyScore from '../../components/tourist-app/SafetyScore';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
const TouristDashboard: React.FC = () => {
  const {
    userId
  } = useUser();
  const [loading, setLoading] = useState(true);
  const [refreshingLocation, setRefreshingLocation] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [weatherData] = useState({
    temperature: '24°C',
    condition: 'Partly Cloudy',
    forecast: [{
      day: 'Today',
      temp: '24°C',
      icon: '⛅️'
    }, {
      day: 'Tomorrow',
      temp: '22°C',
      icon: '🌧️'
    }, {
      day: 'Wed',
      temp: '25°C',
      icon: '☀️'
    }]
  });
  const [nearbyAlerts] = useState([{
    id: 1,
    title: 'Landslide Warning',
    location: 'Yumthang Valley',
    time: '2 hours ago',
    severity: 'high'
  }, {
    id: 2,
    title: 'Road Closure',
    location: 'Nathula Pass',
    time: '1 day ago',
    severity: 'medium'
  }]);
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const refreshLocation = () => {
    setRefreshingLocation(true);
    // Simulate refreshing location data
    setTimeout(() => {
      setRefreshingLocation(false);
      setLastUpdated(new Date());
    }, 2000);
  };
  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if (loading) {
    return <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </div>;
  }
  return <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome, {userId || 'Tourist'}!
          </h1>
          <p className="text-gray-500">Your safety is our priority</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center bg-white rounded-lg shadow-md px-4 py-3 transform transition-transform hover:scale-105">
          <div className="mr-3 text-3xl">{weatherData.forecast[0].icon}</div>
          <div>
            <div className="font-medium text-lg">{weatherData.temperature}</div>
            <div className="text-xs text-gray-500">Gangtok, Sikkim</div>
          </div>
        </div>
      </div>
      {/* Safety Status Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <div className="p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-2">Current Safety Status</h2>
              <div className="flex items-center">
                <ShieldIcon className="h-6 w-6 mr-2" />
                <span className="text-lg font-medium">Safe Zone</span>
              </div>
              <p className="mt-2 text-blue-100">
                You are currently in a monitored safe area
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/tourist/emergency">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Emergency Help
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              Last updated: {formatTime(lastUpdated)}
            </div>
            <div className="text-sm font-medium text-blue-600">
              TID-12345-IN
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/tourist/map" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-center text-center transform hover:translate-y-[-5px]">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <NavigationIcon className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium">Safety Map</span>
        </Link>
        <Link to="/tourist/alerts" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-center text-center transform hover:translate-y-[-5px]">
          <div className="bg-yellow-100 p-3 rounded-full mb-3">
            <BellIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <span className="text-sm font-medium">Alerts</span>
        </Link>
        <Link to="/tourist/itinerary" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-center text-center transform hover:translate-y-[-5px]">
          <div className="bg-green-100 p-3 rounded-full mb-3">
            <CalendarIcon className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-sm font-medium">Itinerary</span>
        </Link>
        <Link to="/tourist/profile" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-center text-center transform hover:translate-y-[-5px]">
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <UserIcon className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium">Profile</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Score Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ShieldIcon className="h-5 w-5 mr-2 text-blue-500" />
              Safety Score
            </h3>
          </div>
          <div className="p-5">
            <SafetyScore score={85} status="safe" />
          </div>
        </div>
        {/* Nearby Alerts */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-500" />
              Nearby Alerts
            </h3>
          </div>
          <div className="p-5">
            {nearbyAlerts.length > 0 ? <ul className="divide-y divide-gray-200">
                {nearbyAlerts.map(alert => <li key={alert.id} className="py-3 flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <AlertTriangleIcon className={`h-5 w-5 ${alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.title}
                        </p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getAlertSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span>{alert.location}</span>
                        <span className="mx-2">•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </li>)}
              </ul> : <div className="text-center py-6">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-gray-500">No alerts in your area</p>
              </div>}
            <div className="mt-4">
              <Link to="/tourist/alerts">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                  View All Alerts
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Current Location Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
            Current Location
          </h3>
          <button onClick={refreshLocation} disabled={refreshingLocation} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            <RefreshCwIcon className={`h-4 w-4 mr-1 ${refreshingLocation ? 'animate-spin' : ''}`} />
            {refreshingLocation ? 'Updating...' : 'Refresh'}
          </button>
        </div>
        <div className="h-64 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">
              Interactive map would be displayed here
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="font-medium text-gray-900">Gangtok, Sikkim</p>
                <p className="text-sm text-gray-500">MG Marg, Near Mall Road</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default TouristDashboard;