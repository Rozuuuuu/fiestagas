import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'products.json')

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readFile(DB_PATH, 'utf8')
    const { products } = JSON.parse(data)
    
    const product = products.find((p: any) => p.id === Number(params.id))
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productData = await req.json()
    const data = await readFile(DB_PATH, 'utf8')
    const { products } = JSON.parse(data)
    
    const index = products.findIndex((p: any) => p.id === Number(params.id))
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    products[index] = {
      ...products[index],
      ...productData,
      updatedAt: new Date().toISOString()
    }
    
    await writeFile(DB_PATH, JSON.stringify({ products }, null, 2))
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readFile(DB_PATH, 'utf8')
    let { products } = JSON.parse(data)
    
    products = products.filter((p: any) => p.id !== Number(params.id))
    await writeFile(DB_PATH, JSON.stringify({ products }, null, 2))
    
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
