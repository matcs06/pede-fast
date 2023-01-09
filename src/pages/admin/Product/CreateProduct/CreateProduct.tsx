import { useState } from "react"
import Input from "../../../../components/Input/Input"
import styles from "./CreateProduct.module.scss"
import Button from "../../../../components/Button/Button"
import Options from "./Options"
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

type openedFromType = "new" | "existent"

export default function CreateProduct(props: ProductType) {

   /* Variable to assing default value when called by product create */
   let productNameDefaultValue = ""
   let productDescriptionDefaultValue = ""
   let productPriceDefaultValue = ""
   let productQuantityDefaultValue = ""
   let productImageDefaultValue = ""
   let productOptionsDefaultValue: CreatedOptionType[] = [];

   if (props.createOrUpdate === "update") {
      productNameDefaultValue = props.name
      productDescriptionDefaultValue = props.description
      productPriceDefaultValue = props.price
      productQuantityDefaultValue = props.quantity
      productImageDefaultValue = props.image_url
      productOptionsDefaultValue = props.options

   }

   const [productName, setProductName] = useState(productNameDefaultValue)
   const [productDescription, setProductDescription] = useState(productDescriptionDefaultValue)
   const [productPrice, setProductPrice] = useState(productPriceDefaultValue)
   const [productStock, setProductStock] = useState(productQuantityDefaultValue)
   const [showModal, setShowModal] = useState(false)
   const [openedFrom, setOpenedFrom] = useState<openedFromType>("new")

   const [options, setOptions] = useState<CreatedOptionType[]>(productOptionsDefaultValue) /* all created options */

   /* variables to store addtional values */
   const [chosedOption, setChoosedOption] = useState<CreatedOptionType>();


   function handleClick() {
      console.log("clicado no botao")
   }

   //FUNCAO QUE MOSTRA NOVA OPCAO NA TELA DE CRIACAO (CHAMADA COMO PROPS NO COMPONENTE Options)
   function handleNewItem(newOption: CreatedOptionType) {
      setOptions([...options, newOption]) /* adding a new option from additional panel */
   }

   //FUNCAO QUE ATUALIZA UMA OPCAO EXISTENTE NA TELA DE CRIACAO (CHAMADA COMO PROPS NO COMPONENTE Options)
   function handleUpdateOption(updatedOption: CreatedOptionType) {
      const updatedOptions = options.map((option) => {
         if (option.id === updatedOption.id) {
            return updatedOption
         } else {
            return option
         }

      })

      setOptions(updatedOptions)
   }

   //FUNCAO PARA ABRIR PARA CRIAR UMA NOVA OPCAO
   function addOption() {
      setOpenedFrom("new")
      setShowModal(!showModal)
   }

   //FUNCAO QUE ABRE UMA OPCAO EXISTENTE, PERMITINDO ATUALIZAR A OPCAO
   function onClickAdditionals(id: string) {
      //passando a opcao escolhida para o modal
      const optionsChosed = options.filter((option) => option.id === id)

      setChoosedOption(optionsChosed[0])
      setOpenedFrom("existent")
      setShowModal(true)

   }

   function handleDeleteOption(id: string) {
      const optionsAfterDeleted = options.filter((option) => option.id != id)

      setOptions(optionsAfterDeleted)
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
               <h4 onClick={addOption}>Opçoes e Adicionais</h4>
               <ul>
                  {options.map((option) =>
                     <div key={option.id} className={styles.newItemsContainer}>
                        <li onClick={() => onClickAdditionals(option.id)}>{option.name}</li>
                        <MdCancel className={styles.deleteItem} color="#DC6A6A" size={30} cursor="pointer" onClick={() => handleDeleteOption(option.id)} />
                     </div>

                  )}
               </ul>
            </div>

            <div className={styles.buttonContainerparent}>
               <Button handleClick={handleClick}>{props.createOrUpdate === "update" ? "Atualizar produto" : "Criar Produto"}</Button>
            </div>

         </div>
         {showModal && (
            < Options createAdditional={handleNewItem}
               updateOption={handleUpdateOption}
               setShowModal={setShowModal}
               productName={productName}
               chosedOption={chosedOption}
               openedFrom={openedFrom}
            />
         )}
      </>

   )
}