# 📦 Code-A-Nova Inventory Management System (Full Stack)

A Full Stack Inventory Management System developed as part of the **Code-A-Nova Full Stack Development Internship**. This application helps businesses manage products, categories, suppliers, and inventory efficiently with secure user authentication.

---

## 🚀 Features

### 👤 User Authentication
- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected API Routes

### 📦 Product Management
- Add Product
- View Products
- Update Product Details
- Delete Product
- Search Products
- Pagination Support

### 🗂️ Category Management
- Add Category
- View Categories
- Edit Category
- Delete Category

### 🚚 Supplier Management
- Add Supplier
- View Suppliers
- Update Supplier Details
- Delete Supplier

### 📊 Dashboard
- Total Products
- Total Categories
- Total Suppliers
- Inventory Summary

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Token (JWT)
- bcrypt.js

## Version Control
- Git
- GitHub

---

# 📁 Project Structure

```
Code-A-Nova-Inventory-Management-System-Full-Stack-

│── Frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── products.html
│   ├── categories.html
│   ├── suppliers.html
│   └── ...

│── Inventory Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   └── server.js

└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/ramyanagesh29/Code-A-Nova-Inventory-Management-System-Full-Stack-.git
```

---

## 2️⃣ Backend Setup

```bash
cd "Inventory Backend"
npm install
```

Create a **.env** file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:

```bash
npm start
```

or

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

Open the **Frontend** folder.

Run:

```bash
npm install
```

Start the frontend (if applicable):

```bash
npm start
```

Or simply open **index.html** in your browser if using static pages.

---

# 🔐 Authentication

The backend uses:

- JWT Authentication
- Protected Routes
- bcrypt Password Hashing

Only authenticated users can access secured APIs.

---

# 📷 Screenshots

You can add screenshots here.

Example:

```
screenshots/

Home Page

Login Page

Dashboard

Products

Categories

Suppliers
```

---

# 📌 API Endpoints

## Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

## Products

- GET `/products`
- POST `/products`
- PUT `/products/:id`
- DELETE `/products/:id`

## Categories

- GET `/api/categories`
- POST `/api/categories`
- PUT `/api/categories/:id`
- DELETE `/api/categories/:id`

## Suppliers

- GET `/api/suppliers`
- POST `/api/suppliers`
- PUT `/api/suppliers/:id`
- DELETE `/api/suppliers/:id`

## Dashboard

- GET `/api/dashboard`

---

# ✨ Future Enhancements

- Product Image Upload
- Inventory Reports
- Sales Module
- Purchase Orders
- Export to Excel/PDF
- Email Notifications
- Role-Based Access Control (Admin/User)

---

# 👩‍💻 Author

**Ramya N**

- GitHub: https://github.com/ramyanagesh29
- LinkedIn:https://www.linkedin.com/in/ramya-n2918/

---

# 📄 License

This project was developed for learning purposes as part of the **Code-A-Nova Full Stack Development Internship**.
