import { NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'categories.json')

// Ensure the data directory exists
async function ensureDirectory() {
  const dir = path.join(process.cwd(), 'data')
  try {
    await mkdir(dir, { recursive: true })
  } catch (error) {
    // Directory already exists or cannot be created
    console.error('Directory error:', error)
  }
}

// Get all categories
export async function GET() {
  try {
    await ensureDirectory()
    let categories
    try {
      const data = await readFile(DB_PATH, 'utf8')
      categories = JSON.parse(data)
    } catch (error) {
      // If file doesn't exist or is invalid, create default categories
      categories = [
        { id: 1, name: 'Cylinders', slug: 'cylinders' },
        { id: 2, name: 'Accessories', slug: 'accessories' },
        { id: 3, name: 'Appliances', slug: 'appliances' },
        { id: 4, name: 'Safety', slug: 'safety' },
      ]
      await writeFile(DB_PATH, JSON.stringify(categories, null, 2))
    }
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Categories GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// Add new category
export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    const data = await readFile(DB_PATH, 'utf8')
    const categories = JSON.parse(data)
    
    const newCategory = {
      id: categories.length + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    }
    
    categories.push(newCategory)
    await writeFile(DB_PATH, JSON.stringify(categories, null, 2))
    
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
