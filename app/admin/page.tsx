'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const { user } = useAuth()
  const router = useRouter()

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setEditForm({ name: user.name, email: user.email })
  }

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      
      if (response.ok) {
        fetchUsers()
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/admin/users/${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          fetchUsers()
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      
      if (response.ok) {
        fetchUsers()
        setShowAddForm(false)
        setNewUser({ name: '', email: '', password: '' })
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Database Management</h1>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {showAddForm && (
            <div className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New User</h3>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  <Check className="w-4 h-4 mr-2" /> Save User
                </Button>
              </form>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <Input
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {editingId === user.id ? (
                        <>
                          <Button
                            onClick={() => handleSaveEdit(user.id)}
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => setEditingId(null)}
                            variant="ghost"
                            size="sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleEdit(user)}
                            variant="ghost"
                            size="sm"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(user.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  )
}
