require("dotenv").config(); // Load environment variables
const { Sequelize } = require("sequelize"); // Import Sequelize for ORM

// Load database credentials from environment variables
const DB_USER = process.env.DB_USER; // Database username
const DB_PASSWORD = process.env.DB_PASSWORD; // Database password
const DB_HOST = process.env.DB_HOST; // Database host (e.g., localhost)
const DB_NAME = process.env.DB_NAME; // Name of the database

// Create a Sequelize instance to connect to the MySQL database
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST, // Host where the database is located
  dialect: "mysql", // Type of database (MySQL)
  logging: false, // Disable logging of SQL queries in the console
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate(); // Check if the database connection works
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error); // Log error if connection fails
  }
}

testConnection(); // Run the test connection function

module.exports = sequelize; // Export the Sequelize instance for use in other parts of the app
