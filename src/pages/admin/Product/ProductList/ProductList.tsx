import { productList } from "./Products"
import styles from "./ProductList.module.scss"
import Image from "next/image"
import { useState } from "react"
import SideBar from "../../../../components/SideBar/SideBar";
import CreateProduct from "../CreateProduct/CreateProduct";

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

interface ProductType {
   name: string,
   description: string,
   price: string,
   quantity: string,
   image_url: string,
   options: CreatedOptionType[]
   createOrUpdate: "create" | "update"

}

export default function ProductList() {
   const [inputedValue, setImputedValue] = useState("")
   const fielteredProducts = productList.filter((item) => item.title.toLocaleLowerCase().includes(inputedValue.toLocaleLowerCase()))
   const [showEditProductModal, setShowEditProductModal] = useState(false)

   function handleSerach(event: any) {
      event?.preventDefault()
      setImputedValue(event.target.value)
   }

   function handleClickProdutc() {
      console.log("entrou aqui")

      setShowEditProductModal(true)

   }


   return (
      <div className={styles.productMenu}>

         <form action="">
            <input type="text" placeholder="Busque por um produto" onChange={handleSerach} />
         </form>
         <main className={styles.producsList} >

            {fielteredProducts.map((product: any, index) => {
               return (
                  <div key={index} className={styles.productCard} onClick={handleClickProdutc}>
                     <div className={styles.imageContainer}>
                        <Image className={styles.productImage} width={270} height={200} src={product.image} alt="imagem" />
                     </div>
                     <p className={styles.productTile}>{product.title}</p>
                     <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <p className={styles.productQuantity}>Estoque:{product.quantity} </p>
                        <p>R$ {product.price}</p>
                     </div>
                  </div>
               )
            })}
         </main>
         {showEditProductModal &&
            <div className={styles.editProductModal}>
            </div>
         }

      </div>
   )
}
