import Image from "next/image"
import AddRemove from "../components/AddRemove"
import UpdateCart from "../components/UpdateCart";
import { v4 } from "uuid"
import { productModel } from "./productModel"
import { useState } from "react";

import { BRLReais } from "../../utils/currencyFormat"

interface ProductOrderOptions {
   optionTitle: string,
   optionName: string,
   optionPrice: number,
   optionQuantity: number
}

export default function ItemDetail() {



   const [productQuantiy, setProductQuantity] = useState(1)
   const [productOptions, setProductOptions] = useState<ProductOrderOptions[]>([])
   let productPrice = 12


   let optionsTotalPrice = productOptions.reduce((total, option) => total + option.optionPrice, 0)
   productPrice = (productQuantiy * productPrice) + optionsTotalPrice

   let allowAddMore = productQuantiy > 0 ? true : false

   console.log(productOptions)

   const onUpdate = (
      quantity: number,
      addType: string,
      optionTitle: string,
      optionName: string,
      optionPrice: string,
      optionMaxQuantity: string) => {

      /* Increase top product quantity */
      if (addType == "big") {
         setProductQuantity(quantity)
      }
      /* Logic to haandle the choosed options that are stored inside productOptions state */
      if (optionName !== "main" && productQuantiy > 0) {

         let newOption = { optionTitle, optionName, optionPrice: Number(optionPrice), optionQuantity: Number(quantity) }
         /* Flag to control if newOption already exists in productOption array */
         let newOptionExists = false

         const filteredOptions = productOptions.filter((options) => {

            if (options.optionTitle == newOption.optionTitle && options.optionName == newOption.optionName) {
               options.optionPrice = Number(optionPrice) * quantity
               options.optionQuantity = quantity
               newOptionExists = true
            }

            return options.optionPrice > 0 && options

         })
         /* Only add newOption if it doesn`t already exists in the array */
         if (!newOptionExists) {
            filteredOptions.push(newOption)
         }

         /* Logic to avoid adding more items to the array when the maximum quantity is reached*/
         const quantityByOption = filteredOptions.reduce((totalQuantity, option) => {
            if (option.optionTitle === optionTitle) {
               totalQuantity = totalQuantity + option.optionQuantity
            }
            return totalQuantity
         }, 0)
         allowAddMore = quantityByOption > Number(optionMaxQuantity) ? false : true

         if (allowAddMore) {
            setProductOptions(filteredOptions)
         }

      }

      return allowAddMore
   }


   return (
      <div className="flex flex-col items-center min-h-phoneHeigth relative w-full ">
         <div className="flex h-1/5 flex-col my-3 w-4/5 -mb-0">
            <div className="w-full flex items-center justify-center rounded-md">

               <Image className="object-fill w-full h-52 max-w-xs" src={productModel.image_url} alt="Image-Produto" height={350} width={350} />
            </div>
            <div className="justify-between mt-3 items-stretch ml-2 px-1">
               <p className="text-secondary-orange font-bold mb-1 select-none ">{productModel.name}</p>
               <p className="text-dark-gray text-xs font-light mb-1 select-none ">{productModel.description}</p>
               <p className="text-dark-gray font-inter text-sm font-bold select-none">R$ {productModel.price}</p>

            </div>

         </div>
         <div className="flex w-full items-center flex-col overflow-scroll max-h-80">
            {productModel.options.map((productOptions) => {
               return (
                  <div className="w-full flex flex-col items-center h-full " key={productOptions.id}>
                     <div key={productOptions.id} className="flex bg-light-gray w-4/5 h-11 min-h px-4 rounded-lg items-center justify-between mt-5 ">
                        <p className="text-sm select-none text-secondary-orange ">{productOptions.name}</p>
                        {productOptions.isRequired ? (
                           <p className="text-xs select-none bg-secondary-orange h-1/2 w-1/4 rounded-md flex items-center justify-center text-primary-bk">obrigatório </p>
                        ) : (
                           <p className="text-xs select-none bg-green h-1/2 w-1/4 rounded-md flex items-center justify-center text-primary-bk">opicional</p>

                        )}

                     </div>
                     {productOptions.items.map((optionItems) => (
                        <div key={optionItems.id} className="flex mt-2 w-3/4 h-11 px-1 relative  border-b-b-1/5 border-b-light-gray-2">
                           <div className="flex flex-col justify-center">
                              <p className="text-dark-gray text-sm font-normal select-none">{optionItems.name}</p>
                              {Number(optionItems.value) > 0 && <p className="text-xs font-normal mb-1 select-none text-secondary-orange">{BRLReais.format(Number(optionItems.value))}</p>}
                           </div>
                           <div className="absolute right-1 top-2">

                              <AddRemove optionTitle={productOptions.name}
                                 onUpdate={onUpdate}
                                 optionName={optionItems.name}
                                 optionPrice={optionItems.value}
                                 optionMaxQuantity={productOptions.maximumQuantity}
                                 optionStyle="small" />
                           </div>
                        </div>
                     ))}
                  </div>
               )

            })}



         </div>


         <div className="absolute bottom-3 flex flex-row w-full justify-around ">
            <AddRemove optionName={"main"} quantity={1} onUpdate={onUpdate} />
            <UpdateCart updatedValue={productPrice}>{productQuantiy > 0 ? "Atualizar" : "Remover"}</UpdateCart>
         </div>
      </div>
   )
}