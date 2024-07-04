import { Navigate, Outlet } from 'react-router-dom';
import { useStoreAutheticated } from '../../stores/authentication';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useStoreAutheticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/user-signin" />;
};
