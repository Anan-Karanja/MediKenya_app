const express = require("express");
const router = express.Router();
const { Doctor } = require("../models/Doctor"); // Corrected import for Doctor model
const { Patient } = require("../models/patient"); // Corrected import for Patient model
const { check, validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Route for handling search requests
router.get(
  "/",
  [check("query", "Search query cannot be empty").notEmpty()],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { query, role } = req.query; // Extract the search query and user role from the request

    try {
      let searchResults = [];

      // If the user is a doctor, they can search for patients by first or last name
      if (role === "doctor") {
        searchResults = await Patient.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${query}%` } },
              { lastName: { [Op.like]: `%${query}%` } },
            ],
          },
        });
      }
      // If the user is an admin, they can search for both patients and doctors
      else if (role === "admin") {
        const patientsSearch = await Patient.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${query}%` } },
              { lastName: { [Op.like]: `%${query}%` } },
            ],
          },
        });

        const doctorsSearch = await Doctor.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${query}%` } },
              { lastName: { [Op.like]: `%${query}%` } },
            ],
          },
        });

        searchResults = {
          patients: patientsSearch,
          doctors: doctorsSearch,
        };
      }
      // If the user is a patient, they can search for doctors by name
      else if (role === "patient") {
        searchResults = await Doctor.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${query}%` } },
              { lastName: { [Op.like]: `%${query}%` } },
            ],
          },
        });
      }
      // If the role is unknown or not set
      else {
        return res.status(400).json({ message: "Invalid user role." });
      }

      // Return the search results
      res.status(200).json(searchResults);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
