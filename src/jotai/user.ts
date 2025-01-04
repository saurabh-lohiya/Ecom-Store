import { atom } from 'jotai';
import { IUser } from '../interface';
import { initialCartState } from './cart';

export const initialState: IUser = {
    isAuthenticated: false,
    isAdmin: true,
    id: 1,
    name: '',
    email: '',
    cart: initialCartState,
};

export const userAtom = atom<IUser>(initialState);