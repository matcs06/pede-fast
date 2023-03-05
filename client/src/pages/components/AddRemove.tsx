import { useEffect, useState } from "react"

//optionStyle: "big" | "small"

export default function AddRemove({
   allowUpdate = true,
   quantity = 0,
   optionStyle = "big",
   onUpdate,
   optionTitle = "",
   optionName = "main",
   optionPrice = "",
   optionMaxQuantity = "" }) {


   const [selfQuantity, setSelfQuantity] = useState(quantity)

   const handleQuantity = (value: number) => {



      if ((selfQuantity + value) >= 0 && allowUpdate) {
         onUpdate(selfQuantity + value, optionStyle, optionTitle, optionName, optionPrice, optionMaxQuantity)
         setSelfQuantity(selfQuantity + value)
      }
   }

   useEffect(() => {

   }, [quantity])

   const bigOptionStyle = "flex select-none bg-secondary-orange w-28 h-9 items-center justify-around text-primary-bk rounded-md"
   const smallOptionStyle = "flex select-none bg-primary-bk text-secondary-orange w-14 h-5  text-xs justify-around rounded-md"

   const centerBorderWidth = optionStyle == "big" ? "border-x-b-1/5" : ""
   const centerFontSize = optionStyle == "big" ? "text-sm" : "text-xs"
   return (
      <div className={optionStyle == "big" ? bigOptionStyle : smallOptionStyle}>
         <div className="cursor-pointer w-1/3 flex justify-center" onClick={() => { handleQuantity(-1) }}>-</div>
         <div className={`${centerFontSize} ${centerBorderWidth} h-full border-h w-1/3 flex justify-center items-center z-10 `}>{selfQuantity}</div>
         <div className="cursor-pointer w-1/3 flex justify-center" onClick={() => { handleQuantity(+1) }}>+</div>
      </div>
   )
}