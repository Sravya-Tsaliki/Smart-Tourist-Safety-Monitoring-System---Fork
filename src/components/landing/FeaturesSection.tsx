import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, MapPin, Activity, Smartphone, BellRing, FileDigit } from 'lucide-react';
const features = [{
  name: 'AI Anomaly Detection',
  description: 'Advanced machine learning algorithms detect unusual patterns and potential risks before they become emergencies.',
  icon: Activity,
  color: 'bg-blue-100 text-blue-600'
}, {
  name: 'Panic Alert System',
  description: 'Instant SOS alerts with one-touch activation, automatically sharing location data with authorities and emergency contacts.',
  icon: AlertTriangle,
  color: 'bg-red-100 text-red-600'
}, {
  name: 'Blockchain Digital ID',
  description: 'Secure, tamper-proof digital identity using blockchain technology for tourist verification and tracking.',
  icon: FileDigit,
  color: 'bg-green-100 text-green-600'
}, {
  name: 'Real-time Location Monitoring',
  description: 'GPS and IoT-based location tracking with geofencing to ensure tourists remain in safe areas.',
  icon: MapPin,
  color: 'bg-yellow-100 text-yellow-600'
}, {
  name: 'Multi-level Alert System',
  description: 'Color-coded, tiered notification system for different emergency levels, ensuring appropriate and timely responses.',
  icon: BellRing,
  color: 'bg-purple-100 text-purple-600'
}, {
  name: 'Mobile App Integration',
  description: 'Seamless mobile experience for tourists with offline capabilities and low battery consumption.',
  icon: Smartphone,
  color: 'bg-indigo-100 text-indigo-600'
}];
const FeaturesSection: React.FC = () => {
  return <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Safety Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our intelligent system combines cutting-edge technology with
            practical safety features to protect tourists in any situation.
          </p>
        </div>
        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map(feature => <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                  <div className={`p-3 rounded-md ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default FeaturesSection;