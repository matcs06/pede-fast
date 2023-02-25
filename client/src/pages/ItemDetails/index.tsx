import Image from "next/image"
import AddRemove from "../components/AddRemove"
import UpdateCart from "../components/UpdateCart";
import { v4 } from "uuid"

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

export default function ItemDetail() {

   const productModel: ProductType = {
      name: "Mousse de chocolate",
      description: "Delicioso mousse de chocolate com raspas de limão. 220ml",
      image_url: "/test2.png",
      price: "12,00",
      options: [
         {
            id: v4(),
            name: "Escolha o pão",
            isRequired: false,
            maximumQuantity: "0",
            items: [
               {
                  id: v4(),
                  name: "frances",
                  value: ""
               },
               {
                  id: v4(),
                  name: "italiano",
                  value: "2,00"
               },
               {
                  id: v4(),
                  name: "4 queijos",
                  value: "2,00"
               }
            ]
         },
         {
            id: v4(),
            name: "Escolha o molho",
            isRequired: true,
            maximumQuantity: "0",
            items: [
               {
                  id: v4(),
                  name: "barbecue",
                  value: "2,00"
               },
               {
                  id: v4(),
                  name: "branco",
                  value: "2,00"
               },
               {
                  id: v4(),
                  name: "special",
                  value: "2,00"
               }
            ]
         },
         {
            id: v4(),
            name: "Escolha o molho",
            isRequired: true,
            maximumQuantity: "0",
            items: [
               {
                  id: v4(),
                  name: "barbecue",
                  value: "2,00"
               },
               {
                  id: v4(),
                  name: "branco",
                  value: "2,00"
               },
               {
                  id: v4(),
                  name: "special",
                  value: "2,00"
               }
            ]
         }

      ],
      quantity: "12"
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
                        <p className="text-xs select-none bg-secondary-orange h-1/2 w-1/4 rounded-md flex items-center justify-center text-primary-bk">{productOptions.isRequired ? "obrigatório" : "opicional"}  </p>
                     </div>
                     {productOptions.items.map((optionItems) => (
                        <div key={optionItems.id} className="flex mt-2 w-3/4 h-11 px-1 relative  border-b-b-1/5 border-b-light-gray-2">
                           <div className="flex flex-col justify-center">
                              <p className="text-dark-gray text-sm font-normal select-none">{optionItems.name}</p>
                              {Number(optionItems.value[0]) > 0 && <p className="text-xs font-normal mb-1 select-none text-secondary-orange">R$ {optionItems.value}</p>}
                           </div>
                           <div className="absolute right-1 top-2">

                              <AddRemove quantity={0} setQuantity={() => { }} optionStyle="small" />
                           </div>
                        </div>
                     ))}
                  </div>
               )

            })}



         </div>


         <div className="absolute bottom-3 flex flex-row w-full justify-around ">
            <AddRemove quantity={0} setQuantity={() => { }} />
            <UpdateCart updatedValue={12}>Atualizar</UpdateCart>
         </div>
      </div>
   )
}