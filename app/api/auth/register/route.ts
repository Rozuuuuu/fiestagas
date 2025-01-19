import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const DB_PATH = path.join(process.cwd(), 'data', 'users.json')

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read existing users
    let users = []
    try {
      const data = await readFile(DB_PATH, 'utf8')
      users = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      await writeFile(DB_PATH, '[]')
    }

    // Check if user already exists
    if (users.some((user: any) => user.email === email)) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }

    // Add to users array and save
    users.push(newUser)
    await writeFile(DB_PATH, JSON.stringify(users, null, 2))

    // Return success without password
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
