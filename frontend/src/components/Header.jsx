import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                >
                    TeamExpenseTracker
                </Typography>

                {token && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button component={RouterLink} to="/dashboard" color="inherit">Dashboard</Button>
                        <Button component={RouterLink} to="/add-expense" color="inherit">Add Expense</Button>
                        {user?.role === "admin" && (
                            <>
                                <Button component={RouterLink} to="/admin" color="inherit">Admin Panel</Button>
                                <Button component={RouterLink} to="/audit-logs" color="inherit">Audit Logs</Button>
                            </>
                        )}
                        <PersonIcon />
                        <Typography>{user?.name}</Typography>
                        <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
                    </Box>
                )}

                {!token && (
                    <Box>
                        <Button component={RouterLink} to="/" color="inherit" startIcon={<LoginIcon />}>
                            Login
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
