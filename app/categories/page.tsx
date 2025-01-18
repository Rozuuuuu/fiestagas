'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = ['Cylinders', 'Accessories', 'Appliances', 'Safety']

export default function Categories() {
  const router = useRouter()

  const handleSearch = (term: string) => {
    if (term) {
      router.push(`/products?search=${encodeURIComponent(term)}`)
    }
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
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/products?category=${category.toLowerCase()}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold font-poppins text-blue-600">{category}</h2>
                <p className="mt-2 text-gray-600">Explore our {category.toLowerCase()} collection</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

