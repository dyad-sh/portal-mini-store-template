import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CartButton } from '@/components/cart-button'
import { LogoutButton } from '@/components/logout-button'

export interface SiteHeaderProps {
  variant?: 'full' | 'simple'
  user?: any
  title?: string
  subtitle?: string | React.ReactNode
  className?: string
}

export function SiteHeader({
  variant = 'simple',
  user,
  title,
  subtitle,
  className = '',
}: SiteHeaderProps) {
  if (variant === 'full') {
    return (
      <header
        className={`sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-2xl ${className}`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                🍿
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-amber-600 bg-clip-text text-transparent tracking-tight">
              Dyad Snacks
            </h1>
          </Link>

          {/* Navigation and User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.firstName || user.email}
                  </span>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/my-orders">My Orders</Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/admin-dashboard">Admin</Link>
                    </Button>
                  )}
                </div>
                <CartButton />
                <LogoutButton />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }

  // Simple variant (for auth pages, etc.)
  return (
    <div className={`text-center ${className}`}>
      <Link href="/" className="text-2xl font-bold text-red-600">
        🍿 Dyad Snacks
      </Link>
      {title && <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>}
      {subtitle && <div className="mt-2 text-sm text-gray-600">{subtitle}</div>}
    </div>
  )
}
