import React, { useEffect, useState, createContext, useContext } from 'react';
type UserType = 'tourist' | 'admin' | 'check-in' | 'district' | 'emergency' | 'family' | null;
interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  logout: () => void;
  remainingLoginAttempts: number;
  decrementLoginAttempts: () => void;
  resetLoginAttempts: () => void;
  isLocked: boolean;
  lockAccount: () => void;
  unlockAccount: () => void;
  lastActivity: number;
  updateLastActivity: () => void;
  sessionTimeout: number;
  setSessionTimeout: (minutes: number) => void;
  twoFactorVerified: boolean;
  setTwoFactorVerified: (status: boolean) => void;
  rememberDevice: boolean;
  setRememberDevice: (status: boolean) => void;
  trustedDevices: string[];
  addTrustedDevice: (deviceId: string) => void;
  removeTrustedDevice: (deviceId: string) => void;
  checkSession: () => boolean;
}
const UserContext = createContext<UserContextType>({
  userType: null,
  setUserType: () => {},
  userId: null,
  setUserId: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logout: () => {},
  remainingLoginAttempts: 5,
  decrementLoginAttempts: () => {},
  resetLoginAttempts: () => {},
  isLocked: false,
  lockAccount: () => {},
  unlockAccount: () => {},
  lastActivity: Date.now(),
  updateLastActivity: () => {},
  sessionTimeout: 30,
  setSessionTimeout: () => {},
  twoFactorVerified: false,
  setTwoFactorVerified: () => {},
  rememberDevice: false,
  setRememberDevice: () => {},
  trustedDevices: [],
  addTrustedDevice: () => {},
  removeTrustedDevice: () => {},
  checkSession: () => true
});
// Generate a unique device identifier
const generateDeviceId = (): string => {
  const navigatorInfo = window.navigator.userAgent + window.navigator.language + (window.screen?.width || '') + (window.screen?.height || '') + new Date().getTimezoneOffset();
  let deviceId = '';
  for (let i = 0; i < navigatorInfo.length; i++) {
    deviceId += navigatorInfo.charCodeAt(i).toString(16);
  }
  return deviceId;
};
// Current device ID
const currentDeviceId = generateDeviceId();
export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Initialize state from localStorage if available
  const [userType, setUserTypeState] = useState<UserType>(() => {
    const savedUserType = localStorage.getItem('userType') as UserType;
    return savedUserType || null;
  });
  const [userId, setUserIdState] = useState<string | null>(() => {
    return localStorage.getItem('userId') || null;
  });
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  // Security related states
  const [remainingLoginAttempts, setRemainingLoginAttempts] = useState<number>(() => {
    const saved = localStorage.getItem('remainingLoginAttempts');
    return saved ? parseInt(saved) : 5;
  });
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    const lockUntil = localStorage.getItem('accountLockedUntil');
    if (lockUntil && parseInt(lockUntil) > Date.now()) {
      return true;
    }
    return false;
  });
  const [lastActivity, setLastActivity] = useState<number>(() => {
    const saved = localStorage.getItem('lastActivity');
    return saved ? parseInt(saved) : Date.now();
  });
  const [sessionTimeout, setSessionTimeoutState] = useState<number>(() => {
    const saved = localStorage.getItem('sessionTimeout');
    return saved ? parseInt(saved) : 30; // 30 minutes default
  });
  const [twoFactorVerified, setTwoFactorVerifiedState] = useState<boolean>(() => {
    return localStorage.getItem('twoFactorVerified') === 'true';
  });
  const [rememberDevice, setRememberDeviceState] = useState<boolean>(() => {
    return localStorage.getItem('rememberDevice') === 'true';
  });
  const [trustedDevices, setTrustedDevices] = useState<string[]>(() => {
    const saved = localStorage.getItem('trustedDevices');
    return saved ? JSON.parse(saved) : [];
  });
  // Check if session is still valid
  const checkSession = (): boolean => {
    // If the session is remembered, don't check timeout
    if (rememberDevice && trustedDevices.includes(currentDeviceId)) {
      return true;
    }
    const currentTime = Date.now();
    const timeoutMilliseconds = sessionTimeout * 60 * 1000; // Convert minutes to milliseconds
    if (currentTime - lastActivity > timeoutMilliseconds) {
      // Session expired
      logout();
      return false;
    }
    return true;
  };
  // Update last activity timestamp
  const updateLastActivity = () => {
    const now = Date.now();
    setLastActivity(now);
    localStorage.setItem('lastActivity', now.toString());
  };
  // Wrapper functions to update both state and localStorage
  const setUserType = (type: UserType) => {
    setUserTypeState(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };
  const setUserId = (id: string | null) => {
    setUserIdState(id);
    if (id) {
      localStorage.setItem('userId', id);
    } else {
      localStorage.removeItem('userId');
    }
  };
  const setIsLoggedIn = (status: boolean) => {
    setIsLoggedInState(status);
    localStorage.setItem('isLoggedIn', status.toString());
    if (status) {
      updateLastActivity();
      setTwoFactorVerified(false); // Reset 2FA verification on new login
    }
  };
  const decrementLoginAttempts = () => {
    const newValue = remainingLoginAttempts - 1;
    setRemainingLoginAttempts(newValue);
    localStorage.setItem('remainingLoginAttempts', newValue.toString());
    // Lock account if no attempts remaining
    if (newValue <= 0) {
      lockAccount();
    }
  };
  const resetLoginAttempts = () => {
    setRemainingLoginAttempts(5);
    localStorage.setItem('remainingLoginAttempts', '5');
  };
  const lockAccount = () => {
    const lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
    setIsLocked(true);
    localStorage.setItem('accountLockedUntil', lockUntil.toString());
    // Automatically unlock after lock period
    setTimeout(() => {
      unlockAccount();
    }, 15 * 60 * 1000);
  };
  const unlockAccount = () => {
    setIsLocked(false);
    localStorage.removeItem('accountLockedUntil');
    resetLoginAttempts();
  };
  const setSessionTimeout = (minutes: number) => {
    setSessionTimeoutState(minutes);
    localStorage.setItem('sessionTimeout', minutes.toString());
  };
  const setTwoFactorVerified = (status: boolean) => {
    setTwoFactorVerifiedState(status);
    localStorage.setItem('twoFactorVerified', status.toString());
  };
  const setRememberDevice = (status: boolean) => {
    setRememberDeviceState(status);
    localStorage.setItem('rememberDevice', status.toString());
    if (status && !trustedDevices.includes(currentDeviceId)) {
      addTrustedDevice(currentDeviceId);
    }
  };
  const addTrustedDevice = (deviceId: string) => {
    const updatedDevices = [...trustedDevices, deviceId];
    setTrustedDevices(updatedDevices);
    localStorage.setItem('trustedDevices', JSON.stringify(updatedDevices));
  };
  const removeTrustedDevice = (deviceId: string) => {
    const updatedDevices = trustedDevices.filter(d => d !== deviceId);
    setTrustedDevices(updatedDevices);
    localStorage.setItem('trustedDevices', JSON.stringify(updatedDevices));
  };
  const logout = () => {
    setUserType(null);
    setUserId(null);
    setIsLoggedIn(false);
    setTwoFactorVerified(false);
    // Don't clear trusted devices or remember device setting on logout
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('twoFactorVerified');
    localStorage.removeItem('lastActivity');
  };
  // Check session validity periodically (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        checkSession();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [isLoggedIn, lastActivity, sessionTimeout]);
  // Update activity on user interaction
  useEffect(() => {
    const handleActivity = () => {
      if (isLoggedIn) {
        updateLastActivity();
      }
    };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isLoggedIn]);
  return <UserContext.Provider value={{
    userType,
    setUserType,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    logout,
    remainingLoginAttempts,
    decrementLoginAttempts,
    resetLoginAttempts,
    isLocked,
    lockAccount,
    unlockAccount,
    lastActivity,
    updateLastActivity,
    sessionTimeout,
    setSessionTimeout,
    twoFactorVerified,
    setTwoFactorVerified,
    rememberDevice,
    setRememberDevice,
    trustedDevices,
    addTrustedDevice,
    removeTrustedDevice,
    checkSession
  }}>
      {children}
    </UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);