import { ChildrenProp } from '@peerless/models';
import { FC, createContext, useContext, useMemo, useState } from 'react';

interface AppStateContextType {
  AppName: string;
  currentPage: string;
  setCurrentPage: (currentPage: string) => void;
}

export const AppStateContext = createContext({} as AppStateContextType);
export const useAppStateContext = () => useContext(AppStateContext);

export const AppStateProvider: FC<ChildrenProp> = ({ children }) => {
  const AppName = 'Perless App';

  const [currentPage, setCurrentPage] = useState('Home');

  const contextValue = useMemo(
    () => ({ AppName, currentPage, setCurrentPage }),
    [AppName, currentPage, setCurrentPage]
  );

  return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
};
