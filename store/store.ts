import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import type { StateFromReducersMapObject } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { loadState, saveState } from './modules/localstorage';

const reducer = {
  auth: authSlice,
};

const preloadedState: PreloadedState<StateFromReducersMapObject<typeof reducer>> = loadState();

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
  // preloadedState,
});

// store.subscribe(() => {
//   saveState({
//     auth: store.getState().auth,
//   });
// });

export type StoreStateType = StateFromReducersMapObject<typeof reducer>;
export default store;
