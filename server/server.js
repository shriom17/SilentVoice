import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./src/config/db.js";
import { startCleanupScheduler } from "./src/services/cleanupService.js";

const PORT = process.env.PORT || 5000;

connectDB();

// Start the cleanup scheduler for inactive feedback
startCleanupScheduler();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;