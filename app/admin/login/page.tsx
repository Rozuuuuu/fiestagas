'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('from') || '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (credentials.email === 'fiestagas123@gmail.com' && credentials.password === '1234567890') {
        // Set both localStorage and cookie
        localStorage.setItem('isAdmin', 'true')
        Cookies.set('isAdmin', 'true', { expires: 7 }) // Expires in 7 days
        
        // Small delay to ensure storage is set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Redirect to the original destination or admin dashboard
        router.push(redirectTo)
        router.refresh()
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Login</h1>
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              disabled={loading}
              placeholder="fiestagas123@gmail.com"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              disabled={loading}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
