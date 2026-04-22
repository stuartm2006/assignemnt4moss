import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeView() {
  return (
    <div className="p-4 bg-light rounded">
      <h2 className="h4">Welcome to Book Catalog</h2>
      <p>Track your favorite books with ratings and prices.</p>
      <div className="d-flex gap-2">
        <Link className="btn btn-primary" to="/list">Browse Books</Link>
        <Link className="btn btn-outline-primary" to="/new">Add a Book</Link>
      </div>
    </div>
  )
}
