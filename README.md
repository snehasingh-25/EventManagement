# **Event Management App**

A full-stack **Event Management Application** built with **React (Frontend)** and **Node.js + Express (Backend)**, featuring secure user authentication, event management APIs, and form validation.

---

## **Features**

* **User Authentication** (Sign Up / Sign In / JWT-based authorization)
* **Password Encryption** with bcrypt
* **Input Validation** using Zod
* **Event Management**
  * Create Events
  * View All Events
  * Join Events
* **Persistent Login** with JWT
* **Modern UI** with Light Theme
* **REST API architecture**
* **MongoDB Database** for user and event storage

---

## **Tech Stack**

### **Frontend**

* **React** – UI library for building interactive user interfaces
* **React Router** – For navigation between pages
* **Axios** – For API calls

### **Backend**

* **Node.js** – Server-side JavaScript runtime
* **Express.js** – Minimalist web framework
* **MongoDB** – NoSQL database
* **Mongoose** – ODM for MongoDB
* **JWT (JSON Web Token)** – Secure authentication mechanism
* **bcrypt** – Password hashing and security
* **Zod** – Schema-based validation

---

## **Security Tools Used**

### **1. JWT (JSON Web Token)**

JWT is used to securely transmit information between the server and the client.

* **Why JWT?**

  * Stateless authentication (no need to store sessions on the server)
  * Reduces database calls for authentication
  * Compact and secure format
* **How it works in this app:**

  1. User logs in → Server validates credentials.
  2. Server generates a JWT with user ID as payload.
  3. JWT is stored on the client side (usually in cookies or localStorage).
  4. On every protected route request, JWT is sent in the Authorization header.
  5. Server verifies JWT before processing the request.

---

### **2. bcrypt**

bcrypt is used to hash user passwords before storing them in the database.

* **Why bcrypt?**

  * Adds salt automatically to prevent rainbow table attacks.
  * Computationally expensive hashing makes brute-force attacks slower.
* **How it works in this app:**

  1. During **Sign Up**, password is hashed using `bcrypt.hash()` before saving.
  2. During **Sign In**, entered password is compared using `bcrypt.compare()`.

---

### **3. Zod**

Zod is used for request validation.

* **Why Zod?**

  * Prevents invalid data from being stored or processed.
  * Schema definitions are type-safe and easy to maintain.
* **How it works in this app:**

  * When a request comes (Sign Up, Sign In, Create Event), the request body is validated against a Zod schema.
  * If invalid, the server returns a descriptive error message.

---