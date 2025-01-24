const db = require("../config/db"); // Import the database connection
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// Define the patient object to hold methods for handling patient data
const patient = {
  // 1. Create a new patient record in the database
  create: async (patientData) => {
    // Destructure the patientData object to extract the required fields
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    } = patientData;

    // Set the number of rounds for bcrypt hashing (higher means more secure)
    const saltRounds = 10;

    // Hash the password before storing it in the database
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // SQL query to insert the new patient's details (including the hashed password)
    const sql = `INSERT INTO Patients(first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) 
                 VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the SQL query, passing the patient's data as parameters
    const [result] = await db.execute(sql, [
      firstName,
      lastName,
      email,
      passwordHash, // Store the hashed password, not the plain one
      phone,
      dob,
      gender,
      address,
    ]);

    // Return the ID of the newly created patient record
    return result.insertId;
  },

  // 2. Retrieve a patient record from the database by patient ID
  findById: async (id) => {
    // SQL query to select a patient record by its ID
    const sql = `SELECT * FROM Patients WHERE id = ?`;

    // Execute the SQL query with the provided patient ID
    const [rows] = await db.execute(sql, [id]);

    // Return the first row (patient record) from the result, or undefined if no record is found
    return rows[0];
  },

  // 3. Find a patient by their email (useful for login)
  findByEmail: async (email) => {
    // SQL query to search for a patient by their email address
    const sql = `SELECT * FROM Patients WHERE email = ?`;

    // Execute the SQL query with the provided email
    const [rows] = await db.execute(sql, [email]);

    // Return the first matching patient record, or undefined if no match is found
    return rows[0];
  },

  // 4. Update a patient's details
  update: async (id, updateData) => {
    // Extract the fields to be updated from the updateData object
    const { firstName, lastName, phone, dob, gender, address } = updateData;

    // SQL query to update specific fields of a patient's record based on the ID
    const sql = `UPDATE Patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? 
                 WHERE id = ?`;

    // Execute the SQL query with the updated values and the patient ID
    const [result] = await db.execute(sql, [
      firstName,
      lastName,
      phone,
      dob,
      gender,
      address,
      id, // Specify the patient ID to update
    ]);

    // Return the number of affected rows (1 if the update was successful, 0 if not)
    return result.affectedRows;
  },

  // 5. Delete a patient record from the database by patient ID
  delete: async (id) => {
    // SQL query to delete a patient record by its ID
    const sql = `DELETE FROM Patients WHERE id = ?`;

    // Execute the SQL query with the provided patient ID
    const [result] = await db.execute(sql, [id]);

    // Return the number of affected rows (1 if the deletion was successful, 0 if not)
    return result.affectedRows;
  },
};

// Export the patient object so it can be used in other files (e.g., controller or routes)
module.exports = patient;
