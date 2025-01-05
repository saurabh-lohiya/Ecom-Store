import { FC, ReactNode } from "react"
import { useAuth } from "../hooks"
import { Navigate } from "react-router-dom"

interface UserProtectedProps {
    children: ReactNode
}

const UserProtected: FC<UserProtectedProps> = ({ children }) => {
    const { userState } = useAuth()

    if (!userState.isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

export default UserProtected
