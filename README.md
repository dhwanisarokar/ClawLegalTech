# 🏢 Resignation Management System (MERN Stack)

This is a **MERN Stack** application that allows **employees** to submit resignations and **HR** to manage them, including approval, rejection, and exit interviews.

## 🚀 Features
- **Employee Features**
  - Register/Login
  - Submit resignation request with last working day and reason
  - Fill out an exit interview upon approval
  - Receive email notifications for resignation status

- **HR Features**
  - Login with **Admin Credentials** (`admin/admin`)
  - View all resignation requests
  - Approve or reject resignations
  - Assign exit dates and review exit interviews

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Context
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Email Notifications**: Nodemailer
- **Date Validation**: Calendarific API (to check holidays)
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

## 📂 Folder Structure
```
resignation-management-system/
│── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resignationController.js
│   │   ├── exitInterviewController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resignationRoutes.js
│   │   ├── exitInterviewRoutes.js
│   ├── models/
│   ├── middleware/
│   ├── services/
│   │   ├── calendarific.js
│   │   ├── emailService.js
│   ├── server.js
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── main.jsx
```

## 📌 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register a new employee
- `POST /api/auth/login` - Login as Employee or Admin

### **Resignation Management**
- `POST /api/user/resign` - Employee submits resignation
- `GET /api/admin/resignations` - HR views all resignations
- `PUT /api/admin/conclude_resignation` - HR approves/rejects resignation

### **Exit Interview**
- `POST /api/user/responses` - Employee submits exit questionnaire
- `GET /api/admin/exit_responses` - HR views exit responses

## ⚙️ Installation & Setup

### **2️⃣ Backend Setup**
```sh
npm install
npm run dev
```
- Add a `.env` file:
  ```env
  PORT=8080
MONGODB_URL=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET=
CALENDARIFIC_API_KEY=
  ```

### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install
npm run dev
```

### **4️⃣ Open in Browser**
Visit `http://localhost:5173` to use the application.

---

