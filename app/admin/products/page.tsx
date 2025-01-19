'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2, Plus, X, Check, Search } from 'lucide-react'
import { Product } from '@/types/product'
import { Select } from '@/components/ui/select'
import Image from 'next/legacy/image'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stockQuantity: ''
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stockQuantity: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      // Create a local blob URL for preview
      const localPreview = URL.createObjectURL(file)
      setImagePreview(localPreview)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (!selectedImage) {
        throw new Error('Please select an image')
      }

      // Upload image first
      const imageFormData = new FormData()
      imageFormData.append('file', selectedImage)
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData,
      })
      
      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json()
        throw new Error(uploadError.error || 'Failed to upload image')
      }
      
      const { url: imageUrl } = await uploadResponse.json()

      // Create product data
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description.trim(),
        stockQuantity: parseInt(formData.stockQuantity),
        image: imageUrl,
      }

      // Validate data
      if (!productData.name || !productData.price || !productData.category) {
        throw new Error('Please fill in all required fields')
      }

      console.log('Sending product data:', productData) // Debug log

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create product')
      }

      const newProduct = await response.json()
      console.log('Product created:', newProduct) // Debug log

      // Reset form and refresh
      await fetchProducts()
      setShowAddForm(false)
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        stockQuantity: ''
      })
      setSelectedImage(null)
      setImagePreview('')
    } catch (error) {
      console.error('Error details:', error)
      alert(error instanceof Error ? error.message : 'Failed to add product')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      stockQuantity: product.stockQuantity.toString()
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({
      name: '',
      price: '',
      category: '',
      description: '',
      stockQuantity: ''
    })
  }

  const handleSaveEdit = async (id: number) => {
    try {
      const productData = {
        name: editForm.name.trim(),
        price: parseFloat(editForm.price),
        category: editForm.category,
        description: editForm.description.trim(),
        stockQuantity: parseInt(editForm.stockQuantity)
      }

      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      await fetchProducts()
      setEditingId(null)
      setEditForm({
        name: '',
        price: '',
        category: '',
        description: '',
        stockQuantity: ''
      })
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
    }
  }

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    const matchesCategory = filterCategory
      ? product.category === filterCategory
      : true
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Add search and filter controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded w-full md:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {editingId === product.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    />
                  ) : (
                    `₱${product.price.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full p-2 border rounded"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    product.category
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editForm.stockQuantity}
                      onChange={(e) => setEditForm({ ...editForm, stockQuantity: e.target.value })}
                    />
                  ) : (
                    product.stockQuantity
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingId === product.id ? (
                      <>
                        <Button
                          onClick={() => handleSaveEdit(product.id)}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEdit(product)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
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
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No products found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}
