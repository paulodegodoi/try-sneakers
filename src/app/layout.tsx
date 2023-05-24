import { Header } from "@/components/Header"
import "../styles/globals.css"
import { ReactNode } from "react"
import { Roboto } from "next/font/google"
const roboto = Roboto({
	subsets: ["latin"],
	weight: "400",
})

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-br">
			<body className={`${roboto.className} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	)
}
