import React, { useState } from 'react';
import { AlertTriangleIcon, PlusIcon, XIcon, BellIcon } from 'lucide-react';
interface Alert {
  id: number;
  title: string;
  description: string;
  area: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
  createdAt: string;
}
const DistrictAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([{
    id: 1,
    title: 'Landslide Warning',
    description: 'Landslide warning issued for Yumthang Valley due to heavy rainfall',
    area: 'Yumthang Valley',
    severity: 'high',
    status: 'active',
    createdAt: '2023-12-10 08:30 AM'
  }, {
    id: 2,
    title: 'Road Closure',
    description: 'Road to Nathula Pass closed due to maintenance',
    area: 'Nathula Pass',
    severity: 'medium',
    status: 'active',
    createdAt: '2023-12-09 02:15 PM'
  }, {
    id: 3,
    title: 'Heavy Snowfall Alert',
    description: 'Heavy snowfall expected in higher elevations',
    area: 'Gurudongmar Lake',
    severity: 'medium',
    status: 'active',
    createdAt: '2023-12-08 11:45 AM'
  }]);
  const [isAddingAlert, setIsAddingAlert] = useState(false);
  const [newAlert, setNewAlert] = useState<Omit<Alert, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    area: '',
    severity: 'medium',
    status: 'active'
  });
  const [isSending, setIsSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setNewAlert({
      ...newAlert,
      [name]: value
    });
  };
  const addAlert = () => {
    setIsSending(true);
    // Simulate API call to add alert
    setTimeout(() => {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      setAlerts([{
        id: alerts.length + 1,
        ...newAlert,
        createdAt: formattedDate
      }, ...alerts]);
      setNewAlert({
        title: '',
        description: '',
        area: '',
        severity: 'medium',
        status: 'active'
      });
      setIsAddingAlert(false);
      setIsSending(false);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }, 1500);
  };
  const resolveAlert = (id: number) => {
    setAlerts(alerts.map(alert => alert.id === id ? {
      ...alert,
      status: 'resolved'
    } : alert));
  };
  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          District Alerts
        </h1>
        <button onClick={() => setIsAddingAlert(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          <PlusIcon className="h-5 w-5 mr-2" />
          Issue New Alert
        </button>
      </div>

      {showConfirmation && <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <BellIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Alert has been issued successfully and sent to all tourists in
                the affected area.
              </p>
            </div>
          </div>
        </div>}

      {isAddingAlert && <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-purple-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Issue New Alert
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Alert Title
                </label>
                <input type="text" name="title" id="title" value={newAlert.title} onChange={handleInputChange} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                  Affected Area
                </label>
                <input type="text" name="area" id="area" value={newAlert.area} onChange={handleInputChange} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Alert Description
                </label>
                <textarea id="description" name="description" rows={3} value={newAlert.description} onChange={handleInputChange} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
                  Severity Level
                </label>
                <select id="severity" name="severity" value={newAlert.severity} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={() => setIsAddingAlert(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Cancel
              </button>
              <button type="button" onClick={addAlert} disabled={isSending} className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSending ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}>
                {isSending ? <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </> : 'Issue Alert'}
              </button>
            </div>
          </div>
        </div>}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Active Alerts
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Current alerts and warnings for tourists
            </p>
          </div>
          <div>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
              {alerts.filter(alert => alert.status === 'active').length}{' '}
              Active
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          {alerts.length > 0 ? <ul className="divide-y divide-gray-200">
              {alerts.map(alert => <li key={alert.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                          <AlertTriangleIcon className="h-6 w-6 text-current" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {alert.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {alert.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {alert.status.toUpperCase()}
                      </span>
                      <div className="ml-4 flex-shrink-0 flex">
                        {alert.status === 'active' && <button onClick={() => resolveAlert(alert.id)} className="ml-2 p-1 rounded-full text-green-600 hover:bg-green-100">
                            <span className="sr-only">Resolve</span>
                            <CheckIcon className="h-5 w-5" />
                          </button>}
                        <button onClick={() => deleteAlert(alert.id)} className="ml-2 p-1 rounded-full text-red-600 hover:bg-red-100">
                          <span className="sr-only">Delete</span>
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Area: {alert.area}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Created: {alert.createdAt}</p>
                    </div>
                  </div>
                </li>)}
            </ul> : <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">No alerts available</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default DistrictAlerts;