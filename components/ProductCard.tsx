import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      layout
      className="w-full flex justify-center"
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 w-[300px] h-[400px] flex flex-col hover:scale-105 transform transition-all">
          <CardHeader className="h-[80px] flex items-center justify-center p-4">
            <CardTitle className="font-poppins text-xl text-center line-clamp-2">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="relative w-full h-[180px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className="mt-4 text-2xl font-bold font-poppins text-blue-600">₱{product.price.toFixed(2)}</p>
            <Badge className="mt-2">{product.category}</Badge>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-800 hover:text-white transition-colors">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

