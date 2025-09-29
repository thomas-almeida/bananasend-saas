import axios from "axios"
import { PaymentIntent } from "@/app/types/shop"

export async function getProductsById(id: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/get-product-by-id/${id}`)
  return response.data?.product
}

export async function createPaymentIntent(payload: PaymentIntent) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/abkt/create-payment`, payload)
  return response.data
}
