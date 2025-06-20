import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import authReducer from './slices/auth-slice';
import storage from 'redux-persist/lib/storage';
import themeReducer from './slices/theme-slice';
import userReducer from './slices/user-slice';
import commonReducer from './slices/common-slice';
import dashboardReducer from './slices/dashboard-slice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCommonReducer = persistReducer(persistConfig, commonReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedDashboardReducer = persistReducer(persistConfig, dashboardReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        common: persistedCommonReducer,
        theme: persistedThemeReducer,
        user: persistedUserReducer,
        dashboard: persistedDashboardReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
