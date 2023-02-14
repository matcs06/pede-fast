import styles from "./Condition.module.scss"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"

import { IoMdCloseCircle } from "react-icons/io"
import { BsFillArrowDownCircleFill } from "react-icons/bs"

import { useState } from "react"
export default function Condition(props: any) {

   const conditionsAvailable = [
      { key: 1, value: "maior ou igual" },
      { key: 2, value: "menor ou igual" },
      { key: 3, value: "maior" },
      { key: 4, value: "menor" },
      { key: 5, value: "igual" },
   ]

   const [conditionName, setConditionName] = useState("")
   const [conditionType, setConditionType] = useState("")

   const [showDropDown, setShowDropDown] = useState(false)


   function handleShowDropDown(value: string) {

      if (value !== "") {

         setConditionType(value)
      }
      setShowDropDown(!showDropDown)
   }

   function handleClose() {
      props.showModal(false)
   }
   return (
      <div className={styles.mainContainer}>
         <div className={styles.closeContainer} onClick={handleClose}>
            <IoMdCloseCircle size={25} className={styles.close} />
         </div>
         <main className={styles.inputContainer}>
            <header>
               <h3>Adicionar Condição</h3>
            </header>
            <div className={styles.firstInputContainer}>

               <Input setFieldValue={setConditionName} name={"condition"} placeholder={"Nome"} />
            </div>
            <div className={styles.inputArrowContainer}>

               <Input readOnly={"readonly"} setFieldValue={setConditionType} value={conditionType} placeholder={"Condição"} nome={"Condição"} />
               <BsFillArrowDownCircleFill size={20} className={styles.arrow} onClick={() => handleShowDropDown("")} />
            </div>

            <ul className={styles.dropDownContainer}>
               {conditionsAvailable.map((conditionavailable) => {
                  return (
                     <li key={conditionavailable.key} style={{ display: showDropDown ? "flex" : "none" }} onClick={() => handleShowDropDown(conditionavailable.value)}>
                        {conditionavailable.value}
                     </li>
                  )
               })}

            </ul>

         </main>
         <div className={styles.buttonContainer}>
            <Button>Adicionar</Button>
         </div>
      </div>
   )
}