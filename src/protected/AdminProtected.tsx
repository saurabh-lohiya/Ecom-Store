import { FC, ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks"

interface AdminProtectedProps {
    children: ReactNode
}

const UserProtected: FC<AdminProtectedProps> = ({ children }) => {
    const {isUserLoggedIn} = useAuth()
    const { isAuthenticated, isAdmin } = isUserLoggedIn()

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default UserProtected
