import { stripe } from '@/lib/stripe'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

export const metadata = {
  title: 'Home | Try Tennis',
}

async function getData() {
  const response = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return products
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <h1>Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((p) => {
          return (
            <Link
              href={`/product/${p.id}`}
              key={p.id}
              className="relative flex-1 w-[300px] h-[400px] cursor-pointer"
            >
              <div className="overflow-hidden rounded border mb-2">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="hover:scale-110 duration-75"
                />
              </div>
              <div className="flex justify-between items-end">
                <p className="font-bold text-lg">{p.name}</p>
                <p className="text-sm">{p.price}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}