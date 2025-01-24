const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  registerDoctor,
  loginDoctor,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments, // Added the getDoctorAppointments import
} = require("../controllers/doctorController");

// Route to register a new doctor with input validation
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
    body("phoneNumber")
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits"),
  ],
  registerDoctor
);

// Route to log in an existing doctor with email and password validation
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginDoctor
);

// Route to fetch a doctor's details by their unique ID
router.get(
  "/:id",
  [param("id").isInt().withMessage("Doctor ID must be a valid integer")],
  getDoctorById
);

// Route to fetch all appointments for a doctor by their unique ID
router.get(
  "/:id/appointments", // Added this route for fetching appointments
  [param("id").isInt().withMessage("Doctor ID must be a valid integer")],
  getDoctorAppointments // Linking the function
);

// Route to update an existing doctor's profile by their unique ID
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("Doctor ID must be a valid integer"),
    body("firstName").optional().notEmpty().withMessage("First name cannot be empty"),
    body("lastName").optional().notEmpty().withMessage("Last name cannot be empty"),
    body("specialization").optional().notEmpty().withMessage("Specialization cannot be empty"),
    body("phoneNumber")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits"),
  ],
  updateDoctor
);

// Route to delete a doctor's account by their unique ID
router.delete(
  "/:id",
  [param("id").isInt().withMessage("Doctor ID must be a valid integer")],
  deleteDoctor
);

module.exports = router;
