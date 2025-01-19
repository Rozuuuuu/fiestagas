import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

async function ensureUploadsDirectory() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    console.error('Upload directory error:', error)
  }
  return uploadDir
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const uploadDir = await ensureUploadsDirectory()
    
    // Create a safe filename
    const ext = path.extname(file.name)
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`
    const filePath = path.join(uploadDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return the public URL
    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
