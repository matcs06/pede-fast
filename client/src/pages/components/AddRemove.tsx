import { useState } from "react"

export default function AddRemove({ quantity = 0, setQuantity }) {


   const [selfQuantity, setSelfQuantity] = useState(quantity)

   const handleQuantity = (value: number) => {

      if ((selfQuantity + value) >= 0) {

         setSelfQuantity(selfQuantity + value)
      }
   }

   return (
      <div className="flex select-none	 bg-secondary-orange w-24 h-8 items-center justify-around text-primary-bk rounded-md">
         <div className="cursor-pointer w-1/3 flex justify-center " onClick={() => { handleQuantity(-1) }}>-</div>
         <div className="text-sm border-x-b-1/5 h-full border-h w-1/3 flex justify-center items-center z-10 ">{selfQuantity}</div>
         <div className="cursor-pointer w-1/3 flex justify-center " onClick={() => { handleQuantity(+1) }}>+</div>
      </div>
   )
}