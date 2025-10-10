import React, { useState } from 'react';
import { UserIcon, PlusCircleIcon, TrashIcon, PencilIcon, MapPinIcon, ShieldIcon, BatteryIcon, CheckIcon, XIcon } from 'lucide-react';
const FamilyMembers: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState([{
    id: 1,
    name: 'John Smith',
    relationship: 'Son',
    touristId: 'TID-12345-IN',
    currentLocation: 'Gangtok, Sikkim',
    lastUpdated: '10 minutes ago',
    status: 'safe',
    batteryLevel: 68
  }, {
    id: 2,
    name: 'Emma Wilson',
    relationship: 'Daughter',
    touristId: 'TID-67890-IN',
    currentLocation: 'Darjeeling, West Bengal',
    lastUpdated: '25 minutes ago',
    status: 'warning',
    batteryLevel: 32
  }]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    touristId: ''
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <ShieldIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ShieldIcon className="h-5 w-5 text-yellow-500" />;
      case 'danger':
        return <ShieldIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ShieldIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const handleAddMember = () => {
    // Validate
    if (!newMember.name || !newMember.relationship || !newMember.touristId) {
      return;
    }
    // Add new member
    const id = familyMembers.length + 1;
    setFamilyMembers([...familyMembers, {
      id,
      name: newMember.name,
      relationship: newMember.relationship,
      touristId: newMember.touristId,
      currentLocation: 'Not yet tracked',
      lastUpdated: 'Never',
      status: 'safe',
      batteryLevel: 100
    }]);
    // Reset and close modal
    setNewMember({
      name: '',
      relationship: '',
      touristId: ''
    });
    setShowAddModal(false);
  };
  const handleDeleteMember = (id: number) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    setShowDeleteModal(null);
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Travelers</h1>
          <p className="text-gray-500">
            Manage your family members who are traveling
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add Traveler
        </button>
      </div>
      {/* Travelers List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">
            Registered Family Members
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Family members you are currently tracking
          </p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {familyMembers.map(member => <li key={member.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {member.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-2">
                          {member.relationship} • {member.touristId}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {getStatusIcon(member.status)}
                          <span className="ml-1">
                            {member.status.toUpperCase()}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span>{member.currentLocation}</span>
                        <span className="mx-1">•</span>
                        <span>Updated: {member.lastUpdated}</span>
                        <span className="mx-1">•</span>
                        <BatteryIcon className="h-3 w-3 mx-1" />
                        <span>{member.batteryLevel}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => setShowDeleteModal(member.id)} className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>)}
            {familyMembers.length === 0 && <li className="px-4 py-8 sm:px-6 text-center">
                <div className="text-gray-500">
                  <p className="mb-2">No travelers added yet</p>
                  <button onClick={() => setShowAddModal(true)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                    <PlusCircleIcon className="h-4 w-4 mr-1" />
                    Add your first traveler
                  </button>
                </div>
              </li>}
          </ul>
        </div>
      </div>
      {/* Add Traveler Modal */}
      {showAddModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Add New Traveler
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={e => {
          e.preventDefault();
          handleAddMember();
        }} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={newMember.name} onChange={e => setNewMember({
              ...newMember,
              name: e.target.value
            })} required />
              </div>
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <select id="relationship" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={newMember.relationship} onChange={e => setNewMember({
              ...newMember,
              relationship: e.target.value
            })} required>
                  <option value="">Select relationship</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="touristId" className="block text-sm font-medium text-gray-700">
                  Tourist ID
                </label>
                <input type="text" id="touristId" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={newMember.touristId} onChange={e => setNewMember({
              ...newMember,
              touristId: e.target.value
            })} placeholder="e.g. TID-12345-IN" required />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the TourGuard ID provided to your family member
                </p>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Add Traveler
                </button>
              </div>
            </form>
          </div>
        </div>}
      {/* Delete Confirmation Modal */}
      {showDeleteModal !== null && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Remove Traveler
              </h3>
              <button onClick={() => setShowDeleteModal(null)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to remove this traveler from your tracking
              list? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(null)} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button onClick={() => handleDeleteMember(showDeleteModal)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <TrashIcon className="h-4 w-4 mr-2" />
                Remove
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default FamilyMembers;