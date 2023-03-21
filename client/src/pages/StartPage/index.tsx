import CartButton from "../../components/CartButton"
import AddRemove from "../../components/AddRemove"
import Image from "next/image";
import { BRLReais } from "../../utils/currencyFormat"
import { AiFillCloseCircle } from "react-icons/ai"
import ItemDetail from "../ItemDetails";
import { useRouter } from 'next/navigation';


import { productModel } from "./productModel"
import { useState } from "react";
import { useCartContext } from "@/context/Context";

import { ProductType, IOrderProducts } from "./types";

export default function Test() {

   const { push } = useRouter();
   const [myCart,] = useCartContext()

   const [showItemDetails, setShowItemDetails] = useState(false)
   const [passedProduct, setPassedProduct] = useState<ProductType>()

   const cartTotalValue = myCart.reduce((acc: number, cart: IOrderProducts) => acc + cart.productOrderPrice, 0)

   function OnClickProduct(product: ProductType) {
      setShowItemDetails(true)
      setPassedProduct(product)
   }

   return (
      <div className="flex relative flex-col items-center text-dark-gray min-h-phoneHeigth">
         <header className="bg-secondary-orange h-28 w-full">
         </header>
         <div className="w-40 absolute top-10 rounded-lg  flex flex-col justify-center items-center shadow-dark-gray shadow-md	 bg-light-gray h-28 justify-self-center">
            Foto da Loja

            <div className="w-1/2 flex text-primary-bk cursor-pointer justify-center bg-light-gree h-6 absolute top-24 rounded-lg z-10 ">
               Aberto
            </div>
         </div>
         <div className="mt-24 h-full w-full flex flex-col justify-center items-center">

            {productModel.map((product) => {
               return (
                  <div key={product.name} className="flex  flex-row max-w-md border-b-b-1/5 border-b-light-gray-2 mb-2  cursor-pointer w-full py-3 px-2 select-none" onClick={() => { OnClickProduct(product) }}>
                     <div className="px-5 w-3/4">
                        <p className="text-dark-gray font-bold mb-2 ">{product.name}</p>
                        <p className="text-justify font-light text-sm">{product.description}</p>
                        <p className="mt-3 text-light-gree text-sm">Por apenas: <b> {BRLReais.format(Number(product.price))}</b></p>
                     </div>
                     <Image width={130} height={120} src="/test2.png" alt="image-produto" className="rounded-lg mt-1" />
                  </div>


               )

            })}

            {
               showItemDetails && (
                  <div className="absolute bg-primary-bk top-0 z-10 flex flex-col items-center min-h-phoneHeigth w-full">
                     <div className="flex h-8 w-8 absolute top-1 right-2 cursor-pointer z-20" onClick={() => { setShowItemDetails(false) }}>
                        <AiFillCloseCircle size={30} />
                     </div>
                     <ItemDetail
                        name={passedProduct?.name}
                        description={passedProduct?.description}
                        image_url={passedProduct?.image_url}
                        price={passedProduct?.price}
                        options={passedProduct?.options}
                        quantity={passedProduct?.quantity}
                        setShowSelf={setShowItemDetails}
                     />
                  </div>
               )
            }
         </div>

         {myCart.length > 0 && (
            <div className="flex w-full justify-center absolute bottom-3 select-none">
               <CartButton onClick={() => { push("/Cart") }} numberOfItems={myCart.length} cartValue={cartTotalValue}>Continuar</CartButton>
            </div>
         )}


      </div>
   )
}