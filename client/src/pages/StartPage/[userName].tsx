import CartButton from "../../components/CartButton"
import AddRemove from "../../components/AddRemove"
import Image from "next/image";
import { BRLReais } from "../../utils/currencyFormat"
import { AiFillCloseCircle } from "react-icons/ai"
import ItemDetail from "../ItemDetails";
import Router, { withRouter, useRouter } from 'next/router'


import { productModel } from "./productModel"
import { useEffect, useState } from "react";
import { useCartContext } from "@/context/Context";

import { ProductType, IOrderProducts } from "./types";
import instace from "@/api/appAPI";

interface IProduct {
   id: string;
   name: string;
   price: string;
   quantity: string;
   enabled: boolean;
   description: string;
   options: []
   image_url: string;
   usersId: string;
}

interface IUser {
   id: string;
   user_name: string;
   phone: string;
   business_name: string;
   business_image_url: string;
   address: string;
   store_status: "opened" | "closed";
   products: IProduct[]
}

export function StartPage() {

   const { push } = useRouter();
   const [myCart,] = useCartContext()
   const router = useRouter()


   const [showItemDetails, setShowItemDetails] = useState(false)
   const [selectedProduct, setSelectedProdut] = useState<IProduct>()

   const [userDetails, setUserDetails] = useState<IUser>()

   const cartTotalValue = myCart.reduce((acc: number, cart: IOrderProducts) => acc + cart.productOrderPrice, 0)

   const imagePrefixLink = "http://localhost:3333/files/"

   function OnClickProduct(product: IProduct) {
      setShowItemDetails(true)
      setSelectedProdut(product)
   }

   useEffect(() => {
      const userName = router.query.userName;
      localStorage.setItem("user_name", String(router.query.userName));

      async function loadUserInfo() {
         const response = await instace.get<IUser>(`users/${userName}`)

         setUserDetails(response.data)
         localStorage.setItem("adm_id", response.data.id)
         localStorage.setItem("adm_phone", response.data.phone)
         localStorage.setItem("business_image_url", response.data.business_image_url)
         localStorage.setItem("business_address", response.data.address)

      }

      try {

         loadUserInfo()


      } catch (error) {
         window.alert("Erro ao ler informaçoes da loja")

      }




   }, [router.query.userName])

   return (
      <div className="flex relative flex-col items-center text-dark-gray min-h-phoneHeigth">
         <header className="bg-secondary-orange h-28 w-full">
         </header>
         <div className="w-40 absolute top-10 rounded-lg  flex flex-col justify-center items-center shadow-dark-gray shadow-md	 bg-light-gray h-28 justify-self-center">
            <Image width={90} height={90} src={imagePrefixLink + router.query.userName + "/" + "profile/" + userDetails?.business_image_url} alt="image-produto" className="rounded-lg mt-1  w-40 h-36 m-0" />

            {userDetails?.store_status == "opened" ? (
               <div className="w-1/2 flex text-primary-bk cursor-pointer justify-center bg-light-gree h-6 absolute top-28 rounded-lg z-10 ">
                  Aberto
               </div>
            ) : (
               <div className="w-1/2 flex text-primary-bk cursor-pointer justify-center bg-secondary-orange h-6 absolute top-28 rounded-lg z-10 ">
                  Fechado
               </div>
            )}

         </div>
         <div className="mt-24 h-full w-full flex flex-col justify-center items-center ">

            <div className="w-full flex flex-col  items-center max-h-overflow pt-2 overflow-y-scroll">
               {userDetails?.products?.map((product) => {
                  if (product.enabled) {
                     return (
                        <div key={product.name} className="flex  flex-row max-w-md border-b-b-1/5 border-b-light-gray-2 mb-2  cursor-pointer w-full py-3 px-2 select-none" onClick={() => { OnClickProduct(product) }}>
                           <div className="px-5 w-3/4">
                              <p className="text-dark-gray font-bold mb-2 ">{product.name}</p>
                              <p className="text-justify font-light text-sm">{product.description}</p>
                              <p className="mt-3 text-light-gree text-sm">Por apenas: <b> {BRLReais.format(Number(product.price))}</b></p>
                           </div>
                           <Image width={130} height={120} src={imagePrefixLink + router.query.userName + "/" + product.image_url} alt="image-produto" className="rounded-lg mt-1" />
                        </div>


                     )

                  }

               })}
            </div>


            {
               showItemDetails && (
                  <div className="absolute bg-primary-bk top-0 z-10 flex flex-col items-center min-h-phoneHeigth w-full">
                     <div className="flex h-8 w-8 absolute top-1 right-2 cursor-pointer z-20" onClick={() => { setShowItemDetails(false) }}>
                        <AiFillCloseCircle size={30} />
                     </div>
                     <ItemDetail
                        name={selectedProduct?.name}
                        description={selectedProduct?.description}
                        image_url={selectedProduct?.image_url}
                        price={selectedProduct?.price}
                        options={selectedProduct?.options}
                        quantity={selectedProduct?.quantity}
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

export default withRouter(StartPage)