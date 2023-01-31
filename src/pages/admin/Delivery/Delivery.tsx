import styles from "./Delivery.module.scss"
import Input from "../../../components/Input/Input"
import CheckBox from "../../../components/CheckBox/CheckBox"
import Dropdown from 'react-dropdown';
import { useState } from "react"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
export default function Delivery() {
   const [deliveryTax, setDeliveryTax] = useState("")
   const [checkBox, setCheckBox] = useState(false)
   const [selectedCondition, setSelectedCondition] = useState("")
   const [showDropDown, setShowDropDown] = useState(false)

   const discountConditions = [
      "Valor do item",
      "Quantidade"
   ]


   function handleBoxCheck() {
      setCheckBox(!checkBox)
   }

   function handleShowDropDown() {
      setShowDropDown(!showDropDown)
   }

   return (
      <div className={styles.mainContainer}>
         <h3>Configurar Entrega e desconto</h3>
         <div className={styles.deliveryTaxContainer}>
            <p>Taxa de Entrega: </p>
            <Input type={"number"} setFieldValue={setDeliveryTax} /> R$
         </div>
         <CheckBox checkBoxLabel={"Adicionar desconto:"} checked={checkBox} setChange={handleBoxCheck} />
         {checkBox && (
            <div className={styles.condition}>
               <p>Condição: </p>

               <ul className={styles.dropDownContainer} >
                  <div className={styles.inputArrowContainer}>
                     <Input value={selectedCondition} type={"text"} placeholder={"escolha"} readonly={"readonly"} setFieldValue={setDeliveryTax} />
                     <BsFillArrowDownCircleFill size={20} className={styles.arrow} onClick={handleShowDropDown} />
                  </div>

                  {discountConditions.map((option) => (

                     <li style={{ display: showDropDown ? "flex" : "none" }} onClick={() => { setSelectedCondition(option) }}>{option}</li>
                  ))}
               </ul>


            </div>
         )}

      </div>
   )
}