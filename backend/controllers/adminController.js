const adminModel = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Admin Registration
const registerAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, role } = req.body;

    // Hash the password before saving to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const adminData = { firstName, lastName, email, password: hashedPassword, role };

    // Call the model function to create the admin
    const newAdminId = await adminModel.create(adminData);

    res.status(201).json({
      message: 'Admin created successfully',
      adminId: newAdminId,
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Failed to create admin. Please try again later.' });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await adminModel.findByEmail(email);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set session or token (if using session)
    req.session.adminId = admin.id;
    req.session.role = admin.role;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
};

// Get Admin by ID
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch admin from the database by ID
    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ message: 'Failed to fetch admin. Please try again later.' });
  }
};

// Update Admin Profile
const updateAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { firstName, lastName, role, password } = req.body;

    // Hash the password if provided
    let updatedData = { firstName, lastName, role };

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedData.password = hashedPassword;
    }

    const affectedRows = await adminModel.update(id, updatedData);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found or no changes made' });
    }

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Failed to update admin. Please try again later.' });
  }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await adminModel.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Failed to delete admin. Please try again later.' });
  }
};

// Export all functions
module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
