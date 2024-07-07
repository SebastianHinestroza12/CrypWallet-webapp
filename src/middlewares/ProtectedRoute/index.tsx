import { Navigate, Outlet } from 'react-router-dom';
import { useStoreAutheticated } from '../../stores/authentication';
import { ROUTES } from '../../constants';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useStoreAutheticated();

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.USER_SIGNIN} />;
};
