import React, { useState } from 'react';
import { AlertTriangleIcon, PlusIcon, SaveIcon, TrashIcon } from 'lucide-react';
const DistrictZoneManagement: React.FC = () => {
  const [zones, setZones] = useState([{
    id: 1,
    name: 'Nathula Pass',
    type: 'restricted',
    description: 'Border area with restricted access',
    coordinates: '27.3866° N, 88.8317° E',
    radius: 5
  }, {
    id: 2,
    name: 'Yumthang Valley',
    type: 'high-risk',
    description: 'Prone to landslides during monsoon',
    coordinates: '27.8292° N, 88.6953° E',
    radius: 3
  }, {
    id: 3,
    name: 'Tsomgo Lake',
    type: 'moderate-risk',
    description: 'High altitude area with weather risks',
    coordinates: '27.3792° N, 88.7603° E',
    radius: 2
  }]);
  const [newZone, setNewZone] = useState({
    name: '',
    type: 'high-risk',
    description: '',
    coordinates: '',
    radius: 1
  });
  const [isAdding, setIsAdding] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setNewZone({
      ...newZone,
      [name]: value
    });
  };
  const addZone = () => {
    setZones([...zones, {
      id: zones.length + 1,
      ...newZone
    }]);
    setNewZone({
      name: '',
      type: 'high-risk',
      description: '',
      coordinates: '',
      radius: 1
    });
    setIsAdding(false);
  };
  const deleteZone = (id: number) => {
    setZones(zones.filter(zone => zone.id !== id));
  };
  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case 'restricted':
        return 'bg-red-100 text-red-800';
      case 'high-risk':
        return 'bg-orange-100 text-orange-800';
      case 'moderate-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'low-risk':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Risk Zone Management
        </h1>
        <button onClick={() => setIsAdding(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Zone
        </button>
      </div>
      {isAdding && <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-purple-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Risk Zone
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Zone Name
                </label>
                <input type="text" name="name" id="name" value={newZone.name} onChange={handleInputChange} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Risk Level
                </label>
                <select id="type" name="type" value={newZone.type} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                  <option value="restricted">Restricted Area</option>
                  <option value="high-risk">High Risk</option>
                  <option value="moderate-risk">Moderate Risk</option>
                  <option value="low-risk">Low Risk</option>
                </select>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea id="description" name="description" rows={3} value={newZone.description} onChange={handleInputChange} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">
                  Coordinates (Lat, Long)
                </label>
                <input type="text" name="coordinates" id="coordinates" value={newZone.coordinates} onChange={handleInputChange} placeholder="e.g. 27.3866° N, 88.8317° E" className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
                  Radius (km)
                </label>
                <input type="number" name="radius" id="radius" min="0.1" step="0.1" value={newZone.radius} onChange={handleInputChange} className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Cancel
              </button>
              <button type="button" onClick={addZone} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <SaveIcon className="h-5 w-5 mr-2" />
                Save Zone
              </button>
            </div>
          </div>
        </div>}
      <div className="flex-1 flex">
        <div className="w-full">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Risk Zones
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Manage high-risk and restricted areas for tourist safety
                </p>
              </div>
              <div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                  {zones.length} Zones
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {zones.map(zone => <li key={zone.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${zone.type === 'restricted' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                            <AlertTriangleIcon className={`h-6 w-6 ${zone.type === 'restricted' ? 'text-red-600' : 'text-yellow-600'}`} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {zone.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {zone.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getZoneTypeColor(zone.type)}`}>
                          {zone.type.replace('-', ' ').toUpperCase()}
                        </span>
                        <div className="ml-4 flex-shrink-0 flex">
                          <button onClick={() => deleteZone(zone.id)} className="ml-2 p-1 rounded-full text-red-600 hover:bg-red-100">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Coordinates: {zone.coordinates}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>Radius: {zone.radius} km</p>
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
export default DistrictZoneManagement;