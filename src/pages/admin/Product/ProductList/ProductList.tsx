import { productList } from "./Products"
import styles from "./ProductList.module.scss"
import Image from "next/image"
import { useState } from "react"
export default function ProductList() {
   const [inputedValue, setImputedValue] = useState("")

   const fielteredProducts = productList.filter((item) => item.title.toLocaleLowerCase().includes(inputedValue.toLocaleLowerCase()))

   function handleSerach(event: any) {
      event?.preventDefault()
      setImputedValue(event.target.value)
   }


   return (
      <div className={styles.productMenu}>

         <form action="">
            <input type="text" placeholder="Busque por um produto" onChange={handleSerach} />
         </form>
         <main className={styles.producsList}>

            {fielteredProducts.map((product: any, index) => {
               return (
                  <div key={index} className={styles.productCard}>
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
      </div>
   )
}
