export type ShopProduct = {
  externalId: string,
  name: string,
  description: string,
  quantity: number,
  price: number
}

export type PaymentIntent = {
  frequency: string,
  methods: string[],
  products: ShopProduct[],
  returnUrl: string,
  completionUrl: string,
  allowCupons: boolean,
}