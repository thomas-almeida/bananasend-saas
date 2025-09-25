import HomeClient from "./HomeClient";

import type { SubscriptionsResponse, SubscriptionPlan } from "./types/subscriptions";

export default async function Home() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  let initialPrices: SubscriptionPlan[] = []


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

  await getSubscriptions()
  return <HomeClient initialPrices={initialPrices} />
}
