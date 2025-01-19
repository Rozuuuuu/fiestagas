import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'categories.json')

// Update category
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await req.json()
    const data = await readFile(DB_PATH, 'utf8')
    const categories = JSON.parse(data)
    
    const categoryIndex = categories.findIndex((c: any) => c.id === Number(params.id))
    if (categoryIndex === -1) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }
    
    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    }
    
    await writeFile(DB_PATH, JSON.stringify(categories, null, 2))
    return NextResponse.json(categories[categoryIndex])
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete category
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readFile(DB_PATH, 'utf8')
    let categories = JSON.parse(data)
    
    categories = categories.filter((c: any) => c.id !== Number(params.id))
    await writeFile(DB_PATH, JSON.stringify(categories, null, 2))
    
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
