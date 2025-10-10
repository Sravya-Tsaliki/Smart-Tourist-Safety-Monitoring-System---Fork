import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, UserIcon, ShieldIcon, ChevronDownIcon, CheckIcon, AlertCircleIcon, KeyIcon, RefreshCwIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import TwoFactorAuth from '../components/auth/TwoFactorAuth';
import CaptchaVerification from '../components/auth/CaptchaVerification';
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'tourist' | 'admin' | 'check-in' | 'district' | 'emergency' | 'family'>('tourist');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const navigate = useNavigate();
  const {
    setUserType: setContextUserType,
    setIsLoggedIn,
    setUserId,
    isLoggedIn,
    userType: currentUserType,
    remainingLoginAttempts,
    decrementLoginAttempts,
    resetLoginAttempts,
    isLocked,
    twoFactorVerified,
    setTwoFactorVerified,
    setRememberDevice: setContextRememberDevice,
    trustedDevices
  } = useUser();
  // Redirect if already logged in and 2FA verified
  useEffect(() => {
    if (isLoggedIn && currentUserType && twoFactorVerified) {
      navigateToUserDashboard(currentUserType);
    }
  }, [isLoggedIn, currentUserType, twoFactorVerified]);
  // Enable captcha after 3 failed attempts
  useEffect(() => {
    if (remainingLoginAttempts <= 2) {
      setCaptchaRequired(true);
    }
  }, [remainingLoginAttempts]);
  const navigateToUserDashboard = (userType: string) => {
    switch (userType) {
      case 'tourist':
        navigate('/tourist');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'check-in':
        navigate('/check-in');
        break;
      case 'district':
        navigate('/district');
        break;
      case 'emergency':
        navigate('/emergency');
        break;
      case 'family':
        navigate('/family');
        break;
      default:
        navigate('/login');
    }
  };
  const userTypeOptions = [{
    value: 'tourist',
    label: 'Tourist',
    icon: '🧳'
  }, {
    value: 'admin',
    label: 'Monitoring Agent',
    icon: '👁️'
  }, {
    value: 'check-in',
    label: 'Check-in Agent',
    icon: '✓'
  }, {
    value: 'district',
    label: 'District Official',
    icon: '🏛️'
  }, {
    value: 'emergency',
    label: 'Emergency Contact',
    icon: '🚨'
  }, {
    value: 'family',
    label: 'Family Member',
    icon: '👪'
  }];
  const selectedUserType = userTypeOptions.find(option => option.value === userType);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    // Check if account is locked
    if (isLocked) {
      setError('Account is temporarily locked due to multiple failed attempts. Please try again later.');
      setIsSubmitting(false);
      return;
    }
    // Check if captcha is required but not verified
    if (captchaRequired && !captchaVerified) {
      setError('Please complete the CAPTCHA verification');
      setIsSubmitting(false);
      return;
    }
    // Basic validation
    if (!username || !password) {
      setError('Username and password are required');
      setIsSubmitting(false);
      return;
    }
    // Simulate password strength check
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      decrementLoginAttempts();
      setIsSubmitting(false);
      return;
    }
    // Simulate loading for better UX
    setTimeout(() => {
      try {
        // In a real app, this would authenticate against a backend
        // For demo purposes, we'll accept any username/password combination
        // that meets the basic requirements
        // Successful login
        setIsLoggedIn(true);
        setContextUserType(userType);
        setUserId(username);
        // Reset login attempts on successful login
        resetLoginAttempts();
        // Remember device if checked
        if (rememberDevice) {
          setContextRememberDevice(true);
        }
        // Check if 2FA is required
        // For demo purposes, we'll require 2FA for admin and district roles
        if (userType === 'admin' || userType === 'district') {
          setShowTwoFactor(true);
        } else {
          // For other roles, we'll skip 2FA
          setTwoFactorVerified(true);
          // Navigate based on user type
          navigateToUserDashboard(userType);
        }
      } catch (err) {
        setError('An error occurred during login. Please try again.');
        decrementLoginAttempts();
        console.error('Login error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };
  const handleTwoFactorComplete = () => {
    setTwoFactorVerified(true);
    navigateToUserDashboard(userType);
  };
  const handleTwoFactorCancel = () => {
    setShowTwoFactor(false);
    setIsLoggedIn(false);
    setContextUserType(null);
    setUserId(null);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // If showing 2FA screen
  if (showTwoFactor) {
    return <TwoFactorAuth onComplete={handleTwoFactorComplete} onCancel={handleTwoFactorCancel} userType={userType} />;
  }
  return <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-600 to-indigo-800">
      {/* Left side - Branding/Info Panel */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <ShieldIcon className="h-12 w-12 text-white" />
            <span className="ml-4 text-4xl font-bold">TourGuard</span>
          </div>
          <h2 className="text-3xl font-bold mb-6">
            Smart Tourist Safety Monitoring System
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-400 bg-opacity-30 flex items-center justify-center">
                <ShieldIcon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium">Real-time Protection</h3>
                <p className="mt-1 text-gray-200">
                  Advanced monitoring for tourist safety with instant alerts
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-400 bg-opacity-30 flex items-center justify-center">
                <UserIcon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium">Multiple User Roles</h3>
                <p className="mt-1 text-gray-200">
                  Specialized interfaces for tourists, officials, and emergency
                  services
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-400 bg-opacity-30 flex items-center justify-center">
                <LockIcon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium">Secure & Private</h3>
                <p className="mt-1 text-gray-200">
                  End-to-end encryption and blockchain-secured digital IDs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="md:hidden flex justify-center mb-6">
                <ShieldIcon className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Sign in to continue to your dashboard
              </p>
              {error && <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                  <div className="flex items-center">
                    <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>}
              {isLocked && <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                  <div className="flex items-center">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-700">
                        Account is temporarily locked due to multiple failed
                        attempts.
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Please try again in 15 minutes or contact support.
                      </p>
                    </div>
                  </div>
                </div>}
              {!isLocked && remainingLoginAttempts < 5 && <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                  <div className="flex items-center">
                    <KeyIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-sm text-blue-700">
                      {remainingLoginAttempts} login{' '}
                      {remainingLoginAttempts === 1 ? 'attempt' : 'attempts'}{' '}
                      remaining
                    </p>
                  </div>
                </div>}
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="username" name="username" type="text" required className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 sm:text-sm" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} disabled={isLocked} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 sm:text-sm" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLocked} />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${password.length === 0 ? 'w-0' : password.length < 6 ? 'w-1/4 bg-red-500' : password.length < 8 ? 'w-2/4 bg-yellow-500' : password.length < 10 ? 'w-3/4 bg-blue-500' : 'w-full bg-green-500'}`}></div>
                      </div>
                      {password.length > 0 && <p className="text-xs text-gray-500 mt-1">
                          {password.length < 6 ? 'Weak password' : password.length < 8 ? 'Fair password' : password.length < 10 ? 'Good password' : 'Strong password'}
                        </p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                      User Type
                    </label>
                    <div className="mt-1 relative">
                      <button type="button" className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" onClick={() => !isLocked && setIsDropdownOpen(!isDropdownOpen)} disabled={isLocked}>
                        <div className="flex items-center">
                          <span className="text-xl mr-2">
                            {selectedUserType?.icon}
                          </span>
                          <span className="block truncate">
                            {selectedUserType?.label}
                          </span>
                        </div>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </button>
                      {isDropdownOpen && <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
                          {userTypeOptions.map(option => <div key={option.value} className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${userType === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`} onClick={() => {
                        setUserType(option.value as any);
                        setIsDropdownOpen(false);
                      }}>
                              <div className="flex items-center">
                                <span className="text-xl mr-2">
                                  {option.icon}
                                </span>
                                <span className={`block truncate ${userType === option.value ? 'font-medium' : 'font-normal'}`}>
                                  {option.label}
                                </span>
                              </div>
                              {userType === option.value && <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>}
                            </div>)}
                        </div>}
                    </div>
                  </div>
                </div>
                {captchaRequired && <div className="mt-4">
                    <CaptchaVerification onVerify={() => setCaptchaVerified(true)} onExpire={() => setCaptchaVerified(false)} />
                  </div>}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-device" name="remember-device" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={rememberDevice} onChange={e => setRememberDevice(e.target.checked)} disabled={isLocked} />
                    <label htmlFor="remember-device" className="ml-2 block text-sm text-gray-700">
                      Remember this device
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting || isLocked} className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isLocked ? 'bg-gray-400 cursor-not-allowed' : isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}>
                    {isSubmitting ? <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div> : isLocked ? 'Account Locked' : 'Sign in'}
                  </button>
                </div>
              </form>
              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Register now
                </a>
              </div>
              <div className="mt-6 pt-5 border-t border-gray-200">
                <p className="text-xs text-center text-gray-500">
                  Protected by advanced security
                </p>
                <div className="flex justify-center mt-2 space-x-2">
                  <ShieldIcon className="h-4 w-4 text-gray-400" />
                  <LockIcon className="h-4 w-4 text-gray-400" />
                  <KeyIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default LoginPage;