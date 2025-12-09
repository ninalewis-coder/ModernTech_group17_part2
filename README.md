# ModernTech HR System - Group 17

A modern, responsive web-based HR Management System built with Vue.js and Bootstrap for ModernTech Solutions.

## Project Overview

This is a front-end proof-of-concept HR system designed to centralize and streamline HR operations including:
- Employee information management
- Attendance tracking
- Leave request management
- Payroll processing and payslip generation

## Case Study Background

ModernTech Solutions is a software development company that has grown from 20 to 250 employees. This HR system addresses their pain points by replacing fragmented spreadsheet-based processes with a unified, user-friendly web application.

## Features

### 1. **Dashboard (Home)**
- Real-time metrics display (Total employees, pending leaves, payroll, departments)
- Department distribution visualization
- Leave request status overview
- Recent attendance records
- Top performing departments

### 2. **Employee Management**
- Centralized employee database
- View and manage employee information
- Search and filter capabilities
- Employee details including position, department, and salary

### 3. **Attendance Management**
- Track employee attendance (Present/Absent)
- Filter by employee and date
- Attendance statistics and reports
- Attendance rate calculation

### 4. **Leave Management**
- Submit leave requests with duration calculation
- Approve/Deny leave requests
- Track request status (Pending, Approved, Denied)
- Filter requests by status
- Leave type categorization (Personal, Sick, Vacation, etc.)

### 5. **Payroll Management**
- Automated payroll calculation
- View detailed payroll records
- Generate digital payslips
- Track hours worked and deductions
- Print and download payslips

## 🛠 Technical Stack

- **Framework:** Vue.js 3 (Composition API)
- **UI Framework:** Bootstrap 5.3.8
- **Icons:** Bootstrap Icons 1.11.2
- **State Management:** Pinia
- **Routing:** Vue Router
- **Build Tool:** Vite
- **Data Storage:** JSON files (dummy data)

## Project Structure

```
ModernTech_HR-group17/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and static resources
│   ├── components/     # Reusable Vue components
│   │   └── Navbar.vue  # Navigation component
│   ├── data/           # Dummy JSON data files
│   │   ├── attendance.json
│   │   ├── employee_info.json
│   │   └── payroll_data.json
│   ├── router/         # Vue Router configuration
│   │   └── index.js
│   ├── stores/         # Pinia store modules
│   │   ├── employeeStore.js
│   │   ├── leaveStore.js
│   │   └── payrollStore.js
│   ├── views/          # Page components
│   │   ├── HomeView.vue
│   │   ├── AttendanceView.vue
│   │   ├── EmployeesView.vue
│   │   ├── LeaveView.vue
│   │   └── PayrollView.vue
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone https://github.com/ninalewis-coder/ModernTech_HR-group17.git
cd ModernTech_HR-group17
```

2. Install dependecies:
```sh
npm install
```

3. Run the development server:
```sh
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist/` folder.

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1920px+)
- Tablets (768px - 1024px)
- Smartphones (320px - 767px)

## User Interface

- **Clean and Modern:** Intuitive interface with card-based layouts
- **Color-Coded:** Status indicators and badges for quick visual reference
- **Interactive:** Hover effects and smooth transitions
- **Accessible:** Bootstrap components ensure accessibility standards

## Data Management

All data is stored in JSON files and manipulated on the client-side. This is a front-end only application with no backend integration, perfect for demonstration and proof-of-concept purposes.

### Dummy Data Includes:
- 10 employees across multiple departments
- Attendance records with Present/Absent status
- Leave requests with various statuses
- Payroll data with hours worked and deductions

## Key Functionality Demonstrations

### Employee Data Centralization
- Single source of truth for employee information
- Easy access to personal details, employment history, and contact information

### Automated Payroll Calculations
- Hours worked tracking
- Leave deduction calculations
- Net salary computation
- Digital payslip generation with print functionality

### Leave Request System
- Duration calculation (automatic day counting)
- Status workflow (Pending → Approved/Denied)
- Employee-wise leave history

### Attendance Tracking
- Daily attendance recording
- Status filtering and search
- Attendance rate analytics

## Browser Compatibility

Tested and compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## Development Team - Group 17

This project was developed as part of a front-end web development case study.

## License

This project is developed for educational purposes as part of a case study assignment.

## Acknowledgments

- ModernTech Solutions case study provided by the course instructors
- Bootstrap team for the excellent UI framework
- Vue.js community for comprehensive documentation

---

**Note:** This is a front-end only application using dummy data. No actual employee data is stored or processed. All interactions happen on the client-side.
