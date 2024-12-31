import { atom } from 'jotai';
import { IUser } from '../interface';
import { initialCartState } from './cart';

export const initialState = {
    isAuthenticated: false,
    name: '',
    email: '',
    cart: initialCartState,
};

export const userAtom = atom<IUser>(initialState);