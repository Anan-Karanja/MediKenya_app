// Import dependencies
const session = require("express-session"); // Session management middleware
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Store sessions in the database
const { sequelize } = require("./db"); // Sequelize instance for database connection
const dotenv = require("dotenv"); // Load environment variables from .env file

dotenv.config(); // Initialize dotenv to access environment variables

// Session configuration object
const sessionConfig = {
  secret: process.env.SESSION_SECRET, // Secret key for signing session cookies
  resave: false, // Avoid resaving session data if nothing has changed
  saveUninitialized: false, // Prevent uninitialized sessions from being saved
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    maxAge: 24 * 60 * 60 * 1000, // Set cookie expiry to 24 hours
  },
  store: new SequelizeStore({
    db: sequelize, // Use the Sequelize instance for database storage
    checkExpirationInterval: 15 * 60 * 1000, // Interval to clean up expired sessions (15 minutes)
    expiration: 24 * 60 * 60 * 1000, // Session expiration time (24 hours)
  }),
};

// Export the session configuration
module.exports = { sessionConfig };
