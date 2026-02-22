# Role-Based Library Management System

This document provides a detailed overview of the Role-Based Library Management System, including API endpoints, their purpose, and implementation details. Each flow is explained with examples to guide the development process.

---

## **Authentication APIs**

### **1. Register a User**
**Endpoint:** `POST /auth/register`  
**Purpose:** Allows an admin to register a new user with a specific role (`admin`, `librarian`, `borrower`).  
**Who can access:** Only `admin`.

**Request:**
```json
POST /auth/register
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123",
  "role": "borrower"
}
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The `roleMiddleware` ensures the user has the `admin` role.
3. The controller hashes the password using **bcrypt**.
4. The user is saved to the database.

**Response:**
```json
{
  "message": "User registered successfully.",
  "user": {
    "id": "12345",
    "username": "john_doe",
    "role": "borrower"
  }
}
```

---

### **2. Login a User**
**Endpoint:** `POST /auth/login`  
**Purpose:** Allows a user to log in and receive a JWT token.  
**Who can access:** All users.

**Request:**
```json
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**How it works:**
1. The controller verifies the username and password.
2. If valid, a JWT token is generated and returned.

**Response:**
```json
{
  "message": "Login successful.",
  "token": "<JWT_TOKEN>"
}
```

---

## **Book Management APIs**

### **3. Add a New Book**
**Endpoint:** `POST /books`  
**Purpose:** Allows admins and librarians to add a new book to the library.  
**Who can access:** `admin`, `librarian`.

**Request:**
```json
POST /books
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publishedYear": 1925,
  "availableCopies": 5
}
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The `roleMiddleware` ensures the user has the `admin` or `librarian` role.
3. The controller validates the request body and saves the book to the database.

**Response:**
```json
{
  "message": "Book added successfully.",
  "book": {
    "id": "67890",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925,
    "availableCopies": 5
  }
}
```

---

### **4. Get All Books**
**Endpoint:** `GET /books`  
**Purpose:** Allows all users to view the list of books in the library.  
**Who can access:** All roles.

**Request:**
```json
GET /books
Authorization: Bearer <JWT_TOKEN>
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The controller fetches all books from the database and returns them.

**Response:**
```json
{
  "books": [
    {
      "id": "67890",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publishedYear": 1925,
      "availableCopies": 5
    },
    {
      "id": "12345",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "genre": "Fiction",
      "publishedYear": 1960,
      "availableCopies": 3
    }
  ]
}
```

---

### **5. Update a Book**
**Endpoint:** `PUT /books/:id`  
**Purpose:** Allows admins and librarians to update book details.  
**Who can access:** `admin`, `librarian`.

**Request:**
```json
PUT /books/67890
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "availableCopies": 10
}
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The `roleMiddleware` ensures the user has the `admin` or `librarian` role.
3. The controller updates the book in the database.

**Response:**
```json
{
  "message": "Book updated successfully.",
  "book": {
    "id": "67890",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925,
    "availableCopies": 10
  }
}
```

---

### **6. Delete a Book**
**Endpoint:** `DELETE /books/:id`  
**Purpose:** Allows admins to delete a book from the library.  
**Who can access:** `admin`.

**Request:**
```json
DELETE /books/67890
Authorization: Bearer <JWT_TOKEN>
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The `roleMiddleware` ensures the user has the `admin` role.
3. The controller deletes the book from the database.

**Response:**
```json
{
  "message": "Book deleted successfully."
}
```

---

## **Borrowing APIs**

### **7. Borrow a Book**
**Endpoint:** `POST /borrowers/:id/borrow`  
**Purpose:** Allows borrowers to borrow a book.  
**Who can access:** `borrower`.

**Request:**
```json
POST /borrowers/12345/borrow
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "bookId": "67890"
}
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The `roleMiddleware` ensures the user has the `borrower` role.
3. The controller:
   - Finds the book and borrower in the database.
   - Checks if there are available copies.
   - Updates the `availableCopies` field and adds the book to the borrower's `borrowedBooks` list.

**Response:**
```json
{
  "message": "Book borrowed successfully.",
  "book": {
    "id": "67890",
    "title": "The Great Gatsby",
    "availableCopies": 4
  },
  "borrower": {
    "id": "12345",
    "name": "John Doe",
    "borrowedBooks": ["67890"]
  }
}
```

---

### **8. Return a Book**
**Endpoint:** `POST /borrowers/:id/return`  
**Purpose:** Allows borrowers to return a borrowed book.  
**Who can access:** `borrower`.

**Request:**
```json
POST /borrowers/12345/return
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "bookId": "67890"
}
```

**How it works:**
1. The `authMiddleware` verifies the JWT token.
2. The `roleMiddleware` ensures the user has the `borrower` role.
3. The controller:
   - Finds the book and borrower in the database.
   - Updates the `availableCopies` field and removes the book from the borrower's `borrowedBooks` list.

**Response:**
```json
{
  "message": "Book returned successfully.",
  "book": {
    "id": "67890",
    "title": "The Great Gatsby",
    "availableCopies": 5
  },
  "borrower": {
    "id": "12345",
    "name": "John Doe",
    "borrowedBooks": []
  }
}
```

---

This document provides a comprehensive guide to implementing the Role-Based Library Management System. Each API flow is explained with its purpose, working, and example requests/responses.



{
    "message": "User registered successfully",
    "response": {
        "name": "arshmujawar17@gmail.com",
        "password": "pass@123",
        "role": "admin",
        "_id": "698da139f76e8ea916677de2",
        "userCreatedAt": "2026-02-12T09:45:29.021Z",
        "__v": 0
    }
}