import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const DB_PATH = path.join(process.cwd(), 'data', 'users.json')
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-secret-key'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read users
    const data = await readFile(DB_PATH, 'utf8')
    const users = JSON.parse(data)

    // Find user
    const user = users.find((u: any) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Return token and user data
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      user: userWithoutPassword,
      token
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
