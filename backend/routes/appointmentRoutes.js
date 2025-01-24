const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator"); // Import express-validator methods
const {
  createAppointment,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

// Route for creating a new appointment
router.post(
  "/create",
  [
    // Validate patientId to ensure it's a valid integer (patient ID)
    body("patientId").isInt().withMessage("Patient ID must be a valid integer"),

    // Validate doctorId to ensure it's a valid integer (doctor ID)
    body("doctorId").isInt().withMessage("Doctor ID must be a valid integer"),

    // Validate date to ensure it's in a valid date format (YYYY-MM-DD)
    body("date")
      .isDate()
      .withMessage("Please provide a valid appointment date"),

    // Validate time to ensure it's in a valid time format (HH:MM)
    body("time").isString().withMessage("Please provide a valid time"),

    // Validate reason to ensure it's not empty
    body("reason").notEmpty().withMessage("Reason for appointment is required"),
  ],
  createAppointment // Call the controller function to handle appointment creation
);

// Route to get an appointment by ID
router.get(
  "/:id",
  [
    // Validate the ID parameter to ensure it's an integer (appointment ID)
    param("id").isInt().withMessage("Appointment ID must be a valid integer"),
  ],
  getAppointmentById // Call the controller function to retrieve appointment by ID
);

// Route to get all appointments for a specific patient
router.get(
  "/patient/:patientId",
  [
    // Validate the patientId parameter to ensure it's an integer (patient ID)
    param("patientId")
      .isInt()
      .withMessage("Patient ID must be a valid integer"),
  ],
  getAppointmentsByPatientId // Call the controller function to retrieve appointments by patient ID
);

// Route to get all appointments for a specific doctor
router.get(
  "/doctor/:doctorId",
  [
    // Validate the doctorId parameter to ensure it's an integer (doctor ID)
    param("doctorId").isInt().withMessage("Doctor ID must be a valid integer"),
  ],
  getAppointmentsByDoctorId // Call the controller function to retrieve appointments by doctor ID
);

// Route to update an existing appointment
router.put(
  "/:id",
  [
    // Validate the ID parameter to ensure it's an integer (appointment ID)
    param("id").isInt().withMessage("Appointment ID must be a valid integer"),

    // Validate date to ensure it's in a valid date format (YYYY-MM-DD)
    body("date")
      .optional()
      .isDate()
      .withMessage("Please provide a valid appointment date"),

    // Validate time to ensure it's in a valid time format (HH:MM)
    body("time")
      .optional()
      .isString()
      .withMessage("Please provide a valid time"),

    // Validate reason to ensure it's not empty (optional for update)
    body("reason")
      .optional()
      .notEmpty()
      .withMessage("Reason for appointment is required"),
  ],
  updateAppointment // Call the controller function to handle appointment update
);

// Route to delete an appointment by ID
router.delete(
  "/:id",
  [
    // Validate the ID parameter to ensure it's an integer (appointment ID)
    param("id").isInt().withMessage("Appointment ID must be a valid integer"),
  ],
  deleteAppointment // Call the controller function to handle appointment deletion
);

module.exports = router; // Export the router to be used in the server
