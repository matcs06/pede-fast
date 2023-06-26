import { BRLReais } from "@/utils/currencyFormat"
import { IOrderProducts } from "./types"

export function FormatMessage(cartMessage: IOrderProducts[]) {

   const formatedMessage = cartMessage.map((product, index) => {
      return `${product.productQuantity}x - ${product.productName}/  ${product.options?.length > 0 && "Adicionais: /" + product.options?.map((item) => "   " + item.optionName + " " + BRLReais.format(item.optionPrice).replace(",", ".") + "/")}  Subtotal: ${BRLReais.format(product.productOrderPrice).replace(",", ".")}//`


   })

   let orderContent = JSON.stringify(formatedMessage)

   orderContent = orderContent.replaceAll("/", "\n")
   orderContent = orderContent.replaceAll("false", "")
   orderContent = orderContent.replaceAll("[", "")
   orderContent = orderContent.replaceAll("]", "")
   orderContent = orderContent.replaceAll(",", "")
   orderContent = orderContent.replaceAll("\"", "")
   orderContent = orderContent.replaceAll(".", ",")

   return orderContent

}


