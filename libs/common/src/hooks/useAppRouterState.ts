import { useAppStateContext } from '@peerless/providers';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAppRouterState = () => {
  const { setCurrentPage } = useAppStateContext();

  const { pathname } = useLocation();

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname, setCurrentPage]);
};


//test git flow