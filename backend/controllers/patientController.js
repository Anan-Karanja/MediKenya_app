const patientModel = require("../models/patient");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Registers a new patient by validating input, hashing password, and saving to the database
const registerPatient = async (req, res) => {
  try {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Hash the password for security
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Prepare patient data for the database
    const patientData = {
      firstName,
      lastName,
      email,
      passwordHash,
      phoneNumber,
    };

    // Save patient data to the database
    const patientId = await patientModel.create(patientData);

    res.status(201).json({
      message: "Patient registered successfully",
      patientId,
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({ message: "Failed to register patient" });
  }
};

// Logs in a patient by checking email and password match
const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the patient by email
    const patient = await patientModel.findByEmail(email);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Compare input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, patient.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res
      .status(200)
      .json({ message: "Login successful", patientId: patient.id });
  } catch (error) {
    console.error("Error logging in patient:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

// Fetches a specific patient's details using their ID
const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find patient by ID
    const patient = await patientModel.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Failed to fetch patient" });
  }
};

// Updates an existing patient's details using their ID
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    // Check if patient exists
    const patient = await patientModel.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Prepare data for update
    const updateData = { firstName, lastName, email, phoneNumber };
    const affectedRows = await patientModel.update(id, updateData);

    if (affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "Failed to update patient details" });
    }

    res.status(200).json({ message: "Patient updated successfully" });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Failed to update patient" });
  }
};

// Deletes a patient account using their ID
const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if patient exists
    const patient = await patientModel.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Delete patient from database
    const affectedRows = await patientModel.delete(id);
    if (affectedRows === 0) {
      return res.status(400).json({ message: "Failed to delete patient" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Failed to delete patient" });
  }
};

// Retrieves all appointments associated with a specific patient ID
const getPatientAppointments = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch all appointments for the patient
    const appointments = await patientModel.getAppointments(id);
    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Export controller functions
module.exports = {
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientAppointments,
};
