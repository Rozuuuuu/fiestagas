'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const productSlides = [
  {
    title: "Fiesta Gas 11kg Cylinder",
    description: "Perfect for household and commercial use",
    image: "/images/11kg.png",
    price: "₱1,080.00"
  },
  {
    title: "Fiesta Gas 5kg Cylinder",
    description: "Ideal for small families and apartments",
    image: "/images/5kg.png",
    price: "₱499.00"
  },
  {
    title: "Fiesta Gas 2.7kg Cylinder",
    description: "Compact and portable solution",
    image: "/images/2.7kg.png",
    price: "₱299.00"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false)

  useEffect(() => {
    // Only scroll once after 5 seconds from page load
    const scrollTimer = setTimeout(() => {
      if (!hasScrolledOnce) {
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        })
        setHasScrolledOnce(true)
      }
    }, 5000)

    // Auto change slides every 5 seconds
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length)
    }, 5000)

    return () => {
      clearTimeout(scrollTimer)
      clearInterval(slideTimer)
    }
  }, [hasScrolledOnce])

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={() => {}} />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center -mt-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-600 to-blue-800" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center px-4 relative z-10 text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">Welcome to Fiesta Gas, Talibon</h1>
          <p className="text-xl md:text-2xl mb-8">Your trusted partner for safe and reliable LPG solutions</p>
          <Link href="/products" className="transform transition-transform duration-200 hover:scale-105">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-800 hover:text-white transition-colors">
              Explore Products
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Product Slideshow Section */}
      <section className="py-20 bg-gray-50 overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Featured Products</h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-lg shadow-md overflow-hidden mx-auto max-w-2xl"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="relative w-full md:w-1/2 h-[300px]">
                    <Image
                      src={productSlides[currentSlide].image}
                      alt={productSlides[currentSlide].title}
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                  <div className="p-8 md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">{productSlides[currentSlide].title}</h3>
                    <p className="text-gray-600 mb-4">{productSlides[currentSlide].description}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-6">{productSlides[currentSlide].price}</p>
                    <Link href="/products">
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-800">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {productSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-blue-200 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery within the service area</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-gray-600">All products meet safety standards</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices and regular deals</p>
            </motion.div>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  )
}



