import { persistor } from '@zenra/store';

export const reset_redux = () => {
    persistor.purge();
};
