import { Routes, Route } from "react-router-dom";
import Orders from "../pages/admin/Orders";
import CreateProduct from "../pages/admin/CreateProduct";
import DiscountCodes from "../pages/admin/DiscountCodes";
import AdminProtected from "../protected/AdminProtected";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route
                path="/admin/orders"
                element={
                    <AdminProtected>
                        <Orders />
                    </AdminProtected>
                }
            />
            <Route
                path="/admin/create-product"
                element={
                    <AdminProtected>
                        <CreateProduct />
                    </AdminProtected>
                }
            />
            <Route
                path="/admin/discount-codes"
                element={
                    <AdminProtected>
                        <DiscountCodes />
                    </AdminProtected>
                }
            />
        </Routes>
    );
}

export default AdminRoutes;