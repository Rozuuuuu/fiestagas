'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'  // Make sure this path is correct
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
    // Show success message
    alert('Message sent successfully!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={(term) => router.push(`/products?search=${term}`)} />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-600 text-white py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">Get in touch with us for any inquiries or assistance</p>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Contact Information</h2>
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col items-center space-y-2">
                    <MapPin className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-600 text-center">San Jose Street, Talibon, Bohol</p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <Phone className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <Mail className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">info@fiestagastalibon.com</p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <Clock className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <div className="text-center">
                      <p className="text-gray-600">Monday - Saturday: 8AM - 5PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Service Box */}
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="font-semibold text-xl mb-4 text-center text-blue-600">Emergency Service</h3>
                <p className="text-gray-600 text-center">
                  For emergency LPG-related concerns, please contact our 24/7 hotline:
                  <br />
                  <span className="font-semibold text-blue-600 text-xl mt-2 block">(123) 555-0000</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
