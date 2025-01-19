import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'users.json')

// Update user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email } = await req.json()
    const data = await readFile(DB_PATH, 'utf8')
    let users = JSON.parse(data)
    
    const userIndex = users.findIndex((u: any) => u.id === Number(params.id))
    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    users[userIndex] = { ...users[userIndex], name, email }
    await writeFile(DB_PATH, JSON.stringify(users, null, 2))
    
    const { password, ...userWithoutPassword } = users[userIndex]
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readFile(DB_PATH, 'utf8')
    let users = JSON.parse(data)
    
    users = users.filter((u: any) => u.id !== Number(params.id))
    await writeFile(DB_PATH, JSON.stringify(users, null, 2))
    
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
