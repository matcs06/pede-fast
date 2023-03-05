import CartButton from "../components/CartButton"
import AddRemove from "../components/AddRemove"
import Image from "next/image";
interface OptionsItems {
   name: string;
   id: string;
   value: string
}

interface CreatedOptionType {
   id: string,
   name: string,
   isRequired: boolean,
   maximumQuantity: string,
   items: OptionsItems[]
}

interface ProductType {
   name: string,
   description: string,
   price: string,
   quantity: string,
   image_url: string,
   options: CreatedOptionType[]

}
export default function Test() {
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
            <div className="flex  flex-row max-w-md border-b-b-1/5 border-b-light-gray-2 mb-2  cursor-pointer w-full py-3 px-2 select-none" >
               <div className="px-5 w-3/4">
                  <p className="text-dark-gray font-bold mb-2 ">Mousse de Chocolate</p>
                  <p className="text-justify font-light text-sm">Delicioso Mousse de Chocolate com raspas de chocolate e limão, feito com 50% cacau. 220 ml.</p>
                  <p className="mt-3 text-light-gree text-sm">Por apenas: <b> 12,00 R$</b></p>
               </div>
               <Image width={130} height={120} src="/test2.png" alt="image-produto" className="rounded-lg mt-1" />
            </div>

         </div>
         <div className="flex w-full justify-center absolute bottom-3">
            <CartButton>Continuar</CartButton>
         </div>

      </div>
   )
}