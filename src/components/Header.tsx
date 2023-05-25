import { HeaderLinks } from './HeaderLinks'
import Logo from '../app/icon.png'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex justify-between items-center py-3 mb-5 sticky">
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
