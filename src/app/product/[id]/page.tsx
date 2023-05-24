import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { Metadata, ResolvingMetadata } from 'next'

export const metadata = {
  title: 'title',
}

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const { product } = await getProduct(id)

  return {
    title: `${product.name} | Try Tennis`,
  }
}

async function getProduct(productId: string) {
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    product: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      description: product.description,
      defaultPriceId: price.id,
    },
  }
}

export default async function Product({ params }: Props) {
  const { product } = await getProduct(params.id)
  const { id, name, imageUrl, price, defaultPriceId } = product

  return (
    <div key={id}>
      <div className="">
        <Image
          src={imageUrl}
          alt={name}
          width={600}
          height={600}
          sizes="100vw"
          className="rounded"
        />
      </div>
      <div className="flex justify-between items-end">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-sm">{price}</p>
      </div>
    </div>
  )
}
