import { useCartContext, useSubTractOrAdd } from "@/context/Context"
import { BRLReais } from "@/utils/currencyFormat"
import Image from "next/image"
import { IOrderProducts } from "./types"

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import CartButton from "@/components/CartButton"
import { useRouter } from "next/router"


export default function Cart() {
   const [cartContent, updateCartContent] = useCartContext()
   const AddOrRemove = useSubTractOrAdd()
   const { push, back } = useRouter();
   const cartTotalValue = cartContent.reduce((acc: number, cart: IOrderProducts) => acc + cart.productOrderPrice, 0)
   let userName: any = ""
   if (typeof window !== 'undefined') {
      userName = localStorage.getItem("user_name");
   }
   const imagePrefixLink = "http://localhost:3333/files/"


   return (
      <div className="flex items-center mt-3 flex-col min-h-phoneHeigth">
         <h3 className="font-normal select-none text-lg text-secondary-orange my-4">Minha sacola</h3>
         <main className="flex flex-col w-full items-center h-full">

            <div className="w-full flex flex-col  items-center max-h-overflow pt-2 overflow-y-scroll">
               {cartContent.map((carItem: IOrderProducts) => {
                  return (
                     <div key={carItem.id} className="flex relative select-none cursor-pointer bg-light-gray w-5/6 rounded-lg h-28 shadow-sm mb-4 min-h-cartItemHeigth">
                        <Image className="flex pl-1 py-2 h-full rounded-lg mr-3"
                           src={imagePrefixLink + userName + "/" + carItem.product_image_url}
                           width={100} height={100} alt="product" />

                        <div className="text-xs font-light font-inter mt-2 text-dark-gray relative w-2/3">
                           <p className="font-semibold min-w-fit">{carItem.productName} ({carItem.productQuantity}x)</p>
                           {carItem.options.length > 0 && (
                              <p className="text-xs mt-1">Adicionais: ({carItem.options?.length}x)</p>
                           )}
                           <p className="absolute bottom-2 w-full">Subtotal: {BRLReais.format(carItem.productOrderPrice)}</p>
                        </div>
                        <div className="absolute right-2 h-20 w-7 top-3 flex flex-col justify-between select-none ">
                           <AiFillPlusCircle className="text-secondary-orange cursor-pointer transition duration-300 ease-in-out hover:opacity-80" size={28} onClick={() => AddOrRemove(carItem.id, "add")} />
                           <AiFillMinusCircle className="text-secondary-orange cursor-pointer transition duration-300 ease-in-out hover:opacity-80" size={28} onClick={() => AddOrRemove(carItem.id, "remove")} />
                        </div>
                     </div>
                  )
               })}
            </div>

            <div className="flex flex-col w-full items-center absolute bottom-5 h-24 justify-between">
               <CartButton onClick={() => { back() }}>Voltar ao cardápio</CartButton>
               {cartTotalValue > 0 && (
                  <CartButton onClick={() => { push("/CustomerInfo") }} numberOfItems={cartContent.length} cartValue={cartTotalValue}>Continuar</CartButton>

               )}
            </div>

         </main>

      </div>
   )

}