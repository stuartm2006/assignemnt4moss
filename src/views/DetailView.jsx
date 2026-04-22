import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'

export default function DetailView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, deleteItem } = useContext(ItemsContext)
  const item = items.find(i => i.id === id)

  if (!item) {
    return (
      <div>
        <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
        <div className="alert alert-danger">Book not found.</div>
      </div>
    )
  }

  function handleDelete() {
    deleteItem(item.id)
    navigate('/list')
  }

  return (
    <div>
      <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
      <div className="card" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h3 className="card-title">{item.name}</h3>
          <span className="badge bg-secondary mb-3">{item.category}</span>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Rating:</strong> {item.rating}/5</p>
          {item.description && <p><strong>Description:</strong> {item.description}</p>}
        </div>
        <div className="card-footer d-flex gap-2">
          <Link className="btn btn-primary" to={`/edit/${item.id}`}>Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}
