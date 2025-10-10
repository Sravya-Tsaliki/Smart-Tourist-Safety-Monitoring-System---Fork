import React, { useState } from 'react';
import { UserIcon, AlertTriangleIcon, MapPinIcon, ShieldIcon, ArrowUpIcon, ArrowDownIcon, ChevronRightIcon, CheckCircleIcon, ClockIcon, MapIcon, PhoneIcon, UsersIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  // Mock data
  const touristStats = {
    activeTourists: 1245,
    activeTouristsChange: 8.2,
    alertsToday: 18,
    alertsTodayChange: -4.3,
    highRiskAreas: 5,
    highRiskAreasChange: 0,
    resolutionRate: 92,
    resolutionRateChange: 2.5
  };
  const touristsByRegion = [{
    name: 'Gangtok',
    tourists: 450,
    fill: '#3B82F6'
  }, {
    name: 'Darjeeling',
    tourists: 320,
    fill: '#10B981'
  }, {
    name: 'Shillong',
    tourists: 280,
    fill: '#F59E0B'
  }, {
    name: 'Tawang',
    tourists: 195,
    fill: '#6366F1'
  }, {
    name: 'Kohima',
    tourists: 150,
    fill: '#EC4899'
  }];
  const alertsOverTime = [{
    name: 'Mon',
    alerts: 12
  }, {
    name: 'Tue',
    alerts: 15
  }, {
    name: 'Wed',
    alerts: 18
  }, {
    name: 'Thu',
    alerts: 14
  }, {
    name: 'Fri',
    alerts: 21
  }, {
    name: 'Sat',
    alerts: 25
  }, {
    name: 'Sun',
    alerts: 18
  }];
  const alertsByType = [{
    name: 'Panic Button',
    value: 15,
    color: '#EF4444'
  }, {
    name: 'Route Deviation',
    value: 25,
    color: '#F59E0B'
  }, {
    name: 'Restricted Area',
    value: 20,
    color: '#8B5CF6'
  }, {
    name: 'Inactivity',
    value: 40,
    color: '#3B82F6'
  }];
  const [recentAlerts, setRecentAlerts] = useState([{
    id: 1,
    tourist: 'John Smith',
    location: 'Nathula Pass',
    type: 'Restricted Area Entry',
    time: '10 mins ago',
    status: 'Active'
  }, {
    id: 2,
    tourist: 'Emma Wilson',
    location: 'Tsomgo Lake',
    type: 'Inactivity Alert',
    time: '25 mins ago',
    status: 'Resolved'
  }, {
    id: 3,
    tourist: 'Michael Brown',
    location: 'Gangtok',
    type: 'Panic Button',
    time: '1 hour ago',
    status: 'Resolved'
  }, {
    id: 4,
    tourist: 'Sarah Davis',
    location: 'Yumthang Valley',
    type: 'Route Deviation',
    time: '2 hours ago',
    status: 'Active'
  }]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [actionFeedback, setActionFeedback] = useState<{
    id: number;
    action: string;
    visible: boolean;
  } | null>(null);
  // Handle action button clicks with feedback
  const handleActionButton = (alertId: number, actionType: string) => {
    // Show feedback message
    setActionFeedback({
      id: alertId,
      action: actionType,
      visible: true
    });
    // Hide feedback after 2 seconds
    setTimeout(() => {
      setActionFeedback(null);
      // Update alert status if it was a resolve action
      if (actionType === 'resolve') {
        setRecentAlerts(prevAlerts => prevAlerts.map(alert => alert.id === alertId ? {
          ...alert,
          status: 'Resolved'
        } : alert));
      }
    }, 2000);
  };
  // Navigate to alerts page
  const viewAllAlerts = () => {
    navigate('/admin/alerts');
  };
  // Navigate to tourist details page
  const viewTouristDetails = (touristName: string) => {
    navigate('/admin/tourists', {
      state: {
        touristName
      }
    });
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Welcome to the Tourist Monitoring System
          </p>
        </div>
        <div className="mt-2 md:mt-0 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex rounded-md p-1">
            <button onClick={() => setSelectedTimeRange('day')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${selectedTimeRange === 'day' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
              Day
            </button>
            <button onClick={() => setSelectedTimeRange('week')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${selectedTimeRange === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
              Week
            </button>
            <button onClick={() => setSelectedTimeRange('month')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${selectedTimeRange === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>
              Month
            </button>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Tourists
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {touristStats.activeTourists}
                    </div>
                    <div className={`ml-2 flex items-center text-sm font-semibold ${touristStats.activeTouristsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {touristStats.activeTouristsChange > 0 ? <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" /> : <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />}
                      <span className="sr-only">
                        {touristStats.activeTouristsChange > 0 ? 'Increased' : 'Decreased'}{' '}
                        by
                      </span>
                      {Math.abs(touristStats.activeTouristsChange)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <AlertTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Alerts Today
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {touristStats.alertsToday}
                    </div>
                    <div className={`ml-2 flex items-center text-sm font-semibold ${touristStats.alertsTodayChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {touristStats.alertsTodayChange < 0 ? <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" /> : <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />}
                      <span className="sr-only">
                        {touristStats.alertsTodayChange < 0 ? 'Decreased' : 'Increased'}{' '}
                        by
                      </span>
                      {Math.abs(touristStats.alertsTodayChange)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <MapPinIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    High Risk Areas
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {touristStats.highRiskAreas}
                    </div>
                    <div className="ml-2 flex items-center text-sm font-semibold text-gray-600">
                      <span>No change</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <ShieldIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Resolution Rate
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {touristStats.resolutionRate}%
                    </div>
                    <div className={`ml-2 flex items-center text-sm font-semibold ${touristStats.resolutionRateChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {touristStats.resolutionRateChange > 0 ? <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" /> : <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />}
                      <span className="sr-only">
                        {touristStats.resolutionRateChange > 0 ? 'Increased' : 'Decreased'}{' '}
                        by
                      </span>
                      {Math.abs(touristStats.resolutionRateChange)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Tourist Distribution by Region
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={touristsByRegion} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 30
              }} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
                  fill: '#6B7280',
                  fontSize: 12
                }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{
                  fill: '#6B7280',
                  fontSize: 12
                }} />
                  <Tooltip cursor={{
                  fill: 'rgba(224, 231, 255, 0.2)'
                }} contentStyle={{
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB'
                }} />
                  <Bar dataKey="tourists" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                    {touristsByRegion.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Alerts Over Time
            </h3>
            <div className="text-sm font-medium text-blue-600">
              {selectedTimeRange.charAt(0).toUpperCase() + selectedTimeRange.slice(1)}
              ly view
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertsOverTime} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 30
              }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
                  fill: '#6B7280',
                  fontSize: 12
                }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{
                  fill: '#6B7280',
                  fontSize: 12
                }} />
                  <Tooltip contentStyle={{
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB'
                }} />
                  <Line type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={3} dot={{
                  fill: '#EF4444',
                  strokeWidth: 2,
                  r: 4
                }} activeDot={{
                  r: 6
                }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Alert Types */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Alert Types</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={alertsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {alertsByType.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB'
                }} formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {alertsByType.map(type => <div key={type.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full" style={{
                backgroundColor: type.color
              }}></div>
                  <span className="ml-2 text-sm text-gray-600">
                    {type.name}
                  </span>
                  <span className="ml-auto text-sm font-medium">
                    {type.value}%
                  </span>
                </div>)}
            </div>
          </div>
        </div>
        {/* Recent Alerts */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 lg:col-span-2">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
            <button onClick={viewAllAlerts} className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
              View all
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="px-4 py-3">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {recentAlerts.map(alert => <li key={alert.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${alert.status === 'Active' ? 'bg-red-100' : 'bg-green-100'}`}>
                          <AlertTriangleIcon className={`h-5 w-5 ${alert.status === 'Active' ? 'text-red-600' : 'text-green-600'}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <button onClick={() => viewTouristDetails(alert.tourist)} className="text-sm font-medium text-gray-900 truncate flex items-center hover:text-blue-600">
                          {alert.tourist}
                          <span className="ml-2 text-xs text-gray-500">
                            {alert.type}
                          </span>
                        </button>
                        <div className="flex items-center mt-1">
                          {alert.status === 'Active' ? <ClockIcon className="flex-shrink-0 h-4 w-4 text-yellow-500 mr-1" /> : <CheckCircleIcon className="flex-shrink-0 h-4 w-4 text-green-500 mr-1" />}
                          <p className="text-xs text-gray-500 truncate">
                            {alert.status === 'Active' ? 'Awaiting response' : 'Resolved'}
                          </p>
                        </div>
                        {actionFeedback && actionFeedback.id === alert.id && actionFeedback.visible && <div className="mt-1 text-xs text-green-600 animate-pulse">
                              {actionFeedback.action === 'map' && 'Opening map view...'}
                              {actionFeedback.action === 'call' && 'Initiating call...'}
                              {actionFeedback.action === 'team' && 'Notifying response team...'}
                              {actionFeedback.action === 'resolve' && 'Marking as resolved...'}
                            </div>}
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end">
                        <p className="text-xs text-gray-500">{alert.time}</p>
                        <div className="mt-1 flex space-x-2">
                          <button onClick={() => handleActionButton(alert.id, 'map')} className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100" aria-label="View on map">
                            <MapIcon className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleActionButton(alert.id, 'call')} className="p-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100" aria-label="Call tourist">
                            <PhoneIcon className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleActionButton(alert.id, 'team')} className="p-1 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100" aria-label="Notify response team">
                            <UsersIcon className="h-4 w-4" />
                          </button>
                          {alert.status === 'Active' && <button onClick={() => handleActionButton(alert.id, 'resolve')} className="p-1 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100" aria-label="Mark as resolved">
                              <CheckIcon className="h-4 w-4" />
                            </button>}
                        </div>
                      </div>
                    </div>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminHome;