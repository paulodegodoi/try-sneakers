'use client'
import { ReactElement, ReactNode, useState } from 'react'

interface SizeButtonsContainerProps {
  sizes: string[]
}

export function SizeButtonsContainer({ sizes }: SizeButtonsContainerProps) {
  function handleSizeClick(size: string) {
    setSelectedSize('')
  }
  const [selectedSize, setSelectedSize] = useState('')

  return (
    <div>
      <h3>Tamanho</h3>
      {sizes.map((size) => {
        return (
          <button
            key={size}
            className={`border border-black p-3 mx-2 hover:bg-p-green-500 hover:text-white duration-100${
              size === selectedSize ? ' bg-p-green-500 text-white' : ''
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}
