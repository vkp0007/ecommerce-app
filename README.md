# 🛍️ MiniStore Web Application (MERN Stack)

A modern and fully functional **MiniStore web application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. 
This project includes essential features like **user authentication**, **product listing**, **cart management**, **order handling**, and **secure checkout**.

---
## 🌍 Live Demo

🔗[Click to view](https://mini-store-mu-mauve.vercel.app/)

---
## 🚀 Features

### 👥 User
- ✅ Register, Login, and Logout with JWT authentication
- ✅ View all products and their details
- ✅ Add products to the cart
- ✅ Proceed to checkout and place orders
- ✅ View and manage cart items

### 🛒 Products
- ✅ Display products with images, price, stock, and category
- ✅ Detailed product page with description and user reviews
- ✅ Add items to the cart or buy directly
- ✅ Search and filter products by category

### ⚡ UI & Performance
- ✅ Skeleton loading for smoother page transitions
- ✅ Lazy loading to improve initial load performance
- ✅ Product carousel for improved browsing experience

### 💬 Product Reviews
- ✅ Static reviews displayed for now
- ✅ Shows sample user comments and ratings
- ⭐ User rating system with 5-star reviews

### 🧑‍💼 Admin
- ✅ Add, edit, or delete products
- ✅ Manage users and orders
- ✅ View all orders and their status
- ✅ Update product inventory

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JSON Web Token (JWT) |
| **Deployment** | Vercel (Frontend), Vercel (Backend) |

---

## ⚙️ Run Instructions

### 🧩 Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or Local MongoDB
- Git

### 📦 Installation Steps

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

#### 2️⃣ Install dependencies

**🖥 Backend Setup**

```bash
cd server
npm install
```

**💻 Frontend Setup**

```bash
cd ../client
npm install
```

#### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `server` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

#### 4️⃣ Run the Application

**▶ Start Backend**

```bash
cd server
npm run dev
```

**▶ Start Frontend**

```bash
cd ../client
npm start
```
---

## 🧠 Learnings

During this project, I learned and implemented:

✅ **Full-stack integration** using the MERN stack

✅ **RESTful API** creation and testing with JWT authentication

✅ **Dynamic UI building** with React & Tailwind CSS

✅ **State management** with React hooks and Context API

✅ **Secure API communication** and error handling

✅ **Deployment process** on Vercel for both frontend and backend

✅ **MongoDB database** design and Mongoose ODM

✅ **Responsive design** principles for mobile and desktop

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and submit a pull request.

### Steps to Contribute:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/your-feature`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature`)
5. **Open a Pull Request**

---
<div align="center">

### ⭐ Star this repo if you find it helpful!

</div>
