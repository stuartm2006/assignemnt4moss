import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { ItemsContext } from '../context/ItemsContext'

export default function CreateEditView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, addItem, updateItem } = useContext(ItemsContext)
  const [saved, setSaved] = useState(false)

  const existing = id ? items.find(i => i.id === id) : null

  if (id && !existing) {
    return <div className="alert alert-danger">Item not found.</div>
  }

  function handleSave(data) {
    if (id) {
      updateItem(id, data)
    } else {
      addItem(data)
    }
    setSaved(true)
    navigate('/list')
  }

  return (
    <div>
      <h2 className="h5 mb-3">{id ? 'Edit Book' : 'Add Book'}</h2>
      {saved && <div className="alert alert-success">Saved!</div>}
      <ItemForm
        initial={existing || undefined}
        onSave={handleSave}
        onCancel={id ? () => navigate(-1) : undefined}
      />
    </div>
  )
}
