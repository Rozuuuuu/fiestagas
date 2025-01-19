'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductList from '@/components/ProductList'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  
  useEffect(() => {
    const search = searchParams.get('search')
    const categoryParam = searchParams.get('category')
    if (search) setSearchTerm(search)
    if (categoryParam) setCategory(categoryParam)
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchTerm} />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {category && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </motion.div>
        )}
        <h1 className="text-4xl font-bold mb-8 font-poppins text-blue-600">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Our Products'}
        </h1>
        <ProductList searchTerm={searchTerm} categoryFilter={category} />
      </main>
      <Footer />
    </div>
  )
}
