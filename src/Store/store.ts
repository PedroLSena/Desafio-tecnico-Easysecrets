import { configureStore, combineReducers } from '@reduxjs/toolkit';
import salesReducer from './slices/salesSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

const rootReducer = combineReducers({
  sales: salesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;