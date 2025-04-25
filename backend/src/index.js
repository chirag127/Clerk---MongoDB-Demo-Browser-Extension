/**
 * Main server file for the Clerk & MongoDB Demo Browser Extension backend API
 * This file sets up the Express server, connects to MongoDB, and configures middleware
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

// Import routes
const notesRoutes = require("./routes/notes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

// Test route (no authentication required)
app.get("/api/test", (req, res) => {
    res.status(200).json({
        message: "Test endpoint working",
        timestamp: new Date().toISOString(),
        environment: {
            nodeEnv: process.env.NODE_ENV || "development",
            corsOrigin: process.env.CORS_ORIGIN || "*",
        },
    });
});

// Protected routes
app.use("/api/notes", ClerkExpressRequireAuth(), notesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: true,
        message: err.message || "An unexpected error occurred",
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
