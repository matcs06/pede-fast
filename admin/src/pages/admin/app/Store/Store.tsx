import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import styles from "./Store.module.scss"
import { HexColorPicker } from "react-colorful";
import ImageUploading from 'react-images-uploading';
import instace from "../../../../api/hello";

interface IStoreInfo {
   business_name: string,
   address: string,
   phone: string,
   business_image_url: string,
   store_status: "closed" | "opened",
}

interface Images {
   data_url: string,
   file: any,
}


export default function Store() {

   const [storeName, setStoreName] = useState("")
   const [storeAddress, setSoreAddress] = useState("")
   const [storePhoneNumber, setStorePhoneNumber] = useState("")
   const [storeImageUrl, setStoreImageUrl] = useState("")

   //const [bannerCollor, setBannerCollor] = useState("#aabbcc")
   //const [showPicker, setShowPicker] = useState(false)
   const [images, setImages] = useState<Images[]>([])
   const [storeStatus, setStoreStatus] = useState("")


   const token = String(localStorage.getItem("token"))
   const user_id = String(localStorage.getItem("user_id"))
   const username = String(localStorage.getItem("username"))
   let usernameload = ""
   const status = [
      { key: 1, status: "aberto" },
      { key: 2, status: "fechado" }

   ]

   const onImageChange = (imageList: any, addUpdateIndex: any) => {
      // data for submit
      setImages(imageList);
   };

   const onClickStatus = async () => {

      try {
         await instace.patch("/users/updateStoreStatus", {
            store_status: storeStatus == "opened" ? "closed" : "opened"
         }, {
            headers: {
               Authorization: "Bearer " + token,
            },
         })

         const displayStatus = storeStatus == "opened" ? "Fechada" : "Aberta"
         setStoreStatus(storeStatus == "opened" ? "closed" : "opened")
         window.alert(`Loja ${displayStatus} com sucesso!`)
      } catch (error) {
         window.alert(`Erro ao atualizar!`)
      }



   }

   useEffect(() => {

   }, [storeStatus])

   useEffect(() => {
      usernameload = String(localStorage.getItem("username"))

      async function loadUserInfo() {
         const response = await instace.get<IStoreInfo>(`/users/${usernameload}`)

         setSoreAddress(response.data.address)
         setStoreName(response.data.business_name)
         setStorePhoneNumber(response.data.phone)
         setStoreStatus(response.data.store_status)


         const imagePrefixLink = `http://localhost:3333/files/${usernameload}/profile/`
         setStoreImageUrl(imagePrefixLink + response.data.business_image_url)

      }

      loadUserInfo()

      return () => {
         setSoreAddress("")
         setStoreName("")
         setStorePhoneNumber("")
         setStoreStatus("")

      }
   }, [])

   async function handleSaveBusinesInfo() {
      const formData = new FormData()

      const update_image = images[0] == null ? "no" : "yes"
      if (images[0] == null) {
         const imagesdata = {
            file: "fake",
            data_url: "fake",
         }
         images[0] = imagesdata
      }


      try {
         formData.append("user_id", user_id)
         formData.append("username", username)
         formData.append("phone", storePhoneNumber)
         formData.append("business_name", storeName)
         formData.append("address", storeAddress)
         formData.append("update_image", update_image)
         formData.append("image_from", "user")
         formData.append("filename", images[0].file)

         await instace.patch("users/updateBusiness", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: "Bearer " + token,
            },
         })

         window.alert("Configuracoes salvas com sucesso")
      } catch (error) {
         window.alert("Erro ao atualizar informacoes")
      }

      //Reseting null to image state if it was assigned value to prevent error
      if (images[0] !== null) {
         if (images[0].file == "fake") {
            images[0] == null
         }
      }


   }

   return (
      <div className={styles.mainContainer}>
         <h3>Configurar Loja</h3>
         <div className={styles.inputContainer}>
            <Input setFieldValue={setStoreName} placeholder={"Nome da Loja"} name={"store name"} value={storeName} />
            <Input setFieldValue={setSoreAddress} placeholder={"Endereço"} name={"store address"} value={storeAddress} />
            <Input setFieldValue={setStorePhoneNumber} placeholder={"Telefone"} name={"store phone"} value={storePhoneNumber} />

            {storeStatus == "opened" ? (
               <div onClick={onClickStatus} style={{ background: "#43c14b" }} className={styles.storeStatusStyle}>
                  Loja aberta - Fechar Loja
               </div>
            ) :
               (
                  <div onClick={onClickStatus} style={{ background: "#cf3b1d", }} className={styles.storeStatusStyle}>
                     Loja Fechada - Abrir Loja
                  </div>
               )
            }


         </div>
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
                           {storeImageUrl ? "Atualizar imagem" : "Adicionar uma images"}
                        </button>
                     )}

                     &nbsp;
                     {images[0] == null &&
                        <div className={styles.imageItemContainer}>
                           <img src={storeImageUrl} alt="imagem" width={120} height={120} />

                        </div>
                     }

                     {imageList.map((image, index) => (
                        <div key={index} className={styles.imageItemContainer}>
                           <img src={image['data_url']} alt="" width={120} height={120} />
                           <div className={styles.updateRemoveImageContainer}>
                              <button onClick={() => onImageUpdate(index)}>Trocar</button>
                              <button onClick={() => onImageRemove(index)}>Voltar</button>
                           </div>
                        </div>
                     ))
                     }


                  </div>
               )}
            </ImageUploading>
         </div>
         <div className={styles.buttonContainer}>

            <Button handleClick={handleSaveBusinesInfo}>Salvar</Button>
         </div>
      </div>
   )
} 