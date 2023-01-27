import { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "./Store.module.scss"
import { HexColorPicker } from "react-colorful";


export function Store() {

   const [storeName, setStoreName] = useState("")
   const [storeAddress, setSoreAddress] = useState("")
   const [bannerCollor, setBannerCollor] = useState("#aabbcc")
   const [showPicker, setShowPicker] = useState(false)

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
            {showPicker && (
               <div className={styles.colorPicker}>

                  <HexColorPicker onMouseLeave={() => setShowPicker(false)} hidden={showPicker} color={bannerCollor} onChange={setBannerCollor} />
               </div>

            )}
         </div>
         <div className={styles.imageUploadContainer}>
            <input placeholder="Escolha a perfil da loja" type="file" />
         </div>
         <div className={styles.buttonContainer}>

            <Button >Salvar</Button>
         </div>
      </div>
   )
} 