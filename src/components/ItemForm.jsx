import React, { useState } from 'react'

const EMPTY = { name: '', category: '', price: '', rating: '', description: '' }

export default function ItemForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.category.trim()) errs.category = 'Category is required.'
    if (form.price === '' || isNaN(Number(form.price)) || Number(form.price) < 0) {
      errs.price = 'Price must be a valid non-negative number.'
    }
    if (form.rating === '' || isNaN(Number(form.rating)) || Number(form.rating) < 0 || Number(form.rating) > 5) {
      errs.rating = 'Rating must be between 0 and 5.'
    }
    return errs
  }

  function handleBlur(field) {
    const errs = validate()
    if (errs[field]) {
      setErrors(prev => ({ ...prev, [field]: errs[field] }))
    } else {
      setErrors(prev => { const copy = { ...prev }; delete copy[field]; return copy })
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSave({ ...form, price: Number(form.price), rating: Number(form.rating) })
  }

  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Name *</label>
        <input
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Category *</label>
        <input
          className={`form-control ${errors.category ? 'is-invalid' : ''}`}
          name="category"
          value={form.category}
          onChange={handleChange}
          onBlur={() => handleBlur('category')}
        />
        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Price *</label>
        <input
          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          onBlur={() => handleBlur('price')}
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Rating (0–5) *</label>
        <input
          className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={form.rating}
          onChange={handleChange}
          onBlur={() => handleBlur('rating')}
        />
        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {onCancel && <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
