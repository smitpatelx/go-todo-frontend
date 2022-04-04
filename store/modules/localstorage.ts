import type { StoreStateType } from '../store';

/* eslint-disable no-empty */
export const loadState = (): StoreStateType => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {} as StoreStateType;
    }
    return JSON.parse(serializedState) as StoreStateType;
  } catch (_) {
    return {} as StoreStateType;
  }
};

export const saveState = (state: unknown): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {}
};
