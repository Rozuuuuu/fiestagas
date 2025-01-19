'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Category {
  id: number
  name: string
  slug: string
}

export default function Categories() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = (term: string) => {
    if (term) {
      router.push(`/products?search=${encodeURIComponent(term)}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading categories...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8 flex flex-col mt-20"
      >
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 font-poppins text-blue-600 text-center">Product Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold font-poppins text-blue-600">{category.name}</h2>
                <p className="mt-2 text-gray-600">Explore our {category.name.toLowerCase()} collection</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

