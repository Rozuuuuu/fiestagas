import { NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'
import { Product } from '@/types/product'

const DB_PATH = path.join(process.cwd(), 'data', 'products.json')

// Ensure the data directory exists
async function ensureDirectory() {
  const dir = path.dirname(DB_PATH)
  try {
    await mkdir(dir, { recursive: true })
  } catch (error) {
    // Directory already exists or cannot be created
    console.error('Directory error:', error)
  }
}

// Initialize products.json if it doesn't exist
async function initializeProducts() {
  try {
    await readFile(DB_PATH, 'utf8')
  } catch (error) {
    await writeFile(DB_PATH, JSON.stringify({ products: [] }, null, 2))
  }
}

export async function GET() {
  try {
    const data = await readFile(DB_PATH, 'utf8')
    const { products } = JSON.parse(data)
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await ensureDirectory()
    const productData = await req.json()
    
    let products = []
    try {
      const data = await readFile(DB_PATH, 'utf8')
      const jsonData = JSON.parse(data)
      products = jsonData.products || []
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      products = []
    }
    
    const newProduct = {
      id: products.length + 1,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    products.push(newProduct)
    await writeFile(DB_PATH, JSON.stringify({ products }, null, 2))
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    )
  }
}
