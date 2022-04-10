import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import UserType from '@/interface/user';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as UserType,
  },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserType }>) => produce(
      state,
      (draftState) => ({ ...draftState, user: action.payload.user }),
    ),
    userLogout: (state) => produce(
      state,
      (draftState) => ({ ...draftState, user: {} as UserType }),
    ),
  },
});

export const { setUser, userLogout } = authSlice.actions;
export type AuthSliceType = typeof authSlice;
export default authSlice.reducer;
