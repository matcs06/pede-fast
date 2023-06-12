import { productList } from "./Products"
import styles from "./ProductList.module.scss"
import Image from "next/image"
import { useEffect, useState } from "react"
import CreateProduct from "../CreateProduct/CreateProduct";
import { MdCancel } from "react-icons/md"
import instace from "../../../../../api/hello";
import { BRLReais } from "../../../../../utils/CurrencyFormat"


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
   id: string,
   name: string,
   description: string,
   price: string,
   quantity: string,
   image_url: string,
   options: CreatedOptionType[]
   createOrUpdate?: "create" | "update"
}

export default function ProductList() {
   const [inputedValue, setImputedValue] = useState("")

   const [producListApi, setProductListApi] = useState<ProductType[]>([])

   const fielteredProducts = producListApi.filter((item: ProductType) => item.name.toLocaleLowerCase().includes(inputedValue.toLocaleLowerCase()))
   const [showEditProductModal, setShowEditProductModal] = useState(false)

   let user_id: string;
   let username: string;
   user_id = String(localStorage.getItem("user_id"))
   username = String(localStorage.getItem("username"))

   const imagePrefixLink = "http://localhost:3333/files/"
   const [productSelected, setProductSelected] = useState<ProductType>({ description: "", id: "", image_url: "", name: "", options: [], price: "", quantity: "", createOrUpdate: "update" })

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

   useEffect(() => {

      async function loadProducts() {
         try {
            const response = await instace.get(`products/?user_id=${user_id}`)
            setProductListApi(response.data)
         } catch (error) {
            window.alert("erro ao listar produtos")
            console.log(error)
         }
      }

      loadProducts()

      return () => {
         setProductListApi([])
      }
   }, [])

   function handleSerach(event: any) {
      event?.preventDefault()
      setImputedValue(event.target.value)
   }

   function handleClickProdutc(product_id: string) {

      const choosedProduct = producListApi.filter((product) => product.id === product_id)

      setProductSelected(choosedProduct[0])
      setShowEditProductModal(true)

   }


   return (
      <div className={styles.productMenu}>

         <form action="">
            <input type="text" placeholder="Busque por um produto" onChange={handleSerach} />
         </form>
         <main className={styles.producsList} >

            {fielteredProducts.map((product: ProductType, index) => {
               return (
                  <div key={index} className={styles.productCard} onClick={() => handleClickProdutc(product.id)}>
                     <div className={styles.imageContainer}>
                        <Image className={styles.productImage} width={270} height={200} src={imagePrefixLink + username + "/" + product.image_url} alt="imagem" />
                     </div>
                     <p className={styles.productTile}>{product.name}</p>
                     <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <p className={styles.productQuantity}>Estoque: {product.quantity} </p>
                        <p>{BRLReais.format(Number(product.price))}</p>
                     </div>
                  </div>
               )
            })}
         </main>
         {showEditProductModal &&
            <div className={styles.editProductModal}>
               <MdCancel className={styles.deleteItem} color="#DC6A6A" size={30} cursor="pointer" onClick={() => { setShowEditProductModal(!showEditProductModal) }} />
               <CreateProduct
                  name={productSelected.name}
                  description={productSelected.description}
                  createOrUpdate={"update"}
                  image_url={productSelected.image_url}
                  options={productSelected.options}
                  price={productSelected.price}
                  quantity={productSelected.quantity}
                  key={productSelected.name} />
            </div>
         }

      </div>
   )
}
