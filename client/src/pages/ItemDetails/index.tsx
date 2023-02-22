import Image from "next/image"
import AddRemove from "../components/AddRemove"
export default function ItemDetail() {
   return (
      <div className="flex flex-col items-center min-h-screen relative   w-full ">
         <div className="flex h-1/5 flex-col my-6 w-4/5">
            <div className="w-full flex items-center justify-center rounded-md">

               <Image className="object-fill w-full h-52 max-w-xs" src="/test2.png" alt="Image-Produto" height={350} width={350} />
            </div>
            <div className="flex justify-between mt-3 items-stretch">
               <p className="text-secondary-orange font-light ">Mousse de chocolate</p>
               <p className="text-secondary-orange font-inter text-sm font-semibold  ">12,00 R$</p>
            </div>

         </div>
         <div className="flex bg-light-gray w-4/5 h-11 px-4 rounded-lg items-center justify-between ">
            <p className="text-sm text-secondary-orange ">Escolha seu Adicinal</p>
            <p className="text-xs bg-secondary-orange h-1/2 w-1/4 rounded-md flex items-center justify-center text-primary-bk">opcional</p>


         </div>

         <div className="absolute bottom-5">
            <AddRemove quantity={0} setQuantity={() => { }} />
         </div>
      </div>
   )
}