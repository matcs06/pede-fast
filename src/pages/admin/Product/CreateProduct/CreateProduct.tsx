import { useEffect, useState } from "react"
import Input from "../../../../components/Input/Input"
import styles from "./CreateProduct.module.scss"
export default function CreateProduct() {

   const [productName, setProductName] = useState("")
   const [productDescription, setProductDescription] = useState("")
   const [productPrice, setProductPrice] = useState("")
   const [productStock, setProductStock] = useState("")


   return (
      <div className={styles.mainContainer}>
         <div className={styles.headerContainer}>
            <header>Adicione um novo produto</header>
         </div>

         <form action="" className={styles.inputContainer}>
            <Input type="text" autoComplete="off" setFieldValue={setProductName} name={"productName"} placeholder="Nome do Produto" />
            <Input type="text" setFieldValue={setProductDescription} name={"Description"} placeholder="Descrição" />

            <div className={styles.priceAndStockContainer}>
               <Input type="number" setFieldValue={setProductPrice} name={"price"} placeholder="Preço" />
               <Input type="number" setFieldValue={setProductStock} name={"stock"} placeholder="Quantidade" />
            </div>

            <div>
               <input type="file" />
            </div>
         </form>

      </div>
   )
}