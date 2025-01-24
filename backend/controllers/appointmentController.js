const appointmentModel = require('../models/Appointment');
const { validationResult } = require('express-validator');

// Create Appointment
const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, doctorId, date, time, reason } = req.body;

    // Create a new appointment
    const appointmentData = { patientId, doctorId, date, time, reason };

    const newAppointmentId = await appointmentModel.create(appointmentData);

    res.status(201).json({
      message: 'Appointment created successfully',
      appointmentId: newAppointmentId,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Failed to create appointment. Please try again later.' });
  }
};

// Get Appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch appointment by ID
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Failed to fetch appointment. Please try again later.' });
  }
};

// Get Appointments by Patient ID
const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Fetch all appointments for a specific patient
    const appointments = await appointmentModel.findByPatientId(patientId);
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({ message: 'Failed to fetch patient appointments. Please try again later.' });
  }
};

// Get Appointments by Doctor ID
const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Fetch all appointments for a specific doctor
    const appointments = await appointmentModel.findByDoctorId(doctorId);
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Failed to fetch doctor appointments. Please try again later.' });
  }
};

// Update Appointment
const updateAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { date, time, reason } = req.body;

    // Prepare the update data
    const updatedData = { date, time, reason };

    const affectedRows = await appointmentModel.update(id, updatedData);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found or no changes made' });
    }

    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Failed to update appointment. Please try again later.' });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await appointmentModel.delete(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Failed to delete appointment. Please try again later.' });
  }
};

// Export all functions
module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  updateAppointment,
  deleteAppointment,
};
