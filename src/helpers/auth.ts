export function getCookie(key: string): string {
    const b: RegExpMatchArray | null = document.cookie.match(
        "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
    )
    return b ? (b.pop() as string) : ""
}

export async function checkAuth() {
    try {
        const isAuthenticated = getCookie("is_authenticated")
        if (isAuthenticated === "1") {
            return true
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // const response = await fetch("/api/auth/check", {
        //     method: "POST",
        //     headers: new Headers()
        // })
        // if (response.ok) {
        //     return true
        // }
        console.error("User is not authenticated")
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}
