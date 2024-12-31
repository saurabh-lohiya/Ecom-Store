import useReducerAtom from "./useReducerAtom";
import { IUser } from "../interface";
import { initialState, userAtom } from "./user";

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    MODIFY_USER = "MODIFY_USER",
}

type LoginAction = {
    type: "LOGIN",
    payload: {
        name: string;
        email: string;
    }
}

type LogoutAction = {
    type: "LOGOUT"
}

type ModifyUserAction = {
    type: "MODIFY_USER",
    payload: Pick<IUser, "name" | "email">
}

type AuthAction = LoginAction | LogoutAction | ModifyUserAction

const AuthReducer = (
    state: IUser = initialState,
    action: AuthAction
): IUser => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                name: action.payload.name,
                email: action.payload.email,
            }
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                name: "",
                email: "",
            }

        case "MODIFY_USER":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
            }

        default:
            return state
    }
}

function useAuthReducer() {
    return useReducerAtom<IUser, AuthAction>(userAtom, AuthReducer)
}
export default useAuthReducer