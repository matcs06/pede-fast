import { BRLReais } from "../utils/currencyFormat"
export default function UpdateCart({ children = "", updatedValue = 0, ...props }) {


   return (
      <div onClick={props.onClick} className="flex w-1/2 max-w-md select-none bg-secondary-orange h-9 cursor-pointer text-primary-bk font-medium items-center justify-center bottom-3 rounded-md shadow-lg">
         <p className="mr-4 select-none">{children}</p>
         {updatedValue > 0 && (
            <p className="text-sm select-none font-bold rounded-full">{BRLReais.format(updatedValue)}</p>
         )}
      </div>
   )
}