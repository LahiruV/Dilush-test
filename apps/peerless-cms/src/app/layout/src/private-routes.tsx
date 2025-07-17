import { useAuthContext } from '@peerless/providers';
import { Navigate, Outlet } from 'react-router-dom';
import PeerlessCMSLayout from './peerless-cms-layout';

const PrivateRouteValidator = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <PeerlessCMSLayout>
      <Outlet />
    </PeerlessCMSLayout>
  ) : (
    <Navigate to='/login' replace={true} />
  );
};

export default PrivateRouteValidator;
