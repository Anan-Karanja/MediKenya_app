// Import the database connection and bcrypt for password hashing
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Define the Admin model with methods for admin-related actions
const admin = {
  // 1. Create a new admin record in the database
  create: async (adminData) => {
    const { firstName, lastName, email, password, role } = adminData;

    // Hash the password before storing it
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert the admin's details into the database
    const sql = `INSERT INTO Admins (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      firstName,
      lastName,
      email,
      passwordHash,
      role || "admin", // Default role as 'admin'
    ]);

    // Return the new admin's ID
    return result.insertId;
  },

  // 2. Retrieve an admin by ID
  findById: async (id) => {
    const sql = `SELECT * FROM Admins WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  // 3. Retrieve an admin by email (for login)
  findByEmail: async (email) => {
    const sql = `SELECT * FROM Admins WHERE email = ?`;
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  },

  // 4. Update an admin's details
  update: async (id, updateData) => {
    const { firstName, lastName, role } = updateData;
    const sql = `UPDATE Admins SET first_name = ?, last_name = ?, role = ? WHERE id = ?`;
    const [result] = await db.execute(sql, [firstName, lastName, role, id]);
    return result.affectedRows;
  },

  // 5. Delete an admin record by ID
  delete: async (id) => {
    const sql = `DELETE FROM Admins WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
  },
};

// Export the admin model so it can be used in other parts of the app
module.exports = admin;
