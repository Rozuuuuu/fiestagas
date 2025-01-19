'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import AdminHeader from '@/components/AdminHeader'
import { 
  LayersIcon, 
  PackageIcon, 
  UsersIcon, 
  ShoppingCartIcon, 
  Settings2Icon,
  MenuIcon,
  XIcon
} from 'lucide-react'

const sidebarItems = [
  { name: 'Categories', href: '/admin/categories', icon: LayersIcon },
  { name: 'Products', href: '/admin/products', icon: PackageIcon },
  { name: 'Customers', href: '/admin/customers', icon: UsersIcon },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon },
  { name: 'Users', href: '/admin/users', icon: Settings2Icon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (!isAdmin && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [pathname, router])

  // Don't show admin layout on login page
  if (pathname === '/admin/login') {
    return children
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-blue-600 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}>
          <div className="h-full px-3 py-4 overflow-y-auto bg-blue-600">
            <Link href="/admin" className="flex items-center mb-8 p-2">
              <span className="text-2xl font-semibold text-white">Admin Panel</span>
            </Link>
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors
                        ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100'}
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-8 mt-16">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
