import React from 'react'
import { CartProvider } from '@/lib/cart-context'
import { CartSidebar } from '@/components/cart-sidebar'
import '../globals.css'

export const metadata = {
  description: 'A mini store template using Payload built with Dyad.',
  title: 'Dyad Portal Mini Store Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <main>{children}</main>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
