import { PeerlessCMSFeaturesProps } from '@peerless/models';
import { FC, createContext, useContext, useMemo } from 'react';

interface PeerlessCMSFeaturesContextType {
  readOnly: boolean;
  setPeerlessCMSFeatures?: (readOnly: boolean) => void;
  section?: string;
}

export const PeerlessCMSFeaturesContext = createContext({} as PeerlessCMSFeaturesContextType);
export const usePeerlessCMSFeaturesContext = () => useContext(PeerlessCMSFeaturesContext);

export const PeerlessCMSFeaturesProvider: FC<PeerlessCMSFeaturesProps> = ({ readOnly, children }) => {
  const contextValue = useMemo(() => ({ readOnly }), [readOnly]);

  return <PeerlessCMSFeaturesContext.Provider value={contextValue}>{children}</PeerlessCMSFeaturesContext.Provider>;
};
