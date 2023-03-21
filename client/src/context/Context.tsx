import { useContext, createContext, useState } from "react";
import { IOrderProducts } from "./types";

export const CartContext = createContext([]) as any
export const SubTractOrAdd = createContext([]) as any

export function useCartContext(): any {
   return useContext(CartContext)
}

export function useSubTractOrAdd(): any {
   return useContext(SubTractOrAdd)
}

export function MyCartContextWrapper({ children }: any) {

   const [myCart, setMyCart] = useState<IOrderProducts[]>([])


   function updateCart(new_item: IOrderProducts, add_or_remove: "add" | "remove") {

      if (add_or_remove === "add") {
         setMyCart([...myCart, new_item])

      }

      if (add_or_remove === "remove") {
         const deletedProducts = myCart.filter((prod) => prod.id !== new_item.id)
         setMyCart(deletedProducts)
      }


   }
   // trabalhar nessa componente para subtrair e adicionar no carrinho
   function subtractOrAdd(id: string, add_or_remove: "add" | "remove") {

      const findProduct = myCart.filter((prod) => prod.id === id)

      if (add_or_remove === "add") {
         findProduct[0].productQuantity = findProduct[0].productQuantity + 1
         findProduct[0].productOrderPrice = findProduct[0].productOrderPrice + findProduct[0].productOriginalPrice
      }

      if (add_or_remove === "remove" && findProduct[0].productQuantity > 0) {
         findProduct[0].productQuantity = findProduct[0].productQuantity - 1
         findProduct[0].productOrderPrice = findProduct[0].productOrderPrice - findProduct[0].productOriginalPrice
      }
      const updatedProduct = myCart.filter((prod) => {

         if (prod.productQuantity > 0) {
            if (prod.id === id) {
               return findProduct[0]
            }
            else {
               return prod
            }
         }

      })

      setMyCart(updatedProduct)

   }

   return (
      <CartContext.Provider value={[myCart, updateCart]}>
         <SubTractOrAdd.Provider value={subtractOrAdd}>
            {children}
         </SubTractOrAdd.Provider>

      </CartContext.Provider>
   )

}

