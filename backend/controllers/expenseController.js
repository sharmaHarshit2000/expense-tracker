import Expense from "../models/Expense.js";

// Add an expense
export const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user._id });
    res.status(201).json(expense);
  } catch (err) {
    console.error("Add Expense Error:", err.message);
    res.status(400).json({ message: "Failed to add expense" });
  }
};

// Get all expenses for the current user (sorted by expense date descending)
export const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Get My Expenses Error:", err.message);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

// Admin: Get all expenses (sorted by expense date descending)
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("user", "name email")
      .sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Get All Expenses Error:", err.message);
    res.status(500).json({ message: "Failed to fetch all expenses" });
  }
};

// Admin: Update expense status
export const updateExpenseStatus = async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["pending", "approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.status = status;
    await expense.save();
    res.status(200).json(expense);
  } catch (err) {
    console.error("Update Status Error:", err.message);
    res.status(400).json({ message: "Failed to update status" });
  }
};
