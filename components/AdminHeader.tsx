'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Cookies from 'js-cookie'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    Cookies.remove('isAdmin')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-white shadow-md">
      <div className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}
