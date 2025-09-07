"use client"

import { SubscriptionPlan } from "../types/subscriptions"

interface PricingProps {
  prices: SubscriptionPlan[]
}

export default function Pricing({ prices }: PricingProps) {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {
          prices && prices.length > 0 ? (
            prices.map((price: SubscriptionPlan, index: number) => (
              <div
                key={price._id}
                className="flex flex-col items-center justify-center border border-slate-200 p-4 rounded-xl bg-white shadow-2xl h-[400px] gap-2 hover:scale-102 transition-all cursor-pointer"
              >
                <p className="text-xs">
                  {
                    index === 0 ? (
                      "*"
                    )
                      : index === 1 ? (
                        "**"
                      )
                        : index === 2 ? (
                          "***"
                        )
                          : null
                  }
                </p>
                <h4 className="text-2xl font-semibold">{price.name}</h4>
                <p className="text-sm text-neutral-800 w-[80%]">{price.description}</p>
                {
                  price.promotional !== "0.00" ? (
                    <p className="text-md text-neutral-400 line-through italic">R$ {price.promotional.replace('.', ',')}</p>
                  ) : null
                }
                <h5 className="text-4xl font-bold py-4">{price.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                <ul className="text-left px-4 text-sm">
                  {
                    price.features.map((feature: string, index: number) => (
                      <li
                        key={index}
                        className="py-1"
                      >
                        ✅ {feature}
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          ) : (
            <p>Carregando...</p>
          )
        }
      </div>
    </>
  )
}