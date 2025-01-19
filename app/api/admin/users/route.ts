import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const DB_PATH = path.join(process.cwd(), 'data', 'users.json')

// Get all users
export async function GET() {
  try {
    const data = await readFile(DB_PATH, 'utf8')
    const users = JSON.parse(data)
    const sanitizedUsers = users.map((user: any) => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })
    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add new user
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const data = await readFile(DB_PATH, 'utf8')
    const users = JSON.parse(data)
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    await writeFile(DB_PATH, JSON.stringify(users, null, 2))
    
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
