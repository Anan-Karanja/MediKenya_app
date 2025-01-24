const doctorModel = require("../models/Doctor");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Handle doctor registration
const registerDoctor = async (req, res) => {
  try {
    // Validate request inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, specialization, phoneNumber } = req.body;

    // Hash the password for security
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Prepare the doctor data
    const doctorData = {
      firstName,
      lastName,
      email,
      passwordHash,
      specialization,
      phoneNumber,
    };

    // Save the doctor in the database
    const doctorId = await doctorModel.create(doctorData);

    res.status(201).json({
      message: "Doctor registered successfully",
      doctorId,
    });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Failed to register doctor. Please try again later." });
  }
};

// Handle doctor login
const loginDoctor = async (req, res) => {
  try {
    // Validate request inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find the doctor by email
    const doctor = await doctorModel.findByEmail(email);
    if (!doctor) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, doctor.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", doctorId: doctor.id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to log in. Please try again later." });
  }
};

// Fetch doctor details by ID
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve doctor details
    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ message: "Failed to fetch doctor details. Please try again later." });
  }
};

// Update a doctor's details
const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, specialization, phoneNumber } = req.body;

  try {
    // Check if the doctor exists
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Prepare updated data
    const updatedData = {
      firstName,
      lastName,
      email,
      specialization,
      phoneNumber,
    };

    // Update the doctor in the database
    const affectedRows = await doctorModel.update(id, updatedData);

    if (affectedRows === 0) {
      return res.status(400).json({ message: "Failed to update doctor details" });
    }

    res.status(200).json({ message: "Doctor updated successfully" });
  } catch (error) {
    console.error("Error updating doctor details:", error);
    res.status(500).json({ message: "Failed to update doctor. Please try again later." });
  }
};

// Delete a doctor account
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the doctor exists
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Delete the doctor from the database
    const affectedRows = await doctorModel.delete(id);
    if (affectedRows === 0) {
      return res.status(400).json({ message: "Failed to delete doctor" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Failed to delete doctor. Please try again later." });
  }
};

// Fetch all appointments for a doctor
const getDoctorAppointments = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the doctor's appointments
    const appointments = await doctorModel.getAppointments(id);

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this doctor" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments. Please try again later." });
  }
};

// Export controller functions
module.exports = {
  registerDoctor,
  loginDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments,
};
