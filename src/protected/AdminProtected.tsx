import { FC, ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import { Route } from "react-router-dom"

const AdminProtected: FC<{ children: ReactNode; rest: unknown }> = ({
    children,
    ...rest
}) => {
    const {
        userState: { isAuthenticated, isAdmin },
        redirectIfUserIsNotAuthenticated,
    } = useAuth()
    if (!isAuthenticated || !isAdmin) {
        redirectIfUserIsNotAuthenticated()
    }
    return <Route {...rest}>{children}</Route>
}

export default AdminProtected
