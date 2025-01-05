import { IUser } from "../interface"
import { getCookie, setCookie } from "./cookies"

export async function checkAuth(): Promise<Omit<IUser, "cart">> {
    try {
        const isAuthenticated = getCookie("is_authenticated") === "1"
        const isAdmin = getCookie("is_admin") === "1"
        const id = parseInt(getCookie("user_id"))
        if (isAuthenticated) {
            return {
                id,
                isAuthenticated,
                name: getCookie("name"),
                email: getCookie("email"),
                isAdmin
            }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // const response = await fetch("/api/auth/check", {
        //     method: "POST",
        //     headers: new Headers()
        // })
        // if (response.ok) {
        //     return true
        // }
        
        // set Cookies

        setCookie("is_authenticated", "1", 1)
        setCookie("is_admin", "1", 1)


        return {
            id: 1,
            isAuthenticated: false,
            name: "",
            email: "",
            isAdmin: true
        }
    } catch (error) {
        console.error(error)
        return {
            id: 1,
            isAuthenticated: false,
            name: "",
            email: "",
            isAdmin: false
        }
    }
}
