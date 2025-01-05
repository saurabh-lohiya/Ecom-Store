
import { useEffect } from "react";
import { checkAuth } from "../helpers/auth"
import { deleteCookie, getCookie, setCookie } from "../helpers/cookies";
import useAuthReducer from "../jotai/AuthReducer";
import { IAuthenticatedUser } from "../interface";

export function useAuth() {
    const [userState, dispatch] = useAuthReducer()

    const isUserLoggedIn = (): {
        isAuthenticated: boolean
        isAdmin: boolean
    } => {
        const isAuthenticated = getCookie("is_authenticated") === "1"
        const isAdmin = getCookie("is_admin") === "1"
        return { isAuthenticated, isAdmin }
    }

    const setCookiesOnLogout = () => {
        const cookiesToDelete = [
            "is_authenticated",
            "is_admin",
            "user_id",
            "name",
            "email",
        ]
        cookiesToDelete.forEach((cookie) => {
            deleteCookie(cookie)
        })
    }

    const setCookiesOnLogin = (data: Omit<IAuthenticatedUser, 'cart'>) => {
        const { id, name, email, isAdmin } = data
        const cookies = [
            { key: "is_authenticated", value: "1" },
            { key: "is_admin", value: isAdmin ? "1" : "0" },
            { key: "user_id", value: id.toString() },
            { key: "name", value: name },
            { key: "email", value: email },
        ]
        cookies.forEach((cookie) => {
            setCookie(cookie.key, cookie.value, 1)
        })
    }

    const login = async (email: string, password: string) => {
        try {
            // const response = await fetch("/api/auth/login", {
            //     method: "POST",
            //     headers: new Headers({
            //         "Content-Type": "application/json",
            //     }),
            //     body: JSON.stringify({ email, password }),
            // })
            await new Promise((resolve) =>
                setTimeout(() => resolve({ ok: true }), 1000)
            )
            // Fetch User Data
            setCookiesOnLogin({
                isAuthenticated: true,
                id: 1,
                name: "John Doe",
                email,
                isAdmin: false,
            })
            dispatch({
                type: "LOGIN",
                payload: {
                    id: 1,
                    name: "John Doe",
                    email,
                    isAdmin: false,
                },
            })
            // Fetch User Data and dispatch to reducer
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
            if (!response.ok) {
                throw new Error("Error logging out")
            }
            setCookiesOnLogout()
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
        checkAuth().then((d) => {
            if (!d.isAuthenticated) {
                dispatch({
                    type: "LOGOUT",
                })
                return
            } else {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        ...d as IAuthenticatedUser
                    },
                })
            }
        }).catch((error) => {
            console.error(error)
        })
    }, [dispatch])
    
    return {
        userState,
        isUserLoggedIn,
        redirectIfUserIsNotAuthenticated,
        login,
        logout,
        signup,
        dispatch
    }
}