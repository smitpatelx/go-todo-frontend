import AES from 'crypto-js/aes';
import CryptoJsEncode from 'crypto-js/enc-utf8';
import type { StoreStateType } from '../store';

const SECRET = process.env.NEXT_PUBLIC_AES_SECRET as string ?? 'secret';
/* eslint-disable */
export const loadState = (): StoreStateType => {
  try {
    if (localStorage.getItem('state') === null) {
      return {} as StoreStateType;
    }
    const serializedState = AES.decrypt(
      localStorage.getItem('state') as string,
      SECRET,
    ).toString(CryptoJsEncode);

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
    const serializedState = AES.encrypt(
      JSON.stringify(state),
      SECRET,
    );
    localStorage.setItem('state', String(serializedState));
  } catch { }
};
