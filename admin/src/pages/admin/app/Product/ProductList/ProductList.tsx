import { productList } from "./Products"
import styles from "./ProductList.module.scss"
import Image from "next/image"
import { useState } from "react"
import CreateProduct from "../CreateProduct/CreateProduct";
import { MdCancel } from "react-icons/md"

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

   const productTest = {
      name: "Petit gateau",
      description: "petiti gateau gostoso",
      price: "12",
      quantity: "20",
      image_url: "https://www.acasaencantada.com.br/wp-content/uploads/2021/07/Mousse-de-chocolate-zero-acucar.webp",
      options: [
         {
            id: "123123",
            name: "testtt",
            isRequired: false,
            maximumQuantity: "2",
            items: [

            ]
         }
      ],
      createOrUpdate: "update"
   }

   function handleSerach(event: any) {
      event?.preventDefault()
      setImputedValue(event.target.value)
   }

   function handleClickProdutc() {

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
               <MdCancel className={styles.deleteItem} color="#DC6A6A" size={30} cursor="pointer" onClick={() => { setShowEditProductModal(!showEditProductModal) }} />
               <CreateProduct
                  name={productTest.name}
                  description={productTest.description}
                  createOrUpdate={"update"}
                  image_url={productTest.image_url}
                  options={productTest.options}
                  price={productTest.price}
                  quantity={productTest.quantity}
                  key={productTest.name} />
            </div>
         }

      </div>
   )
}
