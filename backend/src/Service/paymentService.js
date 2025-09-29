import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

export async function createBillingIntent(payload) {
    const response = await axios.post(`${process.env.ABKT_BASE_URL}/v1/billing/create`, payload, {
        headers: {
            Authorization: `Bearer ${process.env.ABKT_PROD_KEY}`
        }
    })
    
    return response.data
}