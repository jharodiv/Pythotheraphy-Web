import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@pages/auth/login";

export default function AppRouter() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />
        </Routes>
    );
}