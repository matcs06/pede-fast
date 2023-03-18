import { HiOutlineShoppingCart } from "react-icons/hi"
import { BRLReais } from "@/utils/currencyFormat"
export default function CartButton({ children = "", numberOfItems = 0, cartValue = "24" }) {
   return (
      <div className="flex w-3/4 max-w-md bg-secondary-orange h-11 cursor-pointer text-primary-bk font-medium items-center justify-evenly bottom-3 rounded-md shadow-lg">
         {numberOfItems > 0 && (
            <div className="flex animate-bounce relative w-8 anima ">
               <HiOutlineShoppingCart size={20} />
               <span className="text-xs p-1 bg-primary-bk rounded-full flex items-center justify-center text-secondary-orange w-4 h-4 -mx-1 -my-2" >{numberOfItems}</span>
            </div>
         )}

         {children}
         <div>
            <p className="text-sm font-bold rounded-full">{BRLReais.format(Number(cartValue))}</p>
         </div>

      </div>
   )
}