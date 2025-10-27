# 🛍️ Mini E-Commerce Web Application (MERN Stack)

A modern and fully functional **Mini E-Commerce web application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. 
This project includes essential features like **user authentication**, **product listing**, **cart management**, **order handling**, and **secure checkout**.

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

## 📸 Screenshots

### Home Page
<img width="1892" height="690" alt="Screenshot 2025-10-27 171625" src="https://github.com/user-attachments/assets/45ff0384-5f1a-4bb5-9f68-8f57676dce59" />


### Product Page
<img width="1920" height="821" alt="Screenshot (13)" src="https://github.com/user-attachments/assets/754e393f-b4fa-41e7-b34d-a028b2f5dd52" />


### Orders Page
<img width="1896" height="830" alt="Screenshot 2025-10-27 175525" src="https://github.com/user-attachments/assets/307b8c05-84e6-42de-9a87-5ef74db77b6b" />


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

## 🌍 Live Demo

🔗 **Frontend (Vercel):** [Live Demo Link](https://your-app.vercel.app)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

</div>
