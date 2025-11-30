# Employee Attendance System

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows employees to mark attendance and managers to track team attendance.  
This project currently supports **Login, Check-In, Check-Out, and Attendance History**.  
Upcoming updates will include manager features, monthly summaries, filtering, and reports.

---

## 🚀 Features (Current Implementation)

### ✅ Employee Features Completed
- Login using email & password  
- Check-In  
- Check-Out  
- View own attendance history  
- Auto calculation of working hours  
- Dashboard with records  

### 🔄 Manager Features (Coming in Next Update)
- View all employees’ attendance  
- Filter by employee, date, status  
- Export attendance reports (CSV)  
- Team calendar view  
- Manager dashboard with stats  

---

## 📌 Tech Stack
**Frontend:** React, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB  
**Database:** MongoDB Atlas  
**Authentication:** JWT (JSON Web Token)  

---

## 📁 Folder Structure (Current)

attendance-backend/
├── models/
│ ├── userModel.js
│ └── attendanceModel.js
├── routes/
│ ├── authRoutes.js
│ └── attendanceRoutes.js
├── controllers/
│ ├── authController.js
│ └── attendanceController.js
├── middleware/authMiddleware.js
├── server.js
└── .env

attendance-frontend/
├── src/
│ ├── App.js
│ ├── index.js
│ ├── components/
│ │ ├── Login.js
│ │ └── Dashboard.js
└── package.json


---

## 🗄 Database Schema

### Users Collection
{
id,
name,
email,
password (hashed),
role (employee / manager),
createdAt
}

### Attendance Collection
{
id,
userId,
date,
checkIn,
checkOut,
totalHours,
status
}

---

## ✔️ Completed API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/register` *(optional)* | Register User |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance/checkin` | Mark Check-In |
| POST | `/api/attendance/checkout` | Mark Check-Out |
| GET | `/api/attendance/my-attendance` | Get logged-in user's history |

---

## 🛠 Upcoming Enhancements
- Manager login  
- View all employees attendance  
- Attendance filtering (date, employee, status)  
- Monthly summary (present/absent/late)  
- CSV export  
- Calendar view  
- Profile section  
- Department & employee ID support  
- UI improvements  

---

## 📄 Current Project Status
The base employee attendance system is fully working with backend + frontend integration.  
Further enhancements and manager features will be added in the next update.

---

## 🙌 Author
Deepika — Employee Attendance System (MERN)

---
