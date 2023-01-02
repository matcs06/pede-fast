import styles from "./Options.module.scss"
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"
import { useState } from "react"
import { stringify } from "querystring"
export default function Options({ ...props }) {

   const [optionName, setOptionName] = useState("")
   const [isOptaional, setIsOptional] = useState(true)

   return (
      <div className={styles.optionsTransparentContainer}>
         <div className={styles.optionsContainer}>
            <h3>{props.productName}</h3>
            <Input setFieldValue={setOptionName} placeholder="Nome da opção" />
            <div className={styles.isOptionalContainer}>
               <h3>Obrigatório</h3>
               <label>
                  <input type="checkbox" className="radio" checked={isOptaional} name="fooby[2][]" />Sim</label>
               <label>
                  <input type="checkbox" className="radio" checked={!isOptaional} name="fooby[2][]" />Nao</label>
            </div>

            <Button>Criar</Button>
            <button onClick={() => props.setShowModal(false)}>fechar</button>
         </div>
      </div>
   )
}