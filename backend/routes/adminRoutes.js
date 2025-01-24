const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  registerAdmin, // Now matches the controller function name
  loginAdmin, // Ensure you have this function implemented if it's needed
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

// Route for admin registration
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  registerAdmin
);

// Route for admin login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginAdmin // Ensure this is defined in the controller if you need it
);

// Route to view an admin's profile
router.get(
  "/:id",
  [param("id").isInt().withMessage("Admin ID must be a valid integer")],
  getAdminById
);

// Route to update an admin's profile
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("Admin ID must be a valid integer"),
    body("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName").optional().notEmpty().withMessage("Last name is required"),
    body("role").optional().notEmpty().withMessage("Role is required"),
  ],
  updateAdmin
);

// Route to delete an admin account
router.delete(
  "/:id",
  [param("id").isInt().withMessage("Admin ID must be a valid integer")],
  deleteAdmin
);

module.exports = router;
