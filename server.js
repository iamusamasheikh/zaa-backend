const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(503).json({ message: "Database unavailable" });
  }
});
app.use("/uploads", express.static("uploads"));
app.use("/builder", express.static(path.join(__dirname, "builder")));
app.get("/builder/*", (req, res) => {
  res.sendFile(path.join(__dirname, "builder", "index.html"));
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/deploy", require("./routes/deploy"));
app.use("/api/media", require("./routes/media"));
app.use("/api", require("./routes/public"));

app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  module.exports = app;
}
