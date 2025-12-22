ShoppyGlobe – MERN E-Commerce Application

A full-stack e-commerce project built using Node.js, Express, MongoDB, React, Redux, JWT Authentication, and REST APIs.
This project includes product listing, user authentication, cart management, order creation, and MongoDB storage.

##Live Project :- https://shoppy-globe-frontend.onrender.com
✨ Features
🔐 Authentication

User Registration & Login
JWT-based authentication
Protected cart & order routes

🛒 Cart & Orders

Add to Cart
Update cart quantity
Remove item

Clear cart after order
Place order with full detail form

🛍️ Products

Product list fetched from MongoDB
Product details page
Dummy seed script for initial data

🧩 Frontend

Built using React + Redux Toolkit
Fully connected with backend
Uses token from localStorage
Login / Logout implemented


🚀 Tech Stack
Frontend
React.js
React Router
Redux Toolkit (Cart State)
Axios
CSS (Custom UI Components)
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
REST API Architecture


📂 Project Structure
shoppy-globe/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
🔧 1. Clone the Repository
git clone https://github.com/Khushboo127/Shoppy-Globe
cd shoppy-globe

📌 Backend Setup
Navigate to backend folder:
cd backend

Install dependencies:
npm install

Add .env file:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Seed the product database:
node seedProducts.js

Start backend:
npm run dev


Backend runs at:

http://localhost:5000

🖥️ Frontend Setup
Navigate to frontend:
cd frontend

Install dependencies:
npm install

Start frontend:
npm run dev


Frontend runs at:

http://localhost:5173

🧪 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Create new user
POST	/api/auth/login	Login user & get JWT
🛒 Cart
Method	Endpoint	Description
GET	/api/cart	Get user cart
POST	/api/cart	Add item to cart
PUT	/api/cart/:id	Update item quantity
DELETE	/api/cart/:id	Remove item
📦 Orders
Method	Endpoint	Description
POST	/api/orders	Place order

Screenshot of thunderClient , MongoDb , And Website look Added a pdf in this folder
