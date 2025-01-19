'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/legacy/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types/product'
import { ArrowLeft } from 'lucide-react'

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/admin/products/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={() => {}} />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={() => {}} />
        <div className="flex-grow flex items-center justify-center">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={() => {}} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8 mt-20"
      >
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-[400px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-4xl font-bold text-blue-600 mb-6">
                ₱{product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-sm text-gray-500 mb-6">
                Stock Available: {product.stockQuantity}
              </p>
              <Button 
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={product.stockQuantity === 0}
              >
                {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}
