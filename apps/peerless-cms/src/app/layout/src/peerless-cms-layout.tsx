import { ChildrenProp } from '@peerless/models';
import React, { FC, useReducer, useMemo } from 'react';

import { Header, MainNavigation } from '@peerless-cms/components';
import './peerless-cms-layout.css';

export const FeatureContext = React.createContext({});

const initialState = { count: 0 };
const reducer = (state: { count: number }, action: { type: string }) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
    //throw new Error();
  }
};

const PeerlessCMSLayout: FC<ChildrenProp> = ({ children }) => {
  const [count, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ countState: count, countDispatch: dispatch }), [count, dispatch]);

  return (
    <div className='peerless-cms-layout'>
      <MainNavigation />
      <Header />
      <div className='content-block'>
        <FeatureContext.Provider value={contextValue}>{children}</FeatureContext.Provider>
      </div>
    </div>
  );
};

export default PeerlessCMSLayout;
