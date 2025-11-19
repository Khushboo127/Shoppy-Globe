// NotFound page - 404 error page
import React from 'react'
import { useRouteError, Link } from 'react-router-dom'
import '../styles/not-found.css'

export default function NotFound() {
    const error = useRouteError()

    return (
        <div className="not-found">
            <div className="error-container">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page Not Found</h2>
                <p className="error-message">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <div className="error-details">
                    {error?.statusText && <p>Error: {error.statusText}</p>}
                    {error?.message && <p>Details: {error.message}</p>}
                </div>
                <Link to="/" className="back-home-btn">
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}
