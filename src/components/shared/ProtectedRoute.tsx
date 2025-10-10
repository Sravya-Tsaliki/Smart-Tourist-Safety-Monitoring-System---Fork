import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'tourist' | 'admin' | 'check-in' | 'district' | 'emergency' | 'family';
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  userType
}) => {
  const {
    isLoggedIn,
    userType: currentUserType,
    twoFactorVerified,
    checkSession
  } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // Check if session is valid
    const sessionValid = checkSession();
    // Check authentication and authorization
    if (!sessionValid || !isLoggedIn || currentUserType !== userType) {
      navigate('/login', {
        replace: true
      });
    }
    // Check two-factor authentication for roles that require it
    if ((currentUserType === 'admin' || currentUserType === 'district') && !twoFactorVerified) {
      navigate('/login', {
        replace: true
      });
    }
  }, [isLoggedIn, currentUserType, userType, navigate, twoFactorVerified, checkSession]);
  // Check if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // Check if wrong user type
  if (currentUserType !== userType) {
    return <Navigate to="/login" replace />;
  }
  // Check if two-factor authentication is required but not completed
  if ((userType === 'admin' || userType === 'district') && !twoFactorVerified) {
    return <Navigate to="/login" replace />;
  }
  // Check if session is valid
  if (!checkSession()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;