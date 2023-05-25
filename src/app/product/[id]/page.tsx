import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { Metadata, ResolvingMetadata } from 'next'
import { BuyContainer } from '@/components/BuyContainer'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const { product } = await getProduct(id)

  return {
    title: `${product.name} | Try Sneakers`,
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
      metadata: product.metadata,
    },
  }
}

export default async function Product({ params }: Props) {
  const { product } = await getProduct(params.id)
  const { id, name, imageUrl, price, description, metadata, defaultPriceId } =
    product

  let sizes = null
  if (metadata.sizes != undefined) {
    sizes = metadata.sizes.split(',')
  }

  return (
    <div
      key={id}
      className="flex flex-col items-center md:flex-row md:justify-between gap-4"
    >
      <div className="w-[300px] md:w-auto">
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
          content="cover"
          className="rounded"
        />
      </div>

      <div className="flex flex-col max-w-[400px] items-center gap-2">
        <p className="font-bold text-2xl">{name}</p>
        <p className="text-lg">{price}</p>
        <p className="text-sm text-justify">{description}</p>
        <div className="flex flex-col flex-wrap gap-2">
          {sizes && <BuyContainer sizes={sizes} />}
        </div>
      </div>
    </div>
  )
}
