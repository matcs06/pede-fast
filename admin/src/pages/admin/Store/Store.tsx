import { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "./Store.module.scss"
import { HexColorPicker } from "react-colorful";
import ImageUploading from 'react-images-uploading';


export function Store() {

   const [storeName, setStoreName] = useState("")
   const [storeAddress, setSoreAddress] = useState("")
   const [bannerCollor, setBannerCollor] = useState("#aabbcc")
   const [showPicker, setShowPicker] = useState(false)
   const [images, setImages] = useState([])
   const [storeStatus, setStoreStatus] = useState("")
   const [displayStatus, setDisplayStatus] = useState(false)

   const status = [
      { key: 1, status: "aberto" },
      { key: 2, status: "fechado" }

   ]

   const onImageChange = (imageList: any, addUpdateIndex: any) => {
      // data for submit
      setImages(imageList);
   };

   const onClickStatus = (storeStatus: string) => {
      setStoreStatus(storeStatus)
      setDisplayStatus(false)
   }

   return (
      <div className={styles.mainContainer}>
         <h3>Configurar Loja</h3>
         <div className={styles.inputContainer}>
            <Input setFieldValue={setStoreName} placeholder={"Nome da Loja"} name={"store name"} />
            <Input setFieldValue={setSoreAddress} placeholder={"Endereço"} name={"store address"} />
            <div className={styles.chooseColorContainer}>
               <p>Cor secundária:</p>
               <Input onClick={() => setShowPicker(true)} value={bannerCollor} setFieldValue={() => { }} placeholder={"Cor do banner"} name={"banner collor"} />

            </div>
            <div className={styles.statusContainer}>
               <p>Status: </p>
               <ul >
                  <p style={{ color: storeStatus === "aberto" ? "#0ed004" : "#F24E1E" }} onClick={() => setDisplayStatus(!displayStatus)}>{storeStatus == "" ? "Selecione" : storeStatus}</p>

                  {displayStatus && status.map((sstatus) =>

                     <li style={{ color: sstatus.status === "aberto" ? "#0ed004" : "#F24E1E" }} key={sstatus.key} onClick={() => onClickStatus(sstatus.status)}>{sstatus.status}</li>
                  )}

               </ul>
            </div>
            {showPicker && (
               <div className={styles.colorPicker}>

                  <HexColorPicker onMouseLeave={() => setShowPicker(false)} hidden={showPicker} color={bannerCollor} onChange={setBannerCollor} />
               </div>

            )}
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
         <div className={styles.buttonContainer}>

            <Button >Salvar</Button>
         </div>
      </div>
   )
} 