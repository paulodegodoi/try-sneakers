export function Header() {
  return (
    <header className="flex justify-between py-5 sticky">
      <h2>Logo</h2>
      <nav>
        <ul className="flex gap-3">
          <li>Conta</li>
          <li>Carrinho</li>
        </ul>
      </nav>
    </header>
  )
}
