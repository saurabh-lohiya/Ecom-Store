
import { useEffect } from "react";
import { checkAuth } from "../helpers/auth";
import useAuthReducer from "../jotai/AuthReducer";

export function useAuth() {
    const [, dispatch] = useAuthReducer()
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
}