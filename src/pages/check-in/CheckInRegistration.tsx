import React, { useState } from 'react';
import { UserPlusIcon, CheckIcon } from 'lucide-react';
interface TouristFormData {
  firstName: string;
  lastName: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  accommodation: string;
  stayDuration: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}
const CheckInRegistration: React.FC = () => {
  const [formData, setFormData] = useState<TouristFormData>({
    firstName: '',
    lastName: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    accommodation: '',
    stayDuration: '',
    emergencyContactName: '',
    emergencyContactNumber: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [touristId, setTouristId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to register tourist
    setTimeout(() => {
      // Generate a random tourist ID
      const randomId = Math.floor(10000 + Math.random() * 90000);
      setTouristId(`TID-${randomId}-IN`);
      setSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };
  const handleNewRegistration = () => {
    setFormData({
      firstName: '',
      lastName: '',
      nationality: '',
      passportNumber: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      email: '',
      accommodation: '',
      stayDuration: '',
      emergencyContactName: '',
      emergencyContactNumber: ''
    });
    setSubmitted(false);
    setTouristId('');
  };
  if (submitted) {
    return <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-green-100 rounded-full p-3">
            <CheckIcon className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Registration Successful
          </h2>
          <p className="mt-2 text-gray-600">
            Tourist has been registered successfully
          </p>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg w-full max-w-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Tourist ID
            </h3>
            <p className="text-2xl font-bold text-blue-600">{touristId}</p>
            <p className="mt-2 text-sm text-gray-500">
              Please provide this ID to the tourist for all future interactions
              with the system.
            </p>
          </div>
          <div className="mt-8 flex space-x-4">
            <button onClick={handleNewRegistration} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Register New Tourist
            </button>
            <button onClick={() => window.print()} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Print Registration
            </button>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Tourist Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <input type="text" name="nationality" id="nationality" required value={formData.nationality} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">
              Passport/ID Number
            </label>
            <input type="text" name="passportNumber" id="passportNumber" required value={formData.passportNumber} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input type="date" name="dateOfBirth" id="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input type="tel" name="phoneNumber" id="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700">
              Accommodation
            </label>
            <input type="text" name="accommodation" id="accommodation" required value={formData.accommodation} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="stayDuration" className="block text-sm font-medium text-gray-700">
              Stay Duration (days)
            </label>
            <input type="number" name="stayDuration" id="stayDuration" min="1" required value={formData.stayDuration} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">
              Emergency Contact Name
            </label>
            <input type="text" name="emergencyContactName" id="emergencyContactName" required value={formData.emergencyContactName} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700">
              Emergency Contact Number
            </label>
            <input type="tel" name="emergencyContactNumber" id="emergencyContactNumber" required value={formData.emergencyContactNumber} onChange={handleChange} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
        </div>
        <div className="mt-8">
          <button type="submit" disabled={isLoading} className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}>
            {isLoading ? <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </> : 'Register Tourist'}
          </button>
        </div>
      </form>
    </div>;
};
export default CheckInRegistration;