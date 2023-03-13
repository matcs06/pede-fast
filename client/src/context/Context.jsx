import { useContext, createContext, useState } from "react";

export const CartContext = createContext([])

/* interface IProduct {
   product_name: string,
   product_quantity: number,
   product_options: []
}
interface ICartType {
   products: IProduct[]
} */


function useCartContext() {
   return useContext(CartContext)
}

export function MyCartContextWrapper({ children }) {

   const [myCart, setMyCart] = useState([])


   function updateCart(new_value) {
      setMyCart([...myCart, new_value])
   }

   return (
      <CartContext.Provider value={[myCart, updateCart]}>
         {children}
      </CartContext.Provider>
   )

}

