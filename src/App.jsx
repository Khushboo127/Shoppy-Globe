// Main App component with routing
import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))

// Fallback component for lazy loading
const LazyFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="spinner">Loading...</div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'product/:id',
        element: <Suspense fallback={<LazyFallback />}><ProductDetail /></Suspense>
      },
      {
        path: 'cart',
        element: <Suspense fallback={<LazyFallback />}><Cart /></Suspense>
      },
      {
        path: 'checkout',
        element: <Suspense fallback={<LazyFallback />}><Checkout /></Suspense>
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
