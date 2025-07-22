import { useEffect, useState } from "react";
import { getAllExpenses, updateExpenseStatus } from "../api/expense";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Paper,
  Grid,
} from "@mui/material";
import { toast } from "react-hot-toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const AdminPanel = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await getAllExpenses();
      setExpenses(res.data);
    } catch (err) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateExpenseStatus(id, status);
      toast.success(`Marked as ${status}`);
      fetchAll();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
                        Admin Panel - All Expenses
        </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress size={50} />
        </Box>
      ) : expenses.length === 0 ? (
        <Typography>No expenses found.</Typography>
      ) : (
        <Grid container spacing={3} sx={{ flexGrow: 1 }} mt={2}>
          {expenses.map((expense) => (
            <Grid key={expense._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {expense.category}
                </Typography>
                <Typography color="text.secondary">
                  Amount: ₹{expense.amount}
                </Typography>
                <Typography color="text.secondary">
                  Status:{" "}
                  <strong
                    style={{
                      color:
                        expense.status === "approved"
                          ? "green"
                          : expense.status === "rejected"
                          ? "red"
                          : "#333",
                    }}
                  >
                    {expense.status}
                  </strong>
                </Typography>
                <Typography color="text.secondary">
                  User: {expense.user?.name}
                </Typography>
                <Typography color="text.secondary">
                  Email: {expense.user?.email}
                </Typography>
                <Typography color="text.secondary">
                  Date: {new Date(expense.date).toLocaleDateString()}
                </Typography>
                {expense.notes && (
                  <Typography color="text.secondary">
                    Note: {expense.notes}
                  </Typography>
                )}

                <Stack direction="row" spacing={2} mt={3}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleStatusChange(expense._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() => handleStatusChange(expense._id, "rejected")}
                  >
                    Reject
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdminPanel;
