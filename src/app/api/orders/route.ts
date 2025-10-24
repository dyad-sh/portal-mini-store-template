import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get user from the request
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    }

    // Validate items exist and are available
    let computedTotal = 0
    for (const item of items) {
      const quantity = Number(item?.quantity)
      const snackId = item?.snack

      if (
        !snackId ||
        !Number.isFinite(quantity) ||
        !Number.isInteger(quantity) ||
        quantity <= 0 ||
        quantity > 100
      ) {
        return NextResponse.json({ error: 'Invalid item quantity or snack id' }, { status: 400 })
      }

      const snack = await payload.findByID({
        collection: 'snacks',
        id: snackId,
      })

      if (!snack || !snack.available) {
        return NextResponse.json({ error: `Snack ${snackId} is not available` }, { status: 400 })
      }

      const price = Number(snack.price)
      if (!Number.isFinite(price) || price < 0) {
        return NextResponse.json({ error: `Invalid price for snack ${snackId}` }, { status: 400 })
      }

      computedTotal += price * quantity
    }

    // Create the order
    const order = await payload.create({
      collection: 'orders',
      data: {
        user: user.id,
        items,
        totalAmount: computedTotal,
        status: 'pending',
        orderDate: new Date().toISOString(),
      },
    })

    return NextResponse.json({ success: true, doc: order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get user from the request
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's orders
    const orders = await payload.find({
      collection: 'orders',
      where: {
        user: {
          equals: user.id,
        },
      },
      depth: 2,
      sort: '-orderDate',
    })

    return NextResponse.json({ orders: orders.docs })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
