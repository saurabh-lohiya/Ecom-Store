
import { useEffect } from "react";
import { checkAuth } from "../helpers/auth";
import useAuthReducer from "../jotai/AuthReducer";

export function useAuth() {
    const [userState, dispatch] = useAuthReducer()
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({ email, password }),
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: "LOGIN",
                    payload: {
                        name: data.name,
                        email: data.email,
                    },
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })
            if (response.ok) {
                dispatch({
                    type: "LOGOUT",
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const signup = async (name: string, email: string, password: string, token?: string) => {
        try {
            const response = await fetch("/api/auth/admin/signup", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({ name, email, password, token }),
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: "SIGNUP",
                    payload: {
                        name: data.name,
                        email: data.email,
                    },
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const redirectIfUserIsNotAuthenticated = () => {
        if (!userState.isAuthenticated) {
            window.location.href = "/login"
        }
    }

    useEffect(() => {
        checkAuth().then((isAuthenticated) => {
            dispatch({
                type: isAuthenticated ? "LOGIN" : "LOGOUT",
                payload: {
                    name: "",
                    email: "",
                },
            })
        }).catch((error) => {
            console.error(error)
        })
    }, [dispatch])
    return {
        userState,
        redirectIfUserIsNotAuthenticated,
        login,
        logout,
        signup,
        dispatch
    }
}