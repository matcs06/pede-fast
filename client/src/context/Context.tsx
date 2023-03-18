import { useContext, createContext, useState } from "react";

interface ChoosedOptions {
   optionTitle: string,
   optionName: string,
   optionQuantity: number,
   optionPrice: number
}

interface IOrderProducts {
   id: string;
   productName: string,
   productQuantity: number,
   productOrderPrice: number,
   product_image_url?: string,
   options?: ChoosedOptions[]
}

export const CartContext = createContext([]) as any


export function useCartContext(): any {
   return useContext(CartContext)
}

export function MyCartContextWrapper({ children }: any) {

   const [myCart, setMyCart] = useState<IOrderProducts[]>([])


   function updateCart(new_item: IOrderProducts, add_or_remove: "add" | "remove") {
      console.log(new_item)



      if (add_or_remove === "add") {
         setMyCart([...myCart, new_item])

      }

      if (add_or_remove === "remove") {
         const deletedProducts = myCart.filter((prod) => prod.id !== new_item.id)
         setMyCart([...deletedProducts])
      }


   }

   return (
      <CartContext.Provider value={[myCart, updateCart]}>
         {children}
      </CartContext.Provider>
   )

}

