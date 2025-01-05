function getCookie(key: string): string {
    const b: RegExpMatchArray | null = document.cookie.match(
        "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"
    )
    return b ? (b.pop() as string) : ""
}

function setCookie(key: string, value: string, days: number = 1): void {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`
}

function deleteCookie(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export { getCookie, setCookie, deleteCookie }