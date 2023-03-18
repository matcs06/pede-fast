import Image from "next/image"
import AddRemove from "../components/AddRemove"
import UpdateCart from "../components/UpdateCart";
import { useState } from "react";
import { v4 } from "uuid"

import { BRLReais } from "../../utils/currencyFormat"
import { useCartContext } from "@/context/Context";


import { IOrderProducts, IProductType, ProductOrderOptions } from "./types";


export default function ItemDetail(productModel: IProductType) {
   const [cartContext, setCartContext] = useCartContext()


   const [productQuantiy, setProductQuantity] = useState(1)
   const [productOptions, setProductOptions] = useState<ProductOrderOptions[]>([])
   let productPrice = Number(productModel.price)

   let optionsTotalPrice = productOptions.reduce((total, option) => total + option.optionPrice, 0)
   productPrice = (productQuantiy * productPrice) + optionsTotalPrice

   const [blockFrontEndAdd, setBlockFrontEndAdd] = useState({ option_title: "", block_option: false })
   let blockMoreForOption


   function saveToCartContext() {
      const newProduct: IOrderProducts = {
         id: v4(),
         productName: productModel.name,
         productQuantity: productQuantiy,
         productOrderPrice: productPrice,
         product_image_url: productModel.image_url,
         options: productOptions
      }

      setCartContext(newProduct, "add")

   }

   const onUpdate = (
      quantity: number,
      positiveOrNegative: "positive" | "negative",
      addType: string,
      optionTitle: string,
      optionName: string,
      optionPrice: string,
      optionMaxQuantity: string) => {

      blockMoreForOption = { option_title: "", block_option: false }

      /* Increase top product quantity */
      if (addType == "big") {
         setProductQuantity(quantity)
      } else {
         const optionCurrentQuantity = productOptions.reduce((acc, prod) => {
            if (quantity > 0 && positiveOrNegative === "positive") {

               if (prod.optionTitle === optionTitle) {
                  acc = acc + Number(prod.optionQuantity)
               }
            }

            return acc
         }, 1)

         /* Control to add more in the plus option on the scree */
         if (optionCurrentQuantity >= Number(optionMaxQuantity)) {
            setBlockFrontEndAdd({ option_title: optionTitle, block_option: true })
         } else {
            setBlockFrontEndAdd({ option_title: optionTitle, block_option: false })
         }

         /* control to add more in the array of options */
         if (optionCurrentQuantity > Number(optionMaxQuantity)) {
            blockMoreForOption.block_option = true
            blockMoreForOption.option_title = optionTitle
         } else {
            blockMoreForOption.block_option = false
            blockMoreForOption.option_title = optionTitle
         }

      }
      let block = false;
      if (optionTitle === blockMoreForOption.option_title && blockMoreForOption.block_option === true) {
         block = true
      }

      /* Logic to haandle the choosed options that are stored inside productOptions state */
      if ((optionName !== "main" && productQuantiy > 0 && !block)
         || (quantity == 0 && optionName !== "main") || (quantity > 0 && positiveOrNegative == "negative")) {

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

         setProductOptions(filteredOptions)

      }
   }

   return (
      <div className="flex flex-col items-center min-h-phoneHeigth relative w-full ">
         <div className="flex h-1/5 flex-col my-3 w-4/5 -mb-0">
            <div className="w-full flex items-center justify-center rounded-md">

               <Image className="object-fill w-full h-52 max-w-xs" src={productModel.image_url || "nothing.png"} alt="Image-Produto" height={350} width={350} />
            </div>
            <div className="justify-between mt-3 items-stretch ml-2 px-1">
               <p className="text-secondary-orange font-bold mb-1 select-none ">{productModel.name}</p>
               <p className="text-dark-gray text-xs font-light mb-1 select-none ">{productModel.description}</p>
               <p className="text-dark-gray font-inter text-sm font-bold select-none">R$ {productModel.price}</p>

            </div>

         </div>
         <div className="flex w-full items-center flex-col overflow-scroll max-h-80">
            {productModel.options?.map((productOptions) => {
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
                                 optionStyle="small"
                                 blockOption={blockFrontEndAdd} />
                           </div>
                        </div>
                     ))}
                  </div>
               )

            })}

         </div>


         <div className="absolute bottom-3 flex flex-row w-full justify-around ">
            <AddRemove optionName="main" quantity={1} onUpdate={onUpdate} />
            <UpdateCart onClick={saveToCartContext} updatedValue={productPrice}>{productQuantiy > 0 ? "Adicionar" : "Remover"}</UpdateCart>
         </div>
      </div>
   )
}
