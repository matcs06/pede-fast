interface IDelivery {
   tax: string;
   has_discount: boolean;
   condition: string;
   parameter: string;
   discount_percentage: string
}

export function ApplyDiscount(data: IDelivery, order_items_quantity: number, order_total: number, order_cupom: string) {
   let discountValue = 0
   if (data.condition == "Quantidade de itens-maior ou igual") {
      if (Number(order_items_quantity) >= Number(data.parameter)) {
         discountValue = Number(data.tax) * (Number(data.discount_percentage) / 100)
      }

   }

   if (data.condition == "Valor do pedido-maior ou igual") {
      if (order_total >= Number(data.parameter)) {
         discountValue = Number(data.tax) * (Number(data.discount_percentage) / 100)
      }
   }


   if (data.condition == "Cupom-igual") {
      if (order_cupom == data.parameter) {
         discountValue = Number(data.tax) * (Number(data.discount_percentage) / 100)
      }
   }


   return discountValue
}