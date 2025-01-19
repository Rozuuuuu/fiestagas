'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Category {
  id: number
  name: string
  slug: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ name: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '' })

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setEditForm({ name: category.name })
  }

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      
      if (response.ok) {
        fetchCategories()
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/admin/categories/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          fetchCategories()
        }
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      })
      
      if (response.ok) {
        fetchCategories()
        setShowAddForm(false)
        setNewCategory({ name: '' })
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Category</h3>
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <form onSubmit={handleAddCategory} className="flex gap-4">
            <Input
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ name: e.target.value })}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-4 h-4 mr-2" /> Save
            </Button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ name: e.target.value })}
                    />
                  ) : (
                    category.name
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingId === category.id ? (
                      <>
                        <Button
                          onClick={() => handleSaveEdit(category.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEdit(category)}
                          variant="ghost"
                          size="sm"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(category.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
