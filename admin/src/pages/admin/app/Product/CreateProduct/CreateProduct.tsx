import { useState } from "react"
import Input from "../../../../../components/Input/Input"
import styles from "./CreateProduct.module.scss"
import Button from "../../../../../components/Button/Button"
import Options from "./Options"
import { MdCancel } from "react-icons/md"

import ImageUploading from 'react-images-uploading';
import instace from "../../../../../api/hello"


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

interface Images {
   data_url: string,
   file: any,
}

type openedFromType = "new" | "existent"

export default function CreateProduct({ ...props }: ProductType) {
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
   const [images, setImages] = useState<Images[]>([])

   const [showModal, setShowModal] = useState(false)
   const [openedFrom, setOpenedFrom] = useState<openedFromType>("new")

   const [options, setOptions] = useState<CreatedOptionType[]>(productOptionsDefaultValue) /* all created options */


   const username = String(localStorage.getItem("username"))
   const token = String(localStorage.getItem("token"))
   const user_id = String(localStorage.getItem("user_id"))

   /* variables to store addtional values */
   const [chosedOption, setChoosedOption] = useState<CreatedOptionType>();


   async function handleCreateUpdateProduct() {
      console.log("clicado no botao")

      const formData = new FormData()


      try {

         formData.append("name", productName)
         formData.append("description", productDescription)
         formData.append("price", productPrice)
         formData.append("user_id", user_id)
         formData.append("options", JSON.stringify(options))
         formData.append("quantity", productStock)
         formData.append("filename", images[0].file)

         await instace.post("/products", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: "Bearer " + token,
            },
         });
         window.alert(`Produto ${productName} criado com sucesso`);
      } catch (error) {
         window.alert(
            "erro ao criar novo produto: Verifique se está logado ou produtos com o mesmo nome e tente novamente"
         );

      }

   }

   console.log(images[0])

   //FUNCAO QUE MOSTRA NOVA OPTION NA TELA DE CRIACAO (CHAMADA COMO PROPS NO COMPONENTE Options)
   function handleNewOption(newOption: CreatedOptionType) {
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

   //FUNCAO PARA ABRIR PARA CRIAR UMA NOVA OPTION
   function addOption() {
      setOpenedFrom("new")
      setShowModal(!showModal)
   }

   //FUNCAO QUE ABRE UMA OPTION EXISTENTE, PERMITINDO ATUALIZAR A OPTION
   function onClickAdditionals(id: string) {
      //passando a opcao escolhida para o modal
      const optionsChosed = options.filter((option) => option.id === id)

      setChoosedOption(optionsChosed[0])
      setOpenedFrom("existent")
      setShowModal(true)

   }

   //FUNCAO QUE DELETA UMA OPTION DA TELA DE PRODUTOS
   function handleDeleteOption(id: string) {
      const optionsAfterDeleted = options.filter((option) => option.id != id)

      setOptions(optionsAfterDeleted)
   }

   const onImageChange = (imageList: any, addUpdateIndex: any) => {
      // data for submit
      setImages(imageList);
   };

   return (
      <>
         <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
               <header>Adicione um novo produto</header>
            </div>

            <form action="" className={styles.inputContainer}>
               <Input type="text" value={productName} autoComplete="off" setFieldValue={setProductName} name={"productName"} placeholder="Nome do Produto" />
               <Input type="text" value={productDescription} setFieldValue={setProductDescription} name={"Description"} placeholder="Descrição" />

               <div className={styles.priceAndStockContainer}>
                  <p>Preço:</p>
                  <Input type="number" value={productPrice} setFieldValue={setProductPrice} name={"price"} />
                  <p>Estoque: </p>
                  <Input type="number" value={productStock} setFieldValue={setProductStock} name={"stock"} />
               </div>
            </form>

            <div className={styles.imageUploadContainer}>
               <ImageUploading
                  multiple={false}
                  value={images}
                  onChange={onImageChange}
                  dataURLKey="data_url"
               >
                  {({
                     imageList,
                     onImageUpload,
                     onImageUpdate,
                     onImageRemove,
                     isDragging,
                     dragProps,
                  }) => (
                     // write your building UI
                     <div className={styles.addImageContainer}>
                        {images.length == 0 && (
                           <button
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                           >
                              Adicione uma imagem
                           </button>
                        )}

                        &nbsp;
                        {imageList.map((image, index) => (
                           <div key={index} className={styles.imageItemContainer}>
                              <img src={image['data_url']} alt="" width="100" />
                              <div className={styles.updateRemoveImageContainer}>
                                 <button onClick={() => onImageUpdate(index)}>Atualizar</button>
                                 <button onClick={() => onImageRemove(index)}>Remover</button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </ImageUploading>
            </div>

            <div className={styles.options}>
               <h4 onClick={addOption}>Opçoes e Adicionais</h4>
               <ul>
                  {options?.map((option) =>
                     <div key={option.id} className={styles.newItemsContainer}>
                        <li onClick={() => onClickAdditionals(option.id)}>{option.name}</li>
                        <MdCancel className={styles.deleteItem} color="#DC6A6A" size={30} cursor="pointer" onClick={() => handleDeleteOption(option.id)} />
                     </div>

                  )}
               </ul>
            </div>

            <div className={styles.buttonContainerparent}>
               <Button handleClick={handleCreateUpdateProduct}>{props.createOrUpdate === "update" ? "Atualizar produto" : "Criar Produto"}</Button>
            </div>

         </div>
         {showModal && (
            < Options createAdditional={handleNewOption}
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