import React, { useState } from 'react';
import { AlertTriangleIcon, CheckIcon, XIcon, MapPinIcon, PhoneIcon, MessageCircleIcon } from 'lucide-react';
interface AlertIncident {
  id: number;
  touristName: string;
  touristId: string;
  type: string;
  location: string;
  timestamp: string;
  status: 'active' | 'in-progress' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}
const AdminAlerts: React.FC = () => {
  const [incidents, setIncidents] = useState<AlertIncident[]>([{
    id: 1,
    touristName: 'John Smith',
    touristId: 'TID-12345-IN',
    type: 'Panic Button',
    location: 'Nathula Pass',
    timestamp: '2023-12-10 10:15 AM',
    status: 'active',
    severity: 'critical',
    description: 'Tourist activated panic button. Immediate assistance required.'
  }, {
    id: 2,
    touristName: 'Emma Wilson',
    touristId: 'TID-23456-IN',
    type: 'Route Deviation',
    location: 'Tsomgo Lake',
    timestamp: '2023-12-10 09:30 AM',
    status: 'in-progress',
    severity: 'medium',
    description: 'Tourist has deviated from planned route by more than 2km.'
  }, {
    id: 3,
    touristName: 'Michael Brown',
    touristId: 'TID-34567-IN',
    type: 'Inactivity Alert',
    location: 'Gangtok',
    timestamp: '2023-12-09 11:45 PM',
    status: 'resolved',
    severity: 'low',
    description: 'No activity detected from tourist device for over 8 hours.'
  }, {
    id: 4,
    touristName: 'Sarah Davis',
    touristId: 'TID-45678-IN',
    type: 'Restricted Area Entry',
    location: 'Yumthang Valley',
    timestamp: '2023-12-09 02:20 PM',
    status: 'active',
    severity: 'high',
    description: 'Tourist has entered a high-risk restricted zone.'
  }]);
  const [selectedIncident, setSelectedIncident] = useState<AlertIncident | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [actionInProgress, setActionInProgress] = useState<{
    id: number | null;
    action: string | null;
  }>({
    id: null,
    action: null
  });
  const [showMapModal, setShowMapModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleStatusChange = (id: number, newStatus: 'active' | 'in-progress' | 'resolved') => {
    // Show action in progress
    setActionInProgress({
      id,
      action: `status-${newStatus}`
    });
    // Simulate API call with delay
    setTimeout(() => {
      setIncidents(incidents.map(incident => incident.id === id ? {
        ...incident,
        status: newStatus
      } : incident));
      if (selectedIncident && selectedIncident.id === id) {
        setSelectedIncident({
          ...selectedIncident,
          status: newStatus
        });
      }
      // Clear action status
      setActionInProgress({
        id: null,
        action: null
      });
    }, 800);
  };
  const handleDeleteIncident = (id: number) => {
    // Show action in progress
    setActionInProgress({
      id,
      action: 'delete'
    });
    // Simulate API call with delay
    setTimeout(() => {
      setIncidents(incidents.filter(incident => incident.id !== id));
      if (selectedIncident && selectedIncident.id === id) {
        setIsDetailsOpen(false);
      }
      // Clear action status
      setActionInProgress({
        id: null,
        action: null
      });
    }, 800);
  };
  const openIncidentDetails = (incident: AlertIncident) => {
    setSelectedIncident(incident);
    setIsDetailsOpen(true);
  };
  const viewOnMap = (incident: AlertIncident) => {
    setSelectedIncident(incident);
    setShowMapModal(true);
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowMapModal(false);
    }, 3000);
  };
  const callTourist = (incident: AlertIncident) => {
    setSelectedIncident(incident);
    setShowCallModal(true);
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowCallModal(false);
    }, 3000);
  };
  const filteredIncidents = filterStatus === 'all' ? incidents : incidents.filter(incident => incident.status === filterStatus);
  return <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Alerts & Incidents
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Incident Management
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Monitor and respond to tourist safety incidents
            </p>
          </div>
          <div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="all">All Incidents</option>
              <option value="active">Active</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tourist
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncidents.map(incident => <tr key={incident.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openIncidentDetails(incident)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          <AlertTriangleIcon className={`h-6 w-6 ${incident.severity === 'critical' ? 'text-red-500' : incident.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'}`} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {incident.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {incident.touristName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {incident.touristId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {incident.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {incident.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status === 'in-progress' ? 'In Progress' : incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center">
                        {actionInProgress.id === incident.id && <span className="text-xs text-blue-600 mr-2 animate-pulse">
                            Processing...
                          </span>}
                        <button onClick={e => {
                      e.stopPropagation();
                      handleStatusChange(incident.id, 'resolved');
                    }} disabled={actionInProgress.id === incident.id} className="text-green-600 hover:text-green-900 mr-3 disabled:opacity-50">
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button onClick={e => {
                      e.stopPropagation();
                      handleDeleteIncident(incident.id);
                    }} disabled={actionInProgress.id === incident.id} className="text-red-600 hover:text-red-900 disabled:opacity-50">
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Incident details modal */}
      {isDetailsOpen && selectedIncident && <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setIsDetailsOpen(false)}>
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${getSeverityColor(selectedIncident.severity)} sm:mx-0 sm:h-10 sm:w-10`}>
                  <AlertTriangleIcon className="h-6 w-6 text-current" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedIncident.type}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {selectedIncident.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 border-t border-gray-200 pt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Tourist
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedIncident.touristName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Tourist ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedIncident.touristId}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedIncident.location}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Time</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedIncident.timestamp}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedIncident.status)}`}>
                        {selectedIncident.status === 'in-progress' ? 'In Progress' : selectedIncident.status.charAt(0).toUpperCase() + selectedIncident.status.slice(1)}
                      </span>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Severity
                    </dt>
                    <dd className="mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(selectedIncident.severity)}`}>
                        {selectedIncident.severity.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-span-1" onClick={() => {
              viewOnMap(selectedIncident);
              setIsDetailsOpen(false);
            }}>
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  View on Map
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:col-span-1" onClick={() => {
              handleStatusChange(selectedIncident.id, 'in-progress');
            }} disabled={selectedIncident.status === 'in-progress' || selectedIncident.status === 'resolved'}>
                  Mark In Progress
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-span-1" onClick={() => {
              handleStatusChange(selectedIncident.id, 'resolved');
            }} disabled={selectedIncident.status === 'resolved'}>
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Map modal */}
      {showMapModal && selectedIncident && <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setShowMapModal(false)}>
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Location: {selectedIncident.location}
              </h3>
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Interactive map would display here showing the tourist's
                    location
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Coordinates for {selectedIncident.location}
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:flex sm:justify-between">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                    {selectedIncident.status.toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {selectedIncident.touristName} •{' '}
                    {selectedIncident.touristId}
                  </span>
                </div>
                <div className="mt-3 sm:mt-0 sm:flex sm:space-x-3">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => {
                callTourist(selectedIncident);
                setShowMapModal(false);
              }}>
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Call Tourist
                  </button>
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => {
                handleStatusChange(selectedIncident.id, 'resolved');
                setShowMapModal(false);
              }}>
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* Call modal */}
      {showCallModal && selectedIncident && <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Calling Tourist
                  </h3>
                  <button type="button" className="bg-gray-50 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none" onClick={() => setShowCallModal(false)}>
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="px-4 py-8 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <PhoneIcon className="h-10 w-10 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {selectedIncident.touristName}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedIncident.touristId}
                </p>
                <p className="text-sm text-gray-500 animate-pulse">
                  Connecting call...
                </p>
                <div className="mt-8 flex space-x-4">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => setShowCallModal(false)}>
                    <XIcon className="h-4 w-4 mr-2" />
                    End Call
                  </button>
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => {
                // Send message instead
                setShowCallModal(false);
              }}>
                    <MessageCircleIcon className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default AdminAlerts;