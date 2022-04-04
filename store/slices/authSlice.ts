import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';

type User = {
  user_type: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  last_name: string;
};

type Session = { sessionId: string };

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as User,
    sessionId: '',
  },
  reducers: {
    userLogin: (state, action: PayloadAction<{ user: User }>) => produce(
      state,
      (draftState) => ({ ...draftState, user: action.payload.user }),
    ),
    userLogout: (state) => produce(
      state,
      (draftState) => ({ ...draftState, user: {} as User }),
    ),
    createSession: (state, action: PayloadAction<Session>) => produce(
      state,
      (draftState) => ({ ...draftState, sessionId: action.payload.sessionId }),
    ),
  },
});

export const { userLogin, userLogout, createSession } = authSlice.actions;
export type AuthSliceType = typeof authSlice;
export default authSlice.reducer;
