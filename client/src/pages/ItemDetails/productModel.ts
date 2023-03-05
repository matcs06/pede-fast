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

export const productModel: ProductType = {
   name: "Mousse de chocolate",
   description: "Delicioso mousse de chocolate com raspas de limão. 220ml",
   image_url: "/test2.png",
   price: "12,00",
   options: [
      {
         id: v4(),
         name: "Escolha o pão",
         isRequired: false,
         maximumQuantity: "1",
         items: [
            {
               id: v4(),
               name: "frances",
               value: "2.00"
            },
            {
               id: v4(),
               name: "italiano",
               value: "2.00"
            },
            {
               id: v4(),
               name: "4 queijos",
               value: "2.00"
            }
         ]
      },
      {
         id: v4(),
         name: "Escolha o molho",
         isRequired: true,
         maximumQuantity: "",
         items: [
            {
               id: v4(),
               name: "barbecue",
               value: "2.50"
            },
            {
               id: v4(),
               name: "branco",
               value: "2.50"
            },
            {
               id: v4(),
               name: "special",
               value: "2"
            }
         ]
      }

   ],
   quantity: "12"
}