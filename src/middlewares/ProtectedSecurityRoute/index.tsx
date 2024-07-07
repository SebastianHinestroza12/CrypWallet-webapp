import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSecurityStore } from '../../stores/security';
import { PassCode } from '../../pages/Security/PassCode';

export const ProtectedSecurityRoute = () => {
  const { isPassCodeEnabled } = useSecurityStore();
  const [isAuthenticated, setIsAuthenticated] = useState(!isPassCodeEnabled);

  const handleSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated && isPassCodeEnabled) {
    return <PassCode onSuccess={handleSuccess} />;
  }

  return <Outlet />;
};
