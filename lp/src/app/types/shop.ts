
export type ShopProduct = {
  id: string,
  name: string,
  description: string,
  images?: string[],
  quantity: number,
  price: number,
  active?: boolean
}

export type PaymentIntent = {
  frequency: string,
  methods: string[],
  products: ShopProduct[],
  returnUrl: string,
  completionUrl: string,
  allowCupons: boolean,
}