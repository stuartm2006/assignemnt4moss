import React, { useContext } from 'react'
import ItemCard from '../components/ItemCard'
import { ItemsContext } from '../context/ItemsContext'

export default function ListView() {
  const ctx = useContext(ItemsContext)
  const {
    derived, items, categories,
    search, setSearch,
    category, setCategory,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    sortKey, setSortKey,
    sortDir, setSortDir,
    deleteItem
  } = ctx

  return (
    <div>
      <div className="row g-2 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label">Search</label>
          <input
            className="form-control"
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Category</label>
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Min Price</label>
          <input
            className="form-control"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Max Price</label>
          <input
            className="form-control"
            type="number"
            placeholder="Any"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Sort By</label>
          <select className="form-select" value={sortKey} onChange={e => setSortKey(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="col-md-1">
          <label className="form-label">Dir</label>
          <select className="form-select" value={sortDir} onChange={e => setSortDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {items.length === 0 && (
        <div className="alert alert-info">No books yet. <a href="#/new">Add one!</a></div>
      )}

      {items.length > 0 && derived.length === 0 && (
        <div className="alert alert-warning">No results match your filters.</div>
      )}

      <div className="row g-3">
        {derived.map(item => (
          <div key={item.id} className="col-md-4">
            <ItemCard item={item} onDelete={deleteItem} />
          </div>
        ))}
      </div>
    </div>
  )
}
