const db = require("../config/db");

// Function to find a doctor by email
const findByEmail = async (email) => {
  const [results] = await db.execute("SELECT * FROM doctors WHERE email = ?", [
    email,
  ]);
  return results[0];
};

// Function to create a new doctor
const create = async (doctor) => {
  const [result] = await db.execute(
    "INSERT INTO doctors (firstName, lastName, email, password, specialty, phone, experience) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      doctor.firstName,
      doctor.lastName,
      doctor.email,
      doctor.password,
      doctor.specialty,
      doctor.phone,
      doctor.experience,
    ]
  );
  return result.insertId;
};

// Function to update an existing doctor's information
const update = async (id, updatedDoctor) => {
  const [result] = await db.execute(
    "UPDATE doctors SET firstName = ?, lastName = ?, specialty = ?, phone = ?, experience = ? WHERE id = ?",
    [
      updatedDoctor.firstName,
      updatedDoctor.lastName,
      updatedDoctor.specialty,
      updatedDoctor.phone,
      updatedDoctor.experience,
      id,
    ]
  );
  return result.affectedRows;
};

// Function to delete a doctor by ID
const deleteDoctor = async (id) => {
  const [result] = await db.execute("DELETE FROM doctors WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  findByEmail,
  create,
  update,
  delete: deleteDoctor,
};
