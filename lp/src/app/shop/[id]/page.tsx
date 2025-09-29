"use client"

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/app/components/ui/Button";
import { createPaymentIntent, getProductsById } from "@/app/services";
import { redirect } from "next/navigation";

import { ShopProduct } from "@/app/types/shop";
import ModalComposition from "@/app/components/ui/Modal/ModalComposition";
import Link from "next/link";

const mockProduct = {
  externalId: "68d58eec64120e2c406c95ab",
  id: "68d58eec64120e2c406c95ab",
  name: "Monitor AOC Hero 75hz + Suporte Articulado",
  description: "Monitor Usado AOC Hero 75hz, estou indo embora do Brasil e estou me desfazendo de alguns itens, um deles o meu monitor, 2 anos de uso e em perfeito estado, acompanha suporte de monitor articulado north bayou novo! Entrego nas estaçoes de trem e metrô de SP.",
  price: 38500,
  quantity: 1
};

export default function ShopPage() {

  const params = useParams()
  const id = params.id
  const [modalVisible, setModalVisible] = useState(false)
  const [productAtive, setActive] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [produtcObj, setProductObj] = useState<ShopProduct | null>(null)



  async function getProduct() {
    const response = await getProductsById(String(id))

    if (!response) {
      redirect("/")
    }

    setActive(response?.active)
    setModalVisible(!response?.active)
    setProductObj(response?.product)
  }

  useEffect(() => {
    getProduct()
  })

  async function createPayment() {
    setIsFetching(true)
    console.log(produtcObj)
    const response = await createPaymentIntent({
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [mockProduct],
      allowCupons: true,
      completionUrl: "https://bananasend.top/shop/obrigado",
      returnUrl: "https://bananasend.top/shop/68d58eec64120e2c406c95ab"
    })

    if (!response?.url) {
      setIsFetching(false)
      alert("Erro ao criar pagamento, tente novamente mais tarde")
    }

    redirect(response.url)
  }

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] p-2">
          <header className="">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-center">
              <div className="flex justify-center items-center gap-2">
                <div className="flex justify-start items-center">
                  <Image
                    src="/img/bananasend-logo.png"
                    alt="send"
                    width={80}
                    height={80}
                    className="rounded"
                    priority
                  />
                  <p className="text-xs font-bold italic">Shop</p>
                </div>
              </div>
            </div>
          </header>
          <div className="md:flex justify-center items-center gap-12 mt-6">
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={"https://drive.usercontent.google.com/download?id=1ScMNRYTtmw18YiroTKSS5jfW-Kff-F2n"}
                  width={500}
                  height={500}
                  alt=""
                  className="rounded shadow-lg my-2 transition-transform hover:scale-101 hover:shadow-2xl cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Image
                  src={"https://drive.usercontent.google.com/download?id=1LGdZRxPemaP8dwMtZhxiNUGql8n_m8wG"}
                  width={250}
                  height={250}
                  alt=""
                  className="rounded shadow-lg my-2 transition-transform hover:scale-101 hover:shadow-2xl cursor-pointer"
                />
                <Image
                  src={"https://drive.usercontent.google.com/download?id=1VEcdJuCbmcU2IhkXYS9SI2KBIwF7cKWw"}
                  width={250}
                  height={250}
                  alt=""
                  className="rounded shadow-lg my-2 transition-transform hover:scale-101 hover:shadow-2xl cursor-pointer"
                />
              </div>
              <div>
                <Image
                  src={"https://drive.usercontent.google.com/download?id=1D-Miz7cx5JwhkPzztwOww1Nk2sBLJEjH"}
                  width={500}
                  height={250}
                  alt=""
                  className="rounded shadow-lg my-2 transition-transform hover:scale-101 hover:shadow-2xl cursor-pointer"
                />
              </div>
            </div>
            <div className="md:w-[30%]">

              <div>
                <p className="text-sm">Vendido por <a target="_blank" href="https://www.instagram.com/thomm.dev/" className="text-blue-500 font-semibold">@thomm.dev</a></p>
              </div>

              <h1 className="text-4xl py-2 tracking-tighter mt-2">{mockProduct.name}</h1>
              <div className="flex gap-2 my-2">
                <b className="border border-slate-300 px-2 rounded-full italic">usado</b>
                <b className="border border-slate-300 px-2 rounded-full italic">75hz</b>
                <b className="border border-slate-300 px-2 rounded-full italic">24'</b>
                <b className="border border-slate-300 px-2 rounded-full italic">monitor</b>
              </div>

              <p className="py-2 text-lg">{mockProduct.description}</p>

              <div className="my-6 flex justify-between items-center">
                <div>
                  <div className="flex gap-1">
                    <p className="italic">De</p>
                    <h3 className="text-xl text-slate-400 line-through italic">R$ 550,00</h3>
                  </div>

                  <div className="flex gap-1">
                    <p className="italic">Por</p>
                    <h3 className="text-4xl font-extrabold italic">R$ 385,00</h3>
                  </div>
                </div>
                <div>
                  <p>Expira em:</p>
                  <b>01/10/2025</b>
                </div>
              </div>

              <div className="py-4">
                <h3 className="text-xl pb-2">Detalhes</h3>
                <p>Produto usado por <b>2 anos</b> e em perfeitas condicoes, acompanha:</p>
                <ul className="list-disc pl-10 py-1">
                  <li><b>1 Monitor AOC Hero 75hz</b> com <b>cabo de força</b> e <b>HDMI</b></li>
                  <li><b>1 Suporte Articulado a Gás North Bayou</b></li>
                </ul>

                <h3 className="text-xl pb-1 pt-2">Instruções para Entrega </h3>
                <p>Após o pagamento e o preenchimento dos dados de contato, entraremos em contato para marcar as datas de entrega.</p>
              </div>

              <div className="flex justify-between items-center gap-2">
                <Button
                  disabled={!productAtive}
                  value={isFetching ? "Gerando Pagamento..." : "Comprar Agora"}
                  onClick={() => createPayment()}
                  className="p-2.5 px-6 my-2 shadow-lg cursor-pointer w-full font-bold transition-transform hover:scale-101"
                />
                <div className="px-4 p-0.5 border border-slate-300 cursor-pointer rounded-lg transition-transform hover:scale-103">
                  <Link href={"https://wa.me/5511949098312"}>
                    <Image
                      alt="whatsapp"
                      src={"/icons/whatsapp.png"}
                      width={50}
                      height={100}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalComposition visible={modalVisible}>
          <div className="text-center">
            <h1 className="text-xl mx-2">Opss... Parece que outra pessoa chegou primeiro =(</h1>
            <p className="text-sm my-2">Peço desculpas, mas parece que este produto foi vendido.</p>
            <Button
              value="Quem sabe na próxima?"
              onClick={() => redirect("/")}
              className="p-2.5 px-6 my-2 shadow-lg cursor-pointer w-full font-bold transition-transform hover:scale-101"
            />
          </div>
        </ModalComposition>
      </div>
    </>
  )
}


//https://drive.usercontent.google.com/download?id=1D-Miz7cx5JwhkPzztwOww1Nk2sBLJEjH