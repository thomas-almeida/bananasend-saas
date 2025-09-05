import HomeClient from "./HomeClient";

import type { SubscriptionsResponse, SubscriptionPlan } from "./types/subscriptions";

export default async function Home() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  let initialPrices: SubscriptionPlan[] = []
  let initialWishListTotal: number = 0

  async function getSubscriptions() {
    try {
      const res = await fetch(`${baseURL}/subscriptions`, { next: { revalidate: 60 } })
      if (res.ok) {
        const data: SubscriptionsResponse = await res.json()
        initialPrices = data.subscriptions
      }
    } catch (e) {
      // ignore; render without data
    }
  }

  async function getWishListTotal() {
    try {
      const res = await fetch(`${baseURL}/wishlist-total`, { next: { revalidate: 60 } })
      if (res.ok) {
        const data: { count: number } = await res.json()
        initialWishListTotal = data.count
      }
    } catch (e) {
      // ignore; render without data
    }
  }

  await getSubscriptions()
  await getWishListTotal()

  return <HomeClient initialPrices={initialPrices} initialWishListTotal={initialWishListTotal} />
}
