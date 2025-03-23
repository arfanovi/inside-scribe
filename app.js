import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subcategory.routes.js";
import connectDB from "./config/db.js";

// Connect to database
connectDB();

const app = express();

// ✅ Correct CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);

// ✅ Serve Static Files (HTML)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

export default app;
