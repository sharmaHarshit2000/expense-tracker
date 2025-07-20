import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//Routes
import authRoutes from "./routes/authRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js";


// Not Found and Global Error handler
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

// Config
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Testing API
app.get("/", (req, res) => {
  res.send("expense-tracker-backend API is running...");
});

// Route mounting
app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes)

//Error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
