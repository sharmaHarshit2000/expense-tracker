import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpenseForm from "./pages/ExpenseForm";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
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
        </Routes>

    )

}

export default App;