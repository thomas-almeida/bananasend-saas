export interface SubscriptionPlan {
  _id: string
  name: string
  description: string
  promotional: string
  price: number
  features: string[]
}

export interface SubscriptionsResponse {
  subscriptions: SubscriptionPlan[]
}
