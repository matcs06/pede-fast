import styles from "./Options.module.scss"
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { MdCancel } from "react-icons/md"
import { useState } from "react"
import { v4 as uuid } from "uuid"

interface OptionsItems {
   name: string;
   id: string;
   value: string
}

interface createdOption {
   id: string,
   name: string,
   isRequired: boolean,
   maximumQuantity: string,
   items: OptionsItems[]
}

export default function Options({ ...props }) {

   let passedItems = []
   let passedOptionIsRequited = null
   let passedOptionName = ""

   //Só assinala valor nos campos se for abrir uma opcao existente
   if (props.openedFrom === "existent") {
      passedItems = props.chosedOption.items != undefined ? props.chosedOption.items : []
      passedOptionIsRequited = props.chosedOption.isRequired !== undefined ? props.chosedOption.isRequired : null;
      passedOptionName = props.chosedOption.name !== undefined ? props.chosedOption.name : "";

   }

   const [optionName, setOptionName] = useState(passedOptionName) /* Nome da opcao topo */
   const [optionmaximumQuantity, setOptionmaximumQuantity] = useState(0)

   const [isOptaional, setIsOptional] = useState(passedOptionIsRequited) /* Flag para salvar o is optional */
   const [optionsItems, setOptionItems] = useState<OptionsItems[]>(passedItems) /* Lista de itens */

   const [item, setItem] = useState("") /* Salva o item */
   const [itemValue, setItemValue] = useState("") /* Salva o valor do item */


   const [displayStatus, setDisplayStatus] = useState(false)
   const [optionalOrRequired, setOptionalOrRequired] = useState("")

   const status = [
      { key: 1, status: "obrigatório" },
      { key: 2, status: "opcional" }

   ]

   function AdditemToOption() {

      if (item == "") {
         window.alert("Informe algum item para a opçao")
      } else {

         const newOptionItem: OptionsItems = {
            name: item,
            id: uuid(),
            value: itemValue
         }

         setOptionItems([...optionsItems, newOptionItem])
         setItem("")
         setItemValue("")
      }

   }

   function removeItem(id: string) {
      const updatedItems = optionsItems.filter((item) => item.id != id)

      setOptionItems(updatedItems)
   }

   function handleCreateUpdate() {
      const modalOption: createdOption = {
         id: props.openedFrom === "new" ? uuid() : props.chosedOption.id,
         isRequired: false,
         maximumQuantity: "10",
         name: optionName,
         items: optionsItems
      }

      if (props.openedFrom === "new") {
         //funcao definida em CreateProuct para criar uma nova Opcao no estado
         props.createAdditional(modalOption)
      } else {
         //funcao definida em CreateProduct para atualizar uma Opcao existente no estado
         props.updateOption(modalOption)
      }
      props.setShowModal(false)
   }

   const onClickStatus = (optionalOrRequired: string) => {

      setDisplayStatus(false)
      setOptionalOrRequired(optionalOrRequired)
   }

   return (
      <div className={styles.optionsTransparentContainer}>
         <div className={styles.optionsContainer}>
            <MdCancel className={styles.closeWindow} color="#DC6A6A" size={30} onClick={() => props.setShowModal(false)} />
            <h3>{props.productName}</h3>
            <div className={styles.optionInfoContainer}>
               <Input name="option" value={optionName} setFieldValue={setOptionName} placeholder="Nome da opção" />

            </div>
            <div className={styles.AditionalOptions}>
               <div className={styles.statusContainer}>
                  <p>Status: </p>
                  <ul >
                     <p style={{ color: optionalOrRequired === "opcional" ? "#0ed004" : "#F24E1E" }} onClick={() => setDisplayStatus(!displayStatus)}>{optionalOrRequired == "" ? "Selecione" : optionalOrRequired}</p>

                     {displayStatus && status.map((sstatus) =>

                        <li style={{ color: sstatus.status === "opcional" ? "#0ed004" : "#F24E1E" }} key={sstatus.key} onClick={() => onClickStatus(sstatus.status)}>{sstatus.status}</li>
                     )}

                  </ul>
               </div>

               <div className={styles.maximumQuantity}>
                  <p>Quant. Máxima</p>
                  <Input type="number" name="quantidade" value={optionmaximumQuantity} setFieldValue={setOptionmaximumQuantity} />
               </div>


            </div>

            <div className={styles.addItemContainer}>
               <h3>Adicione itens</h3>
               <form onKeyDown={(event) => event.key === "Enter" && AdditemToOption()} action="submit" className={styles.addItemInputContainer}>
                  <Input name="item" setFieldValue={setItem} placeholder="Nome" value={item} />
                  <Input name="value" setFieldValue={setItemValue} placeholder="valor" type="number" value={itemValue} />
                  <AiOutlinePlusCircle onClick={AdditemToOption} type='submit' color="#DC6A6A" cursor="pointer" size={50} />

               </form>
               <div className={styles.options}>
                  <ul>
                     {optionsItems && optionsItems.map((newItem) => {
                        return (
                           <div key={newItem.id} className={styles.newItemsContainer}>
                              <li >{newItem.name}  </li>
                              {newItem.value && <p>R$ {newItem.value}</p>}
                              <MdCancel className={styles.deleteItem} color="#DC6A6A" size={30} cursor="pointer" onClick={() => removeItem(newItem.id)} />
                           </div>
                        )
                     })}

                  </ul>
               </div>

            </div>
            <div className={styles.buttonContainer}>
               <Button handleClick={handleCreateUpdate}>{props.openedFrom == "new" ? "Criar" : "Atualizar"}</Button>
            </div>

         </div>
      </div>
   )
}