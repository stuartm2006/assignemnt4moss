import { useEffect, useMemo, useState } from 'react'
const STORAGE_KEY = 'a4_items'

export default function useItems() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('failed to parse saved items', e)
      }
    }
  }, [])

  // persist to localStorage when items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(data) {
    const newItem = { ...data, id: crypto.randomUUID() }
    setItems(prev => [...prev, newItem])
  }

  function updateItem(id, patch) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item))
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const categories = useMemo(() => {
    const cats = items.map(i => i.category).filter(Boolean)
    return [...new Set(cats)]
  }, [items])

  const derived = useMemo(() => {
    let result = [...items]

    if (search) {
      result = result.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        (i.description && i.description.toLowerCase().includes(search.toLowerCase()))
      )
    }

    if (category) {
      result = result.filter(i => i.category === category)
    }

    if (minPrice !== '') {
      result = result.filter(i => Number(i.price) >= Number(minPrice))
    }
    if (maxPrice !== '') {
      result = result.filter(i => Number(i.price) <= Number(maxPrice))
    }

    result.sort((a, b) => {
      let aVal = a[sortKey]
      let bVal = b[sortKey]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [items, search, category, minPrice, maxPrice, sortKey, sortDir])

  return {
    items, setItems,
    search, setSearch,
    category, setCategory,
    sortKey, setSortKey,
    sortDir, setSortDir,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    categories,
    derived,
    addItem, updateItem, deleteItem
  }
}
