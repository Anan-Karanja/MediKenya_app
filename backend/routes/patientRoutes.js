const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientAppointments,
} = require("../controllers/patientController");

// Route to register a new patient with validation for required fields
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("phoneNumber")
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits long"),
  ],
  registerPatient
);

// Route to login an existing patient by verifying email and password
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginPatient
);

// Route to fetch patient details by ID
router.get(
  "/:id",
  [param("id").isInt().withMessage("Patient ID must be a valid integer")],
  getPatientById
);

// Route to update a patient's details by ID with optional fields
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("Patient ID must be a valid integer"),
    body("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName").optional().notEmpty().withMessage("Last name is required"),
    body("phoneNumber")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits long"),
  ],
  updatePatient
);

// Route to delete a patient account by ID
router.delete(
  "/:id",
  [param("id").isInt().withMessage("Patient ID must be a valid integer")],
  deletePatient
);

// Route to retrieve all appointments associated with a specific patient ID
router.get(
  "/:id/appointments",
  [param("id").isInt().withMessage("Patient ID must be a valid integer")],
  getPatientAppointments
);

module.exports = router;
