import { useState } from "react"
import Input from "../../../../components/Input/Input"
import styles from "./CreateProduct.module.scss"
import Button from "../../../../components/Button/Button"
import Options from "./Options"

interface ProductOptions {
   name: string,
   optional: boolean,
   maximum_quantity: number,
   items: [
      {
         name: string,
         value: string
      }
   ]
}

export default function CreateProduct() {

   const [productName, setProductName] = useState("")
   const [productDescription, setProductDescription] = useState("")
   const [productPrice, setProductPrice] = useState("")
   const [productStock, setProductStock] = useState("")
   const [showModal, setShowModal] = useState(false)

   const [producOptions, setProductOptions] = useState<ProductOptions>()

   function handleClick() {
      console.log("clicado no botao")
   }


   return (
      <>
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
            </form>

            <div className={styles.imageUploadContainer}>
               <input type="file" />
            </div>

            <div className={styles.options}>
               <h4 onClick={() => setShowModal(!showModal)}>Opçoes e Adicionais</h4>
               <ul>
                  <li>Molho</li>

               </ul>
            </div>

            <div className={styles.buttonContainerparent}>
               <Button handleClick={handleClick}>Adicionar Produto</Button>
            </div>

         </div>
         {showModal && (
            < Options setShowModal={setShowModal} productName={productName} />
         )}
      </>

   )
}