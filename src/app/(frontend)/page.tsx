import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CartButton } from '@/components/cart-button'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { LogoutButton } from '@/components/logout-button'
import { SiteHeader } from '@/components/site-header'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch all available snacks
  const snacks = await payload.find({
    collection: 'snacks',
    where: {
      available: {
        equals: true,
      },
    },
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-stone-100 text-gray-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <SiteHeader variant="full" user={user} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-4 h-4 bg-amber-300 rounded-full opacity-60 animate-bounce animation-delay-1000"></div>
            <div className="absolute top-40 right-20 w-6 h-6 bg-rose-300 rounded-full opacity-50 animate-bounce animation-delay-2000"></div>
            <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-300 rounded-full opacity-60 animate-bounce animation-delay-3000"></div>
            <div className="absolute bottom-20 right-10 w-5 h-5 bg-amber-200 rounded-full opacity-40 animate-bounce animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                  <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-amber-600 bg-clip-text text-transparent animate-gradient-x">
                    Snacks
                  </span>
                  <br />
                  <span className="text-gray-800">Reimagined</span>
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full"></div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the future of snacking with our curated collection of premium treats,
                delivered with precision and passion.
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Snacks Grid */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">
                Our Collection
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handcrafted experiences, delivered to perfection
              </p>
            </div>

            {snacks.docs.length === 0 ? (
              <div className="text-center py-20">
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-3xl">🔄</span>
                  </div>
                  <p className="text-gray-600 text-xl">New experiences loading...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {snacks.docs.map((snack: any, index: number) => (
                  <Dialog key={snack.id}>
                    <DialogTrigger asChild>
                      <Card
                        className="group relative overflow-hidden rounded-3xl border-2 border-gray-200/60 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-300/60 cursor-pointer transform-gpu p-0"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Enhanced Card Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-rose-100/20 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                        <div className="relative z-10 h-full flex flex-col">
                          {((snack.image && typeof snack.image === 'object') || snack.imageUrl) && (
                            <div className="relative aspect-[5/4] overflow-hidden rounded-t-3xl">
                              <Image
                                src={
                                  snack.image && typeof snack.image === 'object'
                                    ? snack.image.url
                                    : snack.imageUrl
                                }
                                alt={
                                  (snack.image && typeof snack.image === 'object'
                                    ? snack.image.alt
                                    : undefined) || snack.name
                                }
                                fill
                                className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                              />
                              {/* Image Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              {/* Floating Badge */}
                              <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
                                <Badge
                                  variant="secondary"
                                  className="bg-white/90 text-gray-700 border border-gray-200/60 backdrop-blur-sm shadow-lg font-medium px-3 py-1"
                                >
                                  {snack.category}
                                </Badge>
                              </div>
                            </div>
                          )}

                          <CardHeader className="space-y-3 p-4">
                            <div className="space-y-1">
                              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                                {snack.name}
                              </CardTitle>
                              <div className="h-0.5 w-12 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                              {snack.description}
                            </CardDescription>
                          </CardHeader>

                          <CardFooter className="flex items-center justify-between border-t border-gray-200/60 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm p-4 rounded-b-3xl">
                            <div className="space-y-1">
                              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                ${snack.price.toFixed(2)}
                              </span>
                              <p className="text-xs text-gray-500 font-medium">Premium Quality</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-sm text-gray-600 font-medium">Available</span>
                            </div>
                          </CardFooter>
                        </div>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-2 border-gray-200/60 bg-white/95 backdrop-blur-xl">
                      <div className="relative">
                        {/* Dialog Image */}
                        {((snack.image && typeof snack.image === 'object') || snack.imageUrl) && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={
                                snack.image && typeof snack.image === 'object'
                                  ? snack.image.url
                                  : snack.imageUrl
                              }
                              alt={
                                (snack.image && typeof snack.image === 'object'
                                  ? snack.image.alt
                                  : undefined) || snack.name
                              }
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            {/* Floating Badge in Dialog */}
                            <div className="absolute top-6 right-6">
                              <Badge
                                variant="secondary"
                                className="bg-white/90 text-gray-700 border border-gray-200/60 backdrop-blur-sm shadow-lg font-medium px-4 py-2 text-sm"
                              >
                                {snack.category}
                              </Badge>
                            </div>
                          </div>
                        )}

                        <DialogHeader className="p-8 space-y-6">
                          <div className="space-y-3">
                            <DialogTitle className="text-4xl font-bold text-gray-800 leading-tight">
                              {snack.name}
                            </DialogTitle>
                            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"></div>
                          </div>

                          <DialogDescription className="text-lg text-gray-600 leading-relaxed">
                            {snack.description}
                          </DialogDescription>

                          <div className="flex items-center justify-between pt-4">
                            <div className="space-y-2">
                              <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                ${snack.price.toFixed(2)}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-600 font-medium">
                                  In Stock & Ready to Ship
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              {user ? (
                                <AddToCartButton snack={snack} />
                              ) : (
                                <Button
                                  asChild
                                  className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 border-0 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
                                >
                                  <Link href="/login">Login to Order</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogHeader>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-24 border-t border-gray-200/60 bg-gray-50/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">&copy; 2024 Dyad Snacks. Crafted with passion.</p>
            <Button
              asChild
              variant="link"
              size="sm"
              className="text-amber-600 hover:text-amber-700"
            >
              <Link href={payloadConfig.routes.admin}>Admin Portal</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
