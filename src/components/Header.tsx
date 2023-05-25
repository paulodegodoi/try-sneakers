import { HeaderLinks } from './HeaderLinks'
import Logo from '../../public/try sneakers.png'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex justify-between items-center py-2 sticky">
      <Link href="/">
        <Image
          src={Logo}
          alt="logo"
          width={45}
          height={45}
          className="rounded-full"
        />
      </Link>
      <HeaderLinks />
    </header>
  )
}
