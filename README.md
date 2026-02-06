# ModernTech HR Management System - Part 2

A comprehensive Human Resources Management System built with Vue.js frontend and Express.js backend, connected to a MySQL database.

## Project Overview

This system manages employee information, payroll, performance reviews, attendance, and leave requests for the ModernTech organization.

## Project Structure

```
1 ModernTech_group17_part2/
├── ModernTechSolutionsPt2/
│   ├── Backend/
│   │   ├── index.js                 (Unified API server for payroll and reviews)
│   │   └── package.json
│   └── ModernTech_HR-group17_m2-master/
│       ├── src/
│       │   ├── views/
│       │   │   ├── PayrollView.vue
│       │   │   ├── ReviewView.vue
│       │   │   ├── EmployeesView.vue
│       │   │   ├── AttendanceView.vue
│       │   │   ├── LeaveView.vue
│       │   │   └── LoginView.vue
│       │   ├── components/
│       │   ├── stores/
│       │   ├── router/
│       │   └── data/
│       ├── package.json
│       └── vite.config.js
├── README.md
├── package.json
└── package-lock.json
```

## Technology Stack

FRONTEND:
- Vue 3 (with Composition API)
- Vite (build tool)
- Bootstrap 5 (CSS framework)
- jsPDF (PDF generation)

BACKEND:
- Node.js
- Express.js
- MySQL 2 (Promise-based)
- CORS (Cross-Origin Resource Sharing)

DATABASE:
- MySQL
- Database: modern_solutions
- Tables: payroll, reviews, employees, attendance, leave

## Prerequisites

Before running the application, ensure you have:

1. Node.js (v14 or higher)
2. npm (comes with Node.js)
3. MySQL Server running locally
4. modern_solutions database created
5. Required tables: payroll, reviews, employees, attendance, leave

## Installation

STEP 1 - Install Frontend Dependencies

```bash
cd ModernTech_HR-group17_m2-master
npm install
```

STEP 2 - Install Backend Dependencies (if needed)

```bash
cd Backend
npm install
```

The backend requires:
- express
- mysql2
- cors

## Configuration

DATABASE CONNECTION

The backend connects to MySQL using these credentials in Backend/index.js:

```
User: root
Host: localhost
Database: modern_solutions
Password: Strongmaan123!
```

To change these credentials, edit Backend/index.js:

```javascript
const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'modern_solutions',
    password: 'Strongmaan123!'
});
```

API CONFIGURATION

- Frontend API URL: http://localhost:5050
- Backend Server Port: 5050

These are configured in:
- PayrollView.vue: const API_BASE_URL = 'http://localhost:5050'
- ReviewView.vue: const API_BASE_URL = 'http://localhost:5050'


- Employees calls the backend API:
  - Base URL: http://localhost:5050
  - Service: src/api/employeeService.js
  - Store: src/stores/employeeStore.js

## Running the Application

STEP 1 - Start the Backend API

```bash
cd Backend
node index.js
```

You should see output:
```
==================================================
Payroll + Review API Server is RUNNING
URL: http://localhost:5050
==================================================
```

STEP 2 - Start the Frontend Development Server

In a new terminal:

```bash
cd ModernTech_HR-group17_m2-master
npm run dev
```

The frontend will be available at:
- http://localhost:5173 (default Vite dev server)
- Or the URL shown in your terminal

STEP 3 - Open in Browser

Navigate to the URL shown in the terminal (usually http://localhost:5173)

## API Endpoints

BASE URL: http://localhost:5050

PAYROLL ENDPOINTS

GET /payroll
- Fetch all payroll records
- Returns: Array of payroll objects

POST /payroll
- Create new payroll record
- Body: { employee_id, hours_worked, leave_deductions, final_salary }
- Returns: { message, result }

PATCH /payroll/:id
- Update payroll record
- Body: { employee_id, hours_worked, leave_deductions, final_salary }
- Returns: { message, result }

DELETE /payroll/:id
- Delete payroll record
- Returns: { message, result }

REVIEW ENDPOINTS

GET /reviews
- Fetch all reviews
- Returns: Array of review objects

POST /reviews
- Create new review
- Body: { employee_id, review_period, review, review_date }
- Returns: { message, reviewId }

PATCH /reviews/:id
- Update review
- Body: { employee_id, review, rating, review_date }
- Returns: { message, result }

DELETE /reviews/:id
- Delete review
- Returns: { message, result }

EMPLOYEE ENDPOINTS

GET /employee
- Fetch all employees
- Returns: Array of employee objects

GET /employee/:id
- Fetch a single employee by ID
- Returns: Employee object

POST /employee
- Create new employee
- Body: { employee_id, name, position, department, salary, contact, employment_history }
- Returns: { message, result }

PATCH /employee/:id
- Update employee
- Body: { employee_id, name, position, department, salary, contact, employment_history }
- Returns: { message, result }

DELETE /employee/:id
- Delete employee
- Returns: { message, result }

LEAVE ENDPOINTS

- Not implemented in the backend yet.
- Leave requests are currently handled client-side in `LeaveView.vue` using `src/data/attendance.json`.

ATTENDANCE ENDPOINTS

- Not implemented in the backend yet.
- Attendance data is currently read from `src/data/attendance.json` on the client.

## Features

PAYROLL MANAGEMENT
- View all employee payroll records
- Add new payroll entries
- Calculate total payroll and average salaries
- Track hours worked and leave deductions
- Generate and download payslips as PDF
- View detailed payslip information

PERFORMANCE REVIEWS
- Submit performance reviews for employees
- View past reviews in a sortable table
- Filter reviews by employee and period
- Edit and delete reviews
- View full review details in modal

EMPLOYEE MANAGEMENT
- View employee information
- Department and position details
- Employee contact information
- Add new employees via modal form
- Edit employee details inline
- Delete employees
- Search by name, department, or position
- Filter by department
- Department breakdown with counts and percentages
- Integration with payroll and review systems

ATTENDANCE
- Track employee attendance
- View attendance records by employee

LEAVE
- Manage leave requests
- View leave history
- Submit leave requests
- Approve or deny pending requests
- Auto-calculate leave duration

## Database Schema

PAYROLL TABLE
- payroll_id (Primary Key)
- employee_id (Foreign Key)
- hours_worked (Integer)
- leave_deductions (Integer)
- final_salary (Decimal)

REVIEWS TABLE
- review_id (Primary Key)
- employee_id (Foreign Key)
- review_period (String - YYYY-MM format)
- review (Text)
- review_date (DateTime)

EMPLOYEES TABLE
- employeeId
- name
- department
- position
- salary
- contact information

## Data Flow

PAYROLL VIEW:
1. Component mounts
2. Loads employee data from JSON
3. Fetches payroll data from API GET /payroll
4. Maps database fields to frontend format
5. Displays in table with calculated statistics
6. On form submit: POST to /payroll with new data
7. Refreshes table after successful submission

REVIEW VIEW:
1. Component mounts
2. Loads employee data from JSON
3. Fetches review data from API GET /reviews
4. Maps database fields to frontend format
5. Displays sorted reviews in table
6. On form submit: POST to /reviews with new review
7. Date conversion: ISO format to MySQL DATETIME format
8. Refreshes table after successful submission

EMPLOYEE VIEW:
1. Component mounts
2. Employee store fetches data from API GET /employee
3. Store updates state and view renders table
4. Search and department filters are applied client-side
5. Inline edit: PATCH /employee/:id, then refresh list
6. Add employee: POST /employee, then refresh list
7. Delete employee: DELETE /employee/:id, then update local state

LEAVE VIEW:
1. Component mounts
2. Loads employees from `src/data/employee_info.json`
3. Loads attendance/leave data from `src/data/attendance.json`
4. Transforms leave records into request list
5. Filters requests by status tabs (All/Pending/Approved/Denied)
6. On submit: adds a new request in local state and resets form
7. Approve/Deny updates status in local state only

ATTENDANCE VIEW:
1. Component mounts
2. Loads attendance data from `src/data/attendance.json`
3. Transforms attendance records into table rows
4. Filters/searches are applied client-side (if enabled)
5. No backend API calls; data is read-only unless extended

## Troubleshooting

ISSUE: "Backend not responding" or "Failed to load payroll data"

SOLUTION:
1. Ensure Backend/index.js is running: node Backend/index.js
2. Verify MySQL is running and accessible
3. Check that modern_solutions database exists
4. Check console for detailed error messages
5. Verify firewall is not blocking port 5050

ISSUE: "MySQL connection error"

SOLUTION:
1. Verify MySQL server is running
2. Check credentials in Backend/index.js
3. Verify modern_solutions database exists
4. Check that required tables are created:
   - payroll
   - reviews
   - employees
   - attendance
   - leave

ISSUE: "CORS error" or "Cross-Origin Request Blocked"

SOLUTION:
- Backend already has CORS configured for all origins
- Restart Backend/index.js
- Clear browser cache and refresh page

ISSUE: "Review datetime error: Incorrect datetime value"

SOLUTION:
- This is handled automatically
- Backend converts ISO format to MySQL DATETIME format
- Should work without additional configuration

## Available Scripts

FRONTEND

npm run dev
- Start Vite development server

npm run build
- Build for production

npm run preview
- Preview production build

npm run lint
- Run ESLint (if configured)

BACKEND

node index.js
- Start Express API server

## Development

To add new features:

1. Create new Vue components in src/views/ or src/components/
2. Add API endpoints in Backend/index.js
3. Create database tables/columns as needed
4. Update database pool queries
5. Add CORS endpoints if new routes are added

## Database Queries

Example queries used in backend:

Fetch payroll:
```sql
SELECT * FROM payroll;
```

Add payroll:
```sql
INSERT INTO payroll (payroll_id, employee_id, hours_worked, leave_deductions, final_salary) 
VALUES (?, ?, ?, ?, ?);
```

Fetch reviews:
```sql
SELECT * FROM reviews;
```

Add review:
```sql
INSERT INTO reviews (review_id, employee_id, review_period, review, review_date) 
VALUES (?, ?, ?, ?, ?);
```

Fetch employees:
```sql
SELECT * FROM employees;
```

Add employee:
```sql
INSERT INTO employees (employee_id, name, department, position, salary, contact, employment_history)
VALUES (?, ?, ?, ?, ?, ?, ?);
```

## Deployment Notes

For production deployment:

1. Change MySQL credentials to production credentials
2. Update API_BASE_URL in frontend views to production backend URL
3. Build frontend: npm run build
4. Deploy built files from dist/ to web server
5. Deploy Backend/index.js to production server
6. Use environment variables for sensitive credentials
7. Enable HTTPS for production
8. Configure CORS for specific frontend domain

## Support & Issues

For issues or questions:
1. Check the Troubleshooting section
2. Review console logs in browser (F12)
3. Review backend console output
4. Verify database connections and data

## Version

Version: 1.0.0
Last Updated: February 6, 2026

## Team

ModernTech Group 17
Part 2 - Database Integration
