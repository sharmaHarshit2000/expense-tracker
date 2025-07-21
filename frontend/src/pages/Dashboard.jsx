import { useEffect, useState } from "react";
import { getMyExpenses } from "../api/expense";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Alert
} from "@mui/material";
import { toast } from "react-hot-toast";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await getMyExpenses();
                setExpenses(res.data);
            } catch (err) {
                setError("Failed to load expenses");
                toast.error("Failed to load expenses");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <Box className="p-6 bg-gray-100 min-h-screen">
            <Typography variant="h5" gutterBottom className="text-center">
                My Expenses
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : expenses.length === 0 ? (
                <Typography>No expenses found.</Typography>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {expenses.map((expense) => (
                        <Card key={expense._id}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {expense.category}
                                </Typography>
                                <Typography>Amount: ₹{expense.amount}</Typography>
                                <Typography>
                                    Date: {new Date(expense.date).toLocaleDateString()}
                                </Typography>
                                {expense.notes && (
                                    <Typography color="textSecondary">Note: {expense.notes}</Typography>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </Box>
    );
};

export default Dashboard;
