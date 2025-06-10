# 📚 Library Management System

A full-stack web-based Library Management System designed to efficiently handle book management and user access. Built with **React + TypeScript** for the frontend, **ASP.NET Core Web API** for the backend, and **SQLite** for lightweight data storage. This project follows the principles of **Clean Architecture** to ensure modularity, scalability, and maintainability.

---

## 🚀 Features

- 🔐 **User Authentication** – Login and role-based access control
- 📘 **Book Management** – Add, update, delete, and view books
- 🔍 **Search Functionality** – Search and filter by title or author
- 👨‍💼 **Admin Panel** – Manage books and user access
- 📱 **Responsive UI** – Accessible across different devices

---

## 🛠️ Tech Stack

| Layer     | Technology            |
|----------|------------------------|
| Frontend | React + TypeScript     |
| Backend  | C#, ASP.NET Core Web API |
| Database | SQLite + Entity Framework Core |

---

## 🧱 Clean Architecture

This project uses Clean Architecture with clear separation of:

- **Controllers** – Handle HTTP requests
- **Services** – Contain business logic
- **Repositories** – Handle data access
- **DTOs** – Transfer data securely

---

## ⚙️ Installation & Setup

### Backend Setup (ASP.NET Core)

1. Open the solution in **Visual Studio**.
2. Build the project to restore NuGet dependencies.
3. Run the project:
   ```bash
   dotnet run
API will launch at https://localhost:5275.

Swagger UI opens automatically for testing.

Frontend Setup (React + TypeScript)
Navigate to the client directory:


```bash
npm install --legacy-peer-deps
```


const API_BASE_URL = "https://localhost:5275";
Start the frontend:

bash
Copy
Edit
```bash 
npm start
```
App will run on http://localhost:3000.


C.D.Kasthuriarachchi
Developed for Expernetic (Pvt) Ltd
