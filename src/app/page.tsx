import { stripe } from "@/lib/stripe"
import { GetServerSideProps, GetStaticProps } from "next"
import Stripe from "stripe"

export const metadata = {
	title: "Home Page",
}

interface HomeProps {
	products: {
		id: string
		name: string
		imageUrl: string
		price: string
	}[]
}

async function getData() {
	const response = await stripe.products.list({
		active: true,
		expand: ["data.default_price"],
	})

	const products = response.data.map((product) => {
		const price = product.default_price as Stripe.Price
		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
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
			{data.map((p) => {
				return (
					<div key={p.id}>
						<img src={p.imageUrl} />
						<p>{p.name}</p>
						<p>{p.price}</p>
					</div>
				)
			})}
		</>
	)
}

export const getStaticProps: GetServerSideProps = async () => {
	const response = await stripe.products.list({
		expand: ["data.default_price"],
	})

	console.log(response.data)

	const products = response.data.map((product) => {
		const price = product.default_price as Stripe.Price
		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(price.unit_amount! / 100),
		}
	})

	return {
		props: {
			products,
		},
		revalidate: 60 * 60 * 2, // 2 hours
	}
}
