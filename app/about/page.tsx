'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  const router = useRouter()

  const handleSearch = (term: string) => {
    if (term) {
      router.push(`/products?search=${encodeURIComponent(term)}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-600 text-white py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">About Fiesta Gas Talibon</h1>
            <p className="text-xl max-w-2xl mx-auto">Your trusted LPG provider in Talibon, Bohol since 2015</p>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Fiesta Gas Talibon started with a vision to provide safe and reliable LPG solutions to the local community. Over the years, we have grown to become one of the most trusted LPG providers in the region.
              </p>
              <p className="text-gray-600">
                Our commitment to safety, quality service, and customer satisfaction has helped us build lasting relationships with households and businesses across Talibon and neighboring areas.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 py-16"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To provide safe, reliable, and efficient LPG solutions while ensuring excellent customer service and promoting responsible energy consumption.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  To be the leading LPG provider in Bohol, recognized for our commitment to safety, quality, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-600 mb-8">Visit Us</h2>
              <p className="text-xl text-gray-600 mb-4">Fiesta Gas Talibon</p>
              <p className="text-gray-600 mb-2">San Jose Street, Talibon, Bohol</p>
              <p className="text-gray-600 mb-2">Phone: (123) 456-7890</p>
              <p className="text-gray-600">Email: info@fiestagastalibon.com</p>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}
