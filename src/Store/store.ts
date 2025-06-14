import { configureStore } from '@reduxjs/toolkit';
import salesReducer from './slices/salesSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

const rootReducer = {
  sales: salesReducer,
};

export const store:any = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;