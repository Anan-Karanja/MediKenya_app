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
├── backend/                           # Backend logic and configuration (Node.js + Express + MySQL)
│   ├── config/                        # Configuration files (dotenv, DB connection, session setup)
│   │   ├── db.js                      # Database connection setup
│   │   ├── auth.js                    # Authentication and session setup
│   ├── controllers/                   # Request-handling logic (Express + MVC pattern)
│   │   ├── patientController.js       # Logic for patient actions
│   │   ├── doctorController.js        # Logic for doctor actions
│   │   ├── adminController.js         # Logic for admin actions
│   │   ├── appointmentController.js   # Logic for appointment actions
│   ├── models/                        # Database models (Sequelize or MySQL queries)
│   │   ├── Patient.js                 # Patient table representation
│   │   ├── Doctor.js                  # Doctor table representation
│   │   ├── Admin.js                   # Admin table representation
│   │   ├── Appointment.js             # Appointment table representation
│   ├── routes/                        # API endpoints (Express Router)
│   │   ├── patientRoutes.js           # Routes for patient API calls
│   │   ├── doctorRoutes.js            # Routes for doctor API calls
│   │   ├── adminRoutes.js             # Routes for admin API calls
│   │   ├── appointmentRoutes.js       # Routes for appointment API calls
│   ├── middleware/                    # Middleware functions
│   │   ├── authMiddleware.js          # Authentication and role-based access middleware
│   │   ├── validationMiddleware.js    # Input validation middleware
│   └── server.js                      # Main server file

├── frontend/                          # Frontend assets and templates (EJS + CSS + Vanilla JS)
│   ├── public/                        # Static assets (CSS, JS, Images)
│   │   ├── css/                       # Styling (CSS)
│   │   │   ├── global.css             # Global styles
│   │   │   ├── auth.css               # Login and registration-specific styles
│   │   │   ├── dashboard.css          # Dashboard-specific styles
│   │   │   ├── error.css              # Styles for error pages
│   │   │   ├── skeleton.css           # Skeleton loading effect styles
│   │   ├── js/                        # Frontend interactivity (JavaScript)
│   │   │   ├── main.js                # Main JavaScript for general interactions
│   │   │   ├── alerts.js              # JavaScript for SweetAlert notifications
│   │   │   ├── formValidation.js      # JavaScript for client-side form validation
│   │   │   ├── skeletonLoader.js      # Skeleton loader effect implementation
│   │   ├── images/                    # Static images
│   │       ├── logo.png               # Application logo
│   ├── views/                         # EJS templates for server-side rendering
│   │   ├── partials/                  # Shared layouts and reusable components
│   │   │   ├── footer.ejs             # Footer template
│   │   ├── auth/                      # Authentication templates
│   │   │   ├── login.ejs              # Login page
│   │   │   ├── registerPatient.ejs    # Patient registration form
│   │   │   ├── registerDoctor.ejs     # Doctor registration form
│   │   ├── dashboards/                # Dashboard templates
│   │   │   ├── patientDashboard.ejs   # Patient dashboard (includes appointments)
│   │   │   ├── doctorDashboard.ejs    # Doctor dashboard
│   │   │   ├── adminDashboard.ejs     # Admin dashboard
│   │   ├── errors/                    # Error pages
│   │   │   ├── 404.ejs                # Page not found (404)
│   │   │   ├── 500.ejs                # Internal server error (500)
│   │   ├── home.ejs                   # Default home page template
├── .env                               # Environment variables
├── README.md                          # Project documentation
```

## Dependencies

The following dependencies are used in this project:

1. **bcryptjs**: A library used for hashing passwords before storing them in the database, ensuring secure authentication and protecting user data. (Version: `^2.4.3`)
2. **body-parser**: A middleware used for parsing incoming request bodies, making it easier to handle form data, JSON, and URL-encoded requests. (Version: `^1.20.3`)
3. **connect-session-sequelize**: Stores session data in a Sequelize-managed database, replacing the default in-memory store, making sessions persistent across server restarts. (Version: `^7.1.7`)
4. **cors**: Middleware that enables Cross-Origin Resource Sharing (CORS), allowing the frontend and backend to communicate across different domains or ports. (Version: `^2.8.5`)
5. **dotenv**: Loads environment variables from a `.env` file into `process.env`. It is used to manage sensitive information like database credentials, API keys, and other configuration variables. (Version: `^16.4.7`)
6. **ejs**: A templating engine used to render dynamic HTML pages by embedding JavaScript into HTML. (Version: `^3.1.10`)
7. **express**: A fast, unopinionated web framework for Node.js that simplifies routing and handling HTTP requests and responses. (Version: `^4.21.2`)
8. **express-session**: Middleware that manages user sessions, enabling persistent login states and user-specific data throughout the lifecycle of a user's session. (Version: `^1.18.1`)
9. **express-validator**: Middleware functions used for validating and sanitizing user input, ensuring that incoming data is clean and secure before processing or storing it. (Version: `^7.2.0`)
10. **morgan**: An HTTP request logger middleware for Node.js. It logs details of incoming requests, which helps in debugging and monitoring during development. (Version: `^1.10.0`)
11. **mysql2**: A MySQL database client for Node.js. It enables interaction with a MySQL database, performing operations like querying and updating data. (Version: `^3.11.5`)
12. **nodemon**: A development tool that automatically restarts the Node.js server when file changes are detected, improving workflow. (Version: `^3.1.9`)
13. **sequelize**: A promise-based ORM for Node.js that simplifies interactions with MySQL databases. It provides an easy-to-use API to query and manage data in the database. (Version: `^6.37.5`)
14. **simple-peer**: A WebRTC library that simplifies the peer-to-peer connection setup for video calling functionality. (Version: `^9.11.1`)
15. **socket.io**: A library for real-time, bidirectional communication between clients and the server, essential for signaling in WebRTC. (Version: `^4.8.1`)
16. **socket.io-client**: The client-side library for connecting to the signaling server used in WebRTC. (Version: `^4.8.1`)

## Installing the dependencies

Run the following command in the terminal:

```bash
npm install bcryptjs body-parser connect-session-sequelize cors dotenv ejs express express-session express-validator morgan mysql2 sequelize socket.io socket.io-client simple-peer
```

## Generate a random set of string

✅ You can use the built-in crypto module in Node.js to create a cryptographically strong random string. Here’s a simple command you can run:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
