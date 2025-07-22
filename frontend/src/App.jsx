import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpenseForm from "./pages/ExpenseForm";
import AdminPanel from "./pages/AdminPanel";
import AuditLogs from "./pages/AuditLogs";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const App = () => {
    return (
        <Box className="flex flex-col min-h-screen">
            <Header />

            <Box component="main" className="flex-grow">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-expense"
                        element={
                            <ProtectedRoute>
                                <ExpenseForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/audit-logs"
                        element={
                            <ProtectedRoute adminOnly>
                                <AuditLogs />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>

            <Footer />
        </Box>
    );
};

export default App;
