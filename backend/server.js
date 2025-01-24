// Import required dependencies
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Sequelize session store
const bodyParser = require("body-parser"); // Import body-parser

// Import route handlers
const patientRoutes = require("../backend/routes/patientRoutes");
const doctorRoutes = require("../backend/routes/doctorRoutes");
const adminRoutes = require("../backend/routes/adminRoutes");
const appointmentRoutes = require("../backend/routes/appointmentRoutes");
const searchRoutes = require("../backend/routes/searchRoutes");

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Set up database connection using Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Set up session store with Sequelize
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser to parse URL-encoded bodies
app.set("view engine", "ejs"); // Set EJS as view engine
app.set("views", path.join(__dirname, "../frontend", "views")); // Set the path for views

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "frontend", "public")));

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret", // Session secret for signing the session ID
    store: sessionStore, // Store session in the database
    resave: false, // Do not resave session if not modified
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiration (1 day)
    },
  })
);

// Sync session store with the database
sessionStore.sync();

// Authentication middleware to check if user is logged in
function checkAuthentication(req, res, next) {
  if (req.session.user) {
    return next(); // User is authenticated, proceed to next middleware/route
  } else {
    return res.status(401).json({ message: "Unauthorized: Please log in" }); // Unauthorized access
  }
}

// Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname, "home.ejs"); // Render the "home" view
});

// Use imported routes for patient, doctor, admin, appointment, and search
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/admins", adminRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/search", searchRoutes);

// Handle 404 errors for invalid routes
app.use("/error", (req, res) => {
  res.status(404).render("404"); // Render a 404 error page
});

// Global error handler for other errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).send("Something went wrong!"); // Send a generic error message
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
