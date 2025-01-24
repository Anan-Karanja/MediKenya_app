// Import required validation functions from express-validator
const { body, validationResult } = require("express-validator");

// Middleware to validate patient registration data
const validatePatientRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    next(); // If no errors, move to the next middleware/controller
  },
];

// Middleware to validate login data
const validatePatientLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("Password is required"),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    next(); // If no errors, move to the next middleware/controller
  },
];

// Middleware to validate doctor registration data
const validateDoctorRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("specialization").notEmpty().withMessage("Specialization is required"),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    next(); // If no errors, move to the next middleware/controller
  },
];

// Middleware to validate appointment booking data
const validateAppointmentBooking = [
  body("patientId")
    .notEmpty()
    .withMessage("Patient ID is required")
    .isInt()
    .withMessage("Patient ID must be an integer"),

  body("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isInt()
    .withMessage("Doctor ID must be an integer"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isDate()
    .withMessage("Invalid date format"),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    next(); // If no errors, move to the next middleware/controller
  },
];

module.exports = {
  validatePatientRegistration,
  validatePatientLogin,
  validateDoctorRegistration,
  validateAppointmentBooking,
};
