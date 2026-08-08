import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "@pages/auth/login";
import DashboardLayout from "@components/dashboard/dashboardLayout";

export default function AppRouter() {
    return (
        <Routes>
            {/* Default route */}
            <Route
                path="/"
                element={
                    <Navigate
                        to="/admin-login"
                        replace
                    />
                }
            />

            {/* Authentication */}
            <Route
                path="/admin-login"
                element={<Login />}
            />

            {/* Admin Dashboard */}
            <Route
                path="/dashboard"
                element={<DashboardLayout />}
            />

            {/* Unknown route */}
            <Route
                path="*"
                element={
                    <Navigate
                        to="/admin-login"
                        replace
                    />
                }
            />
        </Routes>
    );
}