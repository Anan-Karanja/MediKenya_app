// authMiddleware.js

// Middleware to authenticate user using session
const authenticate = (req, res, next) => {
    if (!req.session.user) {
      return res.status(403).json({ message: "Access denied. Please log in." });
    }
  
    // Attach the user info from session to the request object for further use
    req.user = req.session.user;
    next(); // Proceed to the next middleware or route handler
  };
  
  // Middleware to check if the user is an admin
  const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You do not have admin privileges" });
    }
    next(); // Continue if the user is an admin
  };
  
  // Middleware to check if the user is a doctor
  const isDoctor = (req, res, next) => {
    if (req.user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "You do not have doctor privileges" });
    }
    next(); // Continue if the user is a doctor
  };
  
  // Middleware to check if the user is a patient
  const isPatient = (req, res, next) => {
    if (req.user.role !== "patient") {
      return res
        .status(403)
        .json({ message: "You do not have patient privileges" });
    }
    next(); // Continue if the user is a patient
  };
  
  module.exports = { authenticate, isAdmin, isDoctor, isPatient };
  