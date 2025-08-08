import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import EquipmentForm from "./components/EquipmentForm/EquipmentForm";
import EquipmentDetails from "./pages/EquipmentDetails/EquipmentDetails";
import EquipmentActivity from "./pages/EquipmentActivity/EquipmentActivity";
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/equipment/new" element={<PrivateRoute><EquipmentForm /></PrivateRoute>} />
                <Route path="/equipment/edit/:id" element={<PrivateRoute><EquipmentForm /></PrivateRoute>} />
                <Route path="/equipment/:id" element={<PrivateRoute><EquipmentDetails /></PrivateRoute>} />
                <Route path="/equipment/:id/log-activity" element={<PrivateRoute><EquipmentActivity /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
