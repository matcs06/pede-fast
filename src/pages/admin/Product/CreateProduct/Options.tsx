import styles from "./Options.module.scss"
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { MdCancel } from "react-icons/md"
import { useState } from "react"
import { stringify } from "querystring"
import { v4 as uuid } from "uuid"

interface OptionsItems {
   name: string;
   id: string;
   value: string
}

export default function Options({ ...props }) {

   const [optionName, setOptionName] = useState("") /* Nome da opcao topo */
   const [isOptaional, setIsOptional] = useState(true) /* Flag para salvar o is optional */
   const [optionsItems, setOptionItems] = useState<OptionsItems[]>([]) /* Lista de itens */

   const [item, setItem] = useState("") /* Salva o item */
   const [itemValue, setItemValue] = useState("") /* Salva o valor do item */

   const [createOption, setCreateOption] = useState()

   function AdditemToOption() {
      const newOptionItem: OptionsItems = {
         name: item,
         id: uuid(),
         value: itemValue
      }

      setOptionItems([...optionsItems, newOptionItem])
      setItem("")
      setItemValue("")
   }

   function removeItem(id: string) {
      const updatedItems = optionsItems.filter((item) => item.id != id)

      setOptionItems(updatedItems)
   }

   function handleCreate() {

   }

   return (
      <div className={styles.optionsTransparentContainer}>
         <div className={styles.optionsContainer}>
            <MdCancel className={styles.closeWindow} color="#DC6A6A" size={30} onClick={() => props.setShowModal(false)} />
            <h3>{props.productName}</h3>
            <div className={styles.optionInfoContainer}>
               <Input name="option" setFieldValue={setOptionName} placeholder="Nome da opção" />
            </div>

            <div className={styles.addItemContainer}>
               <h3>Adicione itens</h3>
               <div className={styles.addItemInputContainer}>
                  <Input name="item" setFieldValue={setItem} placeholder="Nome" value={item} />
                  <Input name="value" setFieldValue={setItemValue} placeholder="valor" type="number" value={itemValue} />
                  <AiOutlinePlusCircle color="#DC6A6A" cursor="pointer" size={50} onClick={AdditemToOption} />

               </div>
               <div className={styles.options}>
                  <ul>
                     {optionsItems.map((newItem) => {
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
               <Button handleClick={handleCreate}>Criar</Button>
            </div>

         </div>
      </div>
   )
}