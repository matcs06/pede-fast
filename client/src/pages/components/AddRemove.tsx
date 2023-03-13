import { useEffect, useState } from "react"

//optionStyle: "big" | "small"

export default function AddRemove({
   onUpdate,
   quantity = 0,
   optionStyle = "big",
   optionTitle = "",
   optionName = "main",
   optionPrice = "",
   optionMaxQuantity = "",
   blockOption = { option_title: "main", block_option: false }

}) {


   const [selfQuantity, setSelfQuantity] = useState(quantity)


   const handleQuantity = (value: number) => {
      let blockOptionLocal = false
      if (blockOption.option_title === optionTitle && blockOption.block_option === true) {
         blockOptionLocal = true
      }

      if (((selfQuantity + value) >= 0 && !blockOptionLocal) || (value < 0 && selfQuantity + value >= 0)) {
         setSelfQuantity(selfQuantity + value)

      }

      handleUpdate(value)
   }

   function handleUpdate(value: number) {

      const positiveOrNegative = value > 0 ? "positive" : "negative"

      onUpdate(selfQuantity + value, positiveOrNegative, optionStyle, optionTitle, optionName, optionPrice, optionMaxQuantity)

   }


   const bigOptionStyle = "flex select-none bg-secondary-orange w-28 h-9 items-center justify-around text-primary-bk rounded-md"
   const smallOptionStyle = "flex select-none bg-primary-bk text-secondary-orange w-14 h-5 justify-end  text-xs rounded-md"

   const displayMinus = selfQuantity <= 0 && "hidden"


   const centerBorderWidth = optionStyle == "big" ? "border-x-b-1/5" : ""
   const centerFontSize = optionStyle == "big" ? "text-sm" : "text-xs"
   return (
      <div className={`${optionStyle == "big" ? bigOptionStyle : smallOptionStyle}`}>
         <div className={`${optionStyle != "big" && displayMinus}  flex cursor-pointer w-1/3 justify-center min `} onClick={() => { handleQuantity(-1) }}>-</div>
         <div className={`${centerFontSize} ${centerBorderWidth} ${optionStyle != "big" && displayMinus}   h-full border-h w-1/3 flex justify-center items-center z-10 `}>{selfQuantity}</div>
         <div className="cursor-pointer w-1/3 flex justify-center" onClick={() => { handleQuantity(+1) }}>+</div>
      </div>
   )
}