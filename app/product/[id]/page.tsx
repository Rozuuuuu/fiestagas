'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  specifications?: Record<string, string>
}

// This would typically come from an API or database
const getProductDetails = (id: string): Product | undefined => {
  const products: Record<string, Product> = {
    '1': {
      id: 1,
      name: 'Fiesta Gas 11kg Cylinder',
      price: 1080,
      image: '/images/11kg.png',
      category: 'Cylinders',
      description: 'Perfect for household and commercial use. This 11kg cylinder provides long-lasting fuel for all your cooking needs.',
      specifications: {
        'Weight': '11kg',
        'Height': '60cm',
        'Diameter': '30cm',
        'Material': 'Steel',
        'Valve Type': 'Standard POL',
      }
    },
    // Add more products as needed
  }
  return products[id]
}

export default function ProductDetails() {
  const params = useParams()
  const [product, setProduct] = useState<Product | undefined>()

  useEffect(() => {
    if (params.id) {
      const productDetails = getProductDetails(params.id as string)
      setProduct(productDetails)
    }
  }, [params.id])

  if (!product) {
    return <div>Loading...</div>
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-[400px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain' }}
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
              
              {product.specifications && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Specifications</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-bold">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}
