import { atom } from 'jotai';
import { IUser } from '../interface';
import { initialCartState } from './cart';

export const initialState: IUser = {
    isAuthenticated: false,
    isAdmin: false,
    id: undefined,
    name: '',
    email: '',
    cart: initialCartState,
};

export const userAtom = atom<IUser>(initialState);