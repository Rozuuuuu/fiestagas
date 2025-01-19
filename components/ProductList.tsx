'use client'

import { useEffect, useState } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'

interface ProductListProps {
  searchTerm?: string
  categoryFilter?: string
}

export default function ProductList({ searchTerm, categoryFilter }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    const matchesCategory = categoryFilter
      ? product.category.toLowerCase() === categoryFilter.toLowerCase()
      : true
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div>Loading products...</div>
  }

  if (filteredProducts.length === 0) {
    return <div>No products found.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/product/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-blue-600 font-bold">₱{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-2">Stock: {product.stockQuantity}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

