'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header({ onSearch }: { onSearch: (term: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (pathname === '/products') {
      // If on products page, use the search functionality
      onSearch(value)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pathname !== '/products' && searchTerm) {
      // If not on products page, redirect with search term
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
      setIsMenuOpen(false)
    }
  }

  const navItems = ['Home', 'Products', 'Categories', 'About', 'Contact']

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled ? 'bg-white text-blue-600 shadow-md' : 'bg-blue-600 text-white'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/images/logo.png"
              alt="Fiesta Gas Logo" 
              width={30} 
              height={30}
              className="rounded-full"
            />
            <span className={`text-2xl font-bold font-poppins transition-colors duration-300 ${
              isScrolled ? 'hover:text-blue-800' : 'hover:text-blue-200'
            }`}>Fiesta Gas</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`font-medium transition-colors duration-300 ${
                  isScrolled ? 'hover:text-blue-800' : 'hover:text-blue-200'
                }`}
              >
                {item}
              </Link>
            ))}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`pl-10 pr-4 py-2 rounded-full transition-colors duration-300 ${
                  isScrolled ? 'bg-gray-100 text-blue-600' : 'bg-blue-500 text-white placeholder-blue-200'
                }`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            </form>
            <button className={`p-2 rounded-full transition-colors duration-300 ${
              isScrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-blue-100'
            }`}>
              <ShoppingCart className="w-6 h-6" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={`pl-10 pr-4 py-2 rounded-full transition-colors duration-300 w-full ${
                    isScrolled ? 'bg-gray-100 text-blue-600' : 'bg-blue-500 text-white placeholder-blue-200'
                  }`}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
              </form>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`font-medium transition-colors duration-300 ${
                      isScrolled ? 'hover:text-blue-800' : 'hover:text-blue-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <button className={`p-2 rounded-full transition-colors duration-300 flex items-center justify-center ${
                  isScrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-blue-100'
                }`}>
                  <ShoppingCart className="w-6 h-6" />
                  <span className="ml-2">Cart</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

