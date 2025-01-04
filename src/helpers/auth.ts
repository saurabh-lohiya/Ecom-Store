import { IUser } from "../interface"

export function getCookie(key: string): string {
    const b: RegExpMatchArray | null = document.cookie.match(
        "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
    )
    return b ? (b.pop() as string) : ""
}

export function setCookie(key: string, value: string, days: number = 1): void {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`
}

export async function checkAuth(): Promise<Omit<IUser, "cart">> {
    try {
        const isAuthenticated = getCookie("is_authenticated") === "1"
        const isAdmin = getCookie("is_admin") === "1"
        if (isAuthenticated) {
            return {
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
            isAuthenticated: true,
            name: "",
            email: "",
            isAdmin: true
        }
    } catch (error) {
        console.error(error)
        return {
            isAuthenticated: false,
            name: "",
            email: "",
            isAdmin: false
        }
    }
}
