# 📘 Students Management System — MERN Stack

A full-stack **MERN application** that provides complete user authentication and student records management with a modern UI.  
Built using **Node.js, Express.js, MongoDB**, and a **React** frontend with **Tailwind CSS, Bootstrap, SweetAlert2, Ant Design**, and **Axios**.

---

## 🚀 Features

#### 🔐 Authentication
- User Signup  
- User Login  
- User Logout  
- Update user profile  
- JWT authentication  
- Protected routes  

#### 🎓 Students Management
- Create student records  
- Update student records  
- Delete student records  
- Paginated students list (server-side)  
- Search & filter students  
- Modern and responsive UI  
- SweetAlert2 confirmation dialogs  

#### 🧮 Student Marks Management
- Add marks for each student  
- Edit marks  
- Delete marks  
- Paginated marks list  
- Integrated inside student details page  

---

### 🛠️ Tech Stack

#### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Tokens)  
- bcrypt  
- CORS  
- Nodemon  

#### Frontend
- React.js  
- React Router  
- Axios  
- Bootstrap  
- Tailwind CSS  
- SweetAlert2  
- Ant Design  

---

### ⚙️ Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Create .env File in backend/**
```bash
NODE_ENV = development
PORT = 8080
MONGO_URL = mongodb://localhost:27017
DB = backend
JWT_SECRET = rvxZOqJeYQiyjhlqY21RMnxRUrsB4J0aHxnYAM4Mmm0=
CLIENT = http://localhost:5173
DOMAIN = localhost
```

3. **Start Backend Server**
- you must have MongoDB running on `mongodb://localhost:27017` in your local machine
```bash
npm run dev
Backend runs at:
http://localhost:8080
```

💻 Frontend Setup
1. Install Dependencies
```bash
Copy code
cd frontend
npm install
```
2. **Create .env File in frontend/**
```bash
VITE_BASE_URL = http://localhost:8080

```

3. Start Frontend
```bash
Copy code
npm start
Frontend runs at:
http://localhost:3000
```

### 🔗 API Endpoints
```bash
# Authentication
# Method	Endpoint	Description
POST	/auth/signup	# Register user
POST	/auth/login	 # Login user
GET	/auth/session	     # Get logged-in user
GET	/auth/refresh-token	     # refreshs access token
PUT	/auth/:id   #	Update user
POST	/auth/logout   #	Logout user

# Students
# Method	Endpoint	Description
POST	/student  #	Create student
GET	/student?page=1&limit=10&search=&filter=  # Paginated list
PUT	/student/:id	# Update student
DELETE	/student/:id	 # Delete student

# Marks
# Method	Endpoint	Description
POST	/student/marks	Add marks
GET	/student/marks/:studentId?page=1&limit=10&search= 	# Paginated marks
PUT	/student/marks/:id 	#(id - marks) Update marks
DELETE	/student/marks/:id #	Delete marks

```

### 🎨 UI Highlights
-Fully responsive layout
-Tailwind + Bootstrap hybrid styling
-Ant Design components & tables
-SweetAlert2 popups
-Clean and reusable components

### 🔒 Security
JWT authentication
- Protected Express routes
- Password hashing (bcrypt)
- CORS protection
- Secure Axios interceptors

### 🏁 How to Use
Register or log in
- Add student records
- View paginated list
- Search & filter students
- Add/update/delete marks
- Experience a modern UI

### 📜 License
This project is licensed under the MIT License.






