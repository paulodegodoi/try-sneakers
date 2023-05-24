import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Image from "next/image"

interface Props {
	params: {
		id: string
	}
}

async function getProduct(productId: string) {
	const product = await stripe.products.retrieve(productId, {
		expand: ["default_price"],
	})

	const price = product.default_price as Stripe.Price

	return {
		product: {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
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

// export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
// 	const productId = params!.id

// 	const product = await stripe.products.retrieve(productId, {
// 		expand: ["default_price"],
// 	})

// 	const price = product.default_price as Stripe.Price

// 	return {
// 		props: {
// 			product: {
// 				id: product.id,
// 				name: product.name,
// 				imageUrl: product.images[0],
// 				price: new Intl.NumberFormat("pt-BR", {
// 					style: "currency",
// 					currency: "BRL",
// 				}).format(price.unit_amount! / 100),
// 				description: product.description,
// 				defaultPriceId: price.id,
// 			},
// 		},
// 		revalidate: 60 * 60 * 1, // 1 hour
// 	}
// }
