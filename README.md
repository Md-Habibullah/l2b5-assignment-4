# 📚 Minimal Library Management System

A full-stack Library Management System built for assignment submission. It allows users to view, create, update, borrow, and delete books. Built with **React, TypeScript, Redux Toolkit Query, ShadCN UI**, and **Express + MongoDB** backend.

---

## ✨ Features

- 📖 View all books in grid or table view
- 🔍 Book details with availability status
- ✏️ Edit book information
- ➕ Add new books
- 🗑️ Delete books with confirmation
- 📦 Borrow books (quantity + due date)
- 📊 View borrow summary with quantity breakdown
- ✅ Pagination, sorting, filtering
- ⚡ Fully type-safe using TypeScript
- 💅 Responsive and clean UI using ShadCN & TailwindCSS

---

## 💠 Tech Stack

### Frontend

- React (with Vite)
- TypeScript
- Redux Toolkit + RTK Query
- ShadCN UI (Tailwind-based)
- React Router DOM
- SweetAlert2 (modal/alerts)

### Backend

- Node.js + Express
- MongoDB with Mongoose
- RESTful API endpoints

---

## 🧹 Folder Structure (Frontend)

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components (Books, Borrow, Edit, etc.)
├── redux/               # Redux Toolkit slices & API layers
│   └── features/
│       ├── book/
│       └── borrow/
├── types/               # TypeScript interfaces
├── App.tsx              # Main routing config
└── main.tsx             # Root app entry
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

### 2. Install dependencies (Frontend)

```bash
cd frontend
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install dependencies (Backend)

```bash
cd backend
npm install
```

### 5. Setup environment variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
```

### 6. Start the backend

```bash
npm run dev
```

---

## 📷 Screenshots

> ✅ Book Grid UI\
> ✅ Borrow Form\
> ✅ Borrow Summary\
> ✅ Responsive Table View

*(Add screenshots in assignment submission or GitHub preview)*

---

## 📬 Contact / Submission Info

- 👨‍🏫 **Name**: Md. Habibullah
- 📝 **Assignment**: Library Management System (CRUD + Borrow)
- 🏫 **Institute**: [Your Institute Name]
- 🧑‍🏫 **Instructor**: [Instructor Name]

---

## 📄 License

This project is submitted as part of a course/assignment. Reuse only with permission.

