interface ChoosedOptions {
   optionTitle: string,
   optionName: string,
   optionQuantity: number,
   optionPrice: number
}

export interface IOrderProducts {
   id?: string,
   productName?: string,
   productQuantity: number,
   productOrderPrice: number,
   productOriginalPrice: number,
   product_image_url?: string,
   options?: ChoosedOptions[]
}

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

export interface IProductType {
   id?: string,
   name?: string,
   description?: string,
   price?: string,
   quantity?: string,
   image_url?: string,
   options?: CreatedOptionType[]
   setShowSelf: Function

}

// Format of options being saved in array
export interface ProductOrderOptions {
   optionTitle: string,
   optionName: string,
   optionPrice: number,
   optionQuantity: number,
}
