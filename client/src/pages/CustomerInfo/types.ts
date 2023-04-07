interface ChoosedOptions {
   optionTitle: string,
   optionName: string,
   optionQuantity: number,
   optionPrice: number
}

export interface IOrderProducts {
   id: string;
   productName: string,
   productQuantity: number,
   productOrderPrice: number,
   productOriginalPrice: number,
   product_image_url?: string,
   options: ChoosedOptions[]
}
