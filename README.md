# Hands-on Project: Working with Node.js, Express, and MySQL

## Objective

The objective of this assignment is to provide students with practical experience in developing a full-stack web application using Node.js, Express, and MySQL. Students will build the backend of the telemedicine application that includes patient management, doctor scheduling, appointment booking, and user authentication for patients. This project will help students understand how to connect a Node.js application to a MySQL database, perform CRUD operations, manage user authentication, and handle data securely and efficiently.

## Assignment Overview

In this assignment, students will design and develop the backend telemedicine application. The application will allow patients to create accounts, log in, book appointments, and manage their profiles. Doctors will manage their schedules, and administrators will oversee the system. Students will create the necessary database tables, set up an Express.js server, implement user authentication, and integrate core functionalities.

## Project Requirements

### 1. Database Design

#### Tables

- **Patients:** `id`, `first_name`, `last_name`, `email`, `password_hash`, `phone`, `date_of_birth`, `gender`, `address`.
- **Doctors:** `id`, `first_name`, `last_name`, `specialization`, `email`, `phone`, `schedule` (e.g., available days and times).
- **Appointments:** `id`, `patient_id`, `doctor_id`, `appointment_date`, `appointment_time`, `status` (e.g., scheduled, completed, canceled).
- **Admin:** `id`, `username`, `password_hash`, `role`.

#### Relationships

- Patients and doctors have a one-to-many relationship with appointments.
- Admin can manage doctors and view appointments.

#### Database Setup

- Design the database schema using MySQL.
- Create and populate tables with sample data for testing.

### 2. Node.js and Express Setup

#### Express Application

- Set up an Express.js project structure.
- Implement routing for different parts of the application (e.g., `/patients`, `/doctors`, `/appointments`, `/admin`).

#### Connecting to MySQL

- Use a MySQL driver (e.g., `mysql2`) to establish a connection between the Express server and MySQL database.
- Implement connection pooling for efficient database management.

### 3. User Management and Authentication

#### Patient Registration and Login

- **Registration:** Allow patients to create an account by providing their personal details and setting a password. Store passwords securely using hashing (e.g., bcrypt).
- **Login:** Implement a login system that authenticates patients using their email and password. Upon successful login, start a session for the patient.
- **Profile Management:** Allow logged-in patients to view and update their profile information (excluding their email and password).

#### Session Management

- Use session cookies to manage patient sessions.
- Implement session-based authentication to protect routes that require login (e.g., booking an appointment, viewing appointment history).
- Provide a logout functionality that ends the patient’s session.

### 4. Core Features Implementation

#### Patient Management

- **Create:** Patients can register and create an account.
- **Read:** Display a list of patients (admin only), with search and filter options.
- **Update:** Patients can update their profile information.
- **Delete:** Implement a feature for patients to delete their accounts.

#### Doctor Management

- **Create:** Admin can add new doctors, including their schedules.
- **Read:** Display a list of doctors with their specialization and availability.
- **Update:** Allow doctors or admin to update schedules or profile information.
- **Delete:** Implement a feature to deactivate or delete doctor profiles.

#### Appointment Booking

- **Create:** Patients can book an appointment by selecting a doctor, date, and time.
- **Read:** Display a list of upcoming appointments for patients and doctors.
- **Update:** Allow patients to reschedule or cancel appointments.
- **Delete:** Allow patients to cancel appointments, updating the status to "canceled."

### 5. Interactivity and User Experience

- Use form validation for all input fields.
- Provide real-time feedback for form submissions (e.g., success messages, error handling).

## Project Structure layout

### backend ➡️

1. **config/**: Holds configuration files, including `db.js` for database connection and `auth.js` for authentication settings.

2. **controllers/**: Manages business logic for various features, with separate controllers for each type of user and appointments.

3. **models/**: Contains the database schema for each entity (e.g., `Patient.js`, `Doctor.js`, `Appointment.js`).

4. **routes/**: Defines route handlers for different API endpoints (patients, doctors, admin, and appointments).

5. **services/**: Contains business logic that is separated from the controllers, improving maintainability. Includes files like `patientService.js`, `doctorService.js`, and `appointmentService.js`.

6. **middleware/**: Middleware for authentication and authorization, including `authMiddleware.js`.

7. **server.js**: The entry point for the backend server. It sets up the Express application and connects to the database.

### frontend ➡️

1. **public/**: Holds static assets such as stylesheets, JavaScript files, and images.

2. **views/**: Contains EJS template files to render dynamic content.

3. **partials/**: Reusable partial views (e.g., footer) for consistency across pages.

4. Individual EJS views for different roles and pages, like `login.ejs`, `patientDashboard.ejs`, `doctorDashboard.ejs`, and `adminDashboard.ejs`.

### Root files ➡️

1. **.env**: Stores environment variables for secure and configurable settings.

2. **.gitignore**: Lists files and folders Git should ignore (e.g., `node_modules`).

3. **package.json**: Lists all dependencies and scripts.

### Using crypto ➡️

1. ✅ You can use the built-in `crypto` module in Node.js to create a cryptographically strong random string. Here’s a simple command you can run:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

```bash
telemedicine-app/
├── backend/                       # Backend (Node.js + Express + MySQL)
│   ├── config/                    # Configuration files
│   │   └── db.js                  # Database connection configuration
│   │   └── auth.js                # Authentication and authorization middleware
│   ├── controllers/               # Controllers for handling logic
│   │   └── patientController.js   # Logic for patient-related actions
│   │   └── doctorController.js    # Logic for doctor-related actions
│   │   └── adminController.js     # Logic for admin-related actions
│   │   └── appointmentController.js # Logic for appointment-related actions
│   ├── models/                    # Database models
│   │   └── Patient.js             # Patient schema
│   │   └── Doctor.js              # Doctor schema
│   │   └── Admin.js               # Admin schema
│   │   └── Appointment.js         # Appointment schema
│   ├── routes/                    # Routes for API endpoints
│   │   └── patientRoutes.js       # Routes for patient-related endpoints
│   │   └── doctorRoutes.js        # Routes for doctor-related endpoints
│   │   └── adminRoutes.js         # Routes for admin-related endpoints
│   │   └── appointmentRoutes.js   # Routes for appointment-related endpoints
│   ├── middleware/                # Middleware functions
│   │   └── authMiddleware.js      # Authentication middleware
│   └── server.js                  # Server setup and entry point
├── frontend/                      # Frontend (HTML, CSS, JS)
│   ├── public/                    # Public assets (images, CSS, JS)
│   │   ├── css/
│   │   │   └── styles.css         # Stylesheets
│   │   ├── js/
│   │   │   └── main.js            # JavaScript functions
│   ├── views/                     # EJS templates for dynamic rendering
│   │   └── partials/              # Reusable partial views
│   │   │   └── footer.ejs         # Footer for all pages
│   │   └── login.ejs              # Login page for all users
│   │   └── patientDashboard.ejs   # Patient dashboard with appointment booking
│   │   └── doctorDashboard.ejs    # Doctor dashboard with appointment approval
│   │   └── adminDashboard.ejs     # Admin dashboard
├── .env                           # Environment variables
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```