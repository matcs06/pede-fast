import { useContext, createContext, useState } from "react";
import { IOrderProducts } from "./types";

export const CartContext = createContext([]) as any
export const SubTractOrAdd = createContext([]) as any

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

   function subtractOrAdd(id: string, add_or_remove: "add" | "remove") {


   }

   return (
      <CartContext.Provider value={[myCart, updateCart]}>
         <SubTractOrAdd.Provider value={subtractOrAdd}>
            {children}
         </SubTractOrAdd.Provider>

      </CartContext.Provider>
   )

}

