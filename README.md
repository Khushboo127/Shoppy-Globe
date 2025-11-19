# ShoppyGlobe - E-Commerce Application

A modern, fully-functional e-commerce application built with React, Redux, and React Router. Features product browsing by category, shopping cart management, and checkout functionality.

## GitHub Repository

**Repository Link:** https://github.com/Khushboo127/Shoppy-Globe.git

## Features

### Core Functionality
- **6 Product Categories**: Makeup, Clothes, Shoes, Electronics, Home Decor, Groceries, Jewellery
- **Product Browsing**: View all products or filter by category
- **Shopping Cart**: Add/remove items, adjust quantities
- **Product Details**: Detailed product information page with full description
- **Search Functionality**: Real-time product search using Redux state
- **Checkout**: Customer information form with order summary
- **Price Currency**: All prices displayed in Indian Rupees (₹)

### Technical Features
- Custom `useProducts` hook for API data fetching
- Redux for state management (cart, search)
- React Router v6 with dynamic routing
- Lazy loading with React.lazy() and Suspense
- Error handling for failed requests
- Responsive design (mobile, tablet, desktop)
- Local storage persistence for cart

## Project Structure

shoppy-globe/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductItem.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategorySection.jsx
│   │   ├── CategoryIcons.jsx
│   │   ├── Cart/
│   │   │   ├── Cart.jsx
│   │   │   └── CartItem.jsx
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   └── useProducts.js
│   ├── data/
│   │   └── dummyProducts.js
│   ├── redux/
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   └── searchSlice.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── header.css
│   │   ├── product-list.css
│   │   ├── product-item.css
│   │   ├── cart.css
│   │   ├── checkout.css
│   │   └── ... (other CSS files)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Local Setup

1. **Clone the repository:**
  
   git clone https://github.com/Khushboo127/Shoppy-Globe.git
   cd shoppy-globe
  

2. **Install dependencies:**
  
   npm install
   

3. **Start development server:**
  
   npm run dev
 

4. **Open in browser:**
   - The app will open at `http://localhost:5173`
   - If it doesn't open automatically, navigate to that URL


This creates an optimized production build in the `dist` folder.

## How to Use

1. **Browse Products**: View products by category on the home page
2. **Search**: Use the search bar to find specific products
3. **View Details**: Click on any product to see full details
4. **Add to Cart**: Click "Add to Cart" button to add items
5. **Manage Cart**: View cart, adjust quantities, remove items
6. **Checkout**: Fill in your details and place order
7. **Completion**: Get order confirmation and auto-redirect to home

## Categories Available

- **Makeup**: Cosmetics and beauty products
- **Clothes**: Fashion and apparel
- **Shoes**: Footwear collection
- **Electronics**: Tech gadgets and devices
- **Home Decor**: Interior design items
- **Groceries**: Food and grocery items
- **Jewellery**: Jewelry and accessories

## Technologies Used

- **Frontend**: React
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS3 with modern features
- **Data**: Dummy product database

## Key Implementation Details

### Custom Hook: useProducts
Fetches product data with error handling and loading states.

### Redux Slices
- **cartSlice**: Manages add, remove, update, and clear cart actions
- **searchSlice**: Manages search query and filtered products

### Lazy Loading
All route components use React.lazy() with Suspense for code splitting.

### Responsive Design
Mobile-first approach with breakpoints at 1024px, 768px, and 480px.


## Performance Optimizations

- Code splitting with lazy loading
- Image lazy loading
- Optimized re-renders with Redux selectors
- CSS minification in production build
- Efficient component composition

## Future Enhancements

- Add payment gateway integration (Stripe)
- User authentication and profiles
- Order history and tracking
- Product reviews and ratings
- Wishlist functionality
- Advanced filtering options

## Troubleshooting

### Images not loading
- Check internet connection
- Verify image URLs are accessible
- Clear browser cache and reload

### Cart not persisting
- Enable localStorage in browser
- Check Redux store initialization
- Verify Redux DevTools integration






