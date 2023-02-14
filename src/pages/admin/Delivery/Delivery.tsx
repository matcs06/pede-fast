import styles from "./Delivery.module.scss"
import { useState } from "react"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import { AiFillPlusCircle } from "react-icons/ai"

import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import CheckBox from "../../../components/CheckBox/CheckBox"
import Condition from "./Condition"

export default function Delivery() {
   const [deliveryTax, setDeliveryTax] = useState("")
   const [checkBox, setCheckBox] = useState(false)
   const [selectedCondition, setSelectedCondition] = useState("")
   const [paramter, setParameter] = useState("")

   const [showDropDown, setShowDropDown] = useState(false)

   const [showCreateCondition, setShowCreateCondition] = useState(false)

   const discountConditions = [
      "Valor do item",
      "Quantidade",
      "Valor do item",
      "Quantidade"
   ]


   function handleBoxCheck() {
      setCheckBox(!checkBox)
   }

   function handleShowDropDown(option: string) {

      if (option !== "") {

         setSelectedCondition(option)
      }
      setShowDropDown(!showDropDown)
   }

   return (
      <div className={styles.mainContainer}>
         <h3>Configurar Entrega e desconto</h3>
         <div className={styles.deliveryTaxContainer}>
            <p>Taxa de Entrega: </p>
            <Input type={"number"} setFieldValue={setDeliveryTax} /> R$
         </div>

         <div className={styles.diccountToggle}>

            <CheckBox checkBoxLabel={"Desconto:"} checked={checkBox} setChange={handleBoxCheck} />
         </div>

         {checkBox && (
            <div className={styles.condition}>
               <ul className={styles.dropDownContainer} >
                  <div className={styles.inputArrowContainer}>
                     <Input value={selectedCondition} name={"discount"} type={"text"} placeholder={"Condição"} readOnly={"readonly"} setFieldValue={setDeliveryTax} />
                     <BsFillArrowDownCircleFill size={20} className={styles.arrow} onClick={() => { handleShowDropDown("") }} />
                     <AiFillPlusCircle size={20} className={styles.add} onClick={() => setShowCreateCondition(true)} />

                  </div>



                  {discountConditions.map((option, index) => (

                     <li key={index} style={{ display: showDropDown ? "flex" : "none" }} onClick={() => { handleShowDropDown(option) }}>{option}</li>
                  ))}
               </ul>

               <div className={styles.bottomContainer}>

                  <div className={styles.parameterContainer}>
                     <p>Parametro: </p>
                     <Input setFieldValue={setParameter} name={"parameter"} />
                  </div>

                  <div className={styles.parameterContainer}>
                     <p>Porcentagem: </p>
                     <Input setFieldValue={setParameter} name={"parameter"} type={"number"} />
                  </div>
               </div>


            </div>
         )}
         <div className={styles.buttonContainer}>
            <Button>Salvar</Button>
         </div>
         {showCreateCondition && (
            <div className={styles.conditionModal}>
               <Condition showModal={setShowCreateCondition} />
            </div>
         )}

      </div>
   )
}