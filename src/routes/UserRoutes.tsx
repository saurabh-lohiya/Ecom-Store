
import { Routes, Route } from "react-router-dom";
import Orders from "../pages/admin/Orders";
import UserProtected from "../protected/UserProtected";

const UserRoutes = () => {
    return (
        <Routes>
            <Route
                path="/orders"
                element={
                    <UserProtected>
                        <Orders />
                    </UserProtected>
                }
            />
        </Routes>
    );
}

export default UserRoutes;