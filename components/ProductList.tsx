import { useState } from 'react'
import ProductCard from './ProductCard'
import { AnimatePresence, motion } from 'framer-motion'

const products = [
  { id: 1, name: 'Fiesta Gas 11kg Cylinder', price: 1080, image: '/images/11kg.png', category: 'Cylinders' },
  { id: 2, name: 'Fiesta Gas 5kg Cylinder', price: 499, image: '/images/5kg.png', category: 'Cylinders' },
  { id: 3, name: 'Fiesta Gas 2.7kg Cylinder', price: 299, image: '/images/2.7kg.png', category: 'Cylinders' },
  { id: 4, name: 'Fiesta Gas Regulator', price: 199, image: '/images/regulator.png', category: 'Accessories' },
  { id: 5, name: 'Fiesta Gas Stove', price: 1299, image: '/images/stove.png', category: 'Appliances' },
  { id: 6, name: 'Fiesta Gas Hose', price: 149, image: '/images/hose.png', category: 'Accessories' },
  { id: 7, name: 'Fiesta Gas Lighter', price: 49, image: '/images/lighter.png', category: 'Accessories' },
  { id: 8, name: 'Fiesta Gas Safety Kit', price: 399, image: '/images/safety-kit.png', category: 'Safety' },
]

interface ProductListProps {
  searchTerm: string;
  categoryFilter?: string;
}

export default function ProductList({ searchTerm, categoryFilter }: ProductListProps) {
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !categoryFilter || 
      product.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <AnimatePresence mode="wait">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500 py-8"
          >
            No products found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

