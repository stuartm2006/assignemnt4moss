import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ItemCard({ item, onDelete }) {
  const navigate = useNavigate()
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <span className="badge bg-secondary mb-2">{item.category}</span>
        <p className="card-text mb-1"><strong>Price:</strong> ${item.price}</p>
        <p className="card-text mb-1"><strong>Rating:</strong> {item.rating}/5</p>
        {item.description && <p className="card-text text-muted small">{item.description}</p>}
      </div>
      <div className="card-footer d-flex justify-content-end gap-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate(`/item/${item.id}`)}>View</button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </div>
  )
}
