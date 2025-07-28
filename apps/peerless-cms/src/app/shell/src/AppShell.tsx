import { PeerlessCMSBaseLayout } from '@peerless-cms/layout';
import { AppStateProvider, AuthProvider, ReactQueryProvider } from '@peerless/providers';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@peerless-cms/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { AxiosProvider } from '@peerless/services';
import { Toaster } from 'sonner'

export const AppShell: FC = () => {
  const persistor = persistStore(store);
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppStateProvider>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <AxiosProvider />
                <PeerlessCMSBaseLayout />
                <Toaster richColors closeButton position="bottom-center" />
              </PersistGate>
            </Provider>
          </AppStateProvider>
        </AuthProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
};
