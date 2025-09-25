import axios from "axios"
import { PaymentIntent } from "@/app/types/shop"

export async function getProductsById(id: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/get-product-by-id/${id}`)
  return response.data?.product
}

export async function createPaymentIntent(payload: PaymentIntent) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_ABKT_BASE_URL}/v1/billing/create`, payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ABKT_DEV_KEY}`
    }
  })
  return response.data
}
