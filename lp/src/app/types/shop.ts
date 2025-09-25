export type ShopProduct = {
  externalId: String,
  name: String,
  description: String,
  quantity: Number,
  price: Number
}

export type PaymentIntent = {
  frequency: String,
  methods: String[],
  products: ShopProduct[],
  returnUrl: String,
  completionUrl: String,
  allowCupons: boolean,
}