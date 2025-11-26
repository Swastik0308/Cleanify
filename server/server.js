import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import wasteRequestRoutes from "./routes/wasteRequestRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/waste/requests", wasteRequestRoutes);
app.use("/api/notifications", notificationsRoutes);

// Default route
app.get("/", (req, res) => res.send("Cleanify API is running..."));

// Server listen
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);

// Initialize Socket.io
const io = new Server(server, {
  cors: { origin: "*" }, // adjust origin in production
});

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

// Export io for use in routes
export { io };
