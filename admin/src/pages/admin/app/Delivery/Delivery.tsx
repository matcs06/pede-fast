import styles from "./Delivery.module.scss"
import { useEffect, useState } from "react"
import { BsFillArrowDownCircleFill } from "react-icons/bs"
import { AiFillPlusCircle } from "react-icons/ai"

import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"
import CheckBox from "../../../../components/CheckBox/CheckBox"
import instace from "../../../../api/hello"

interface IDeliveryConfig {
   tax: string;
   has_discount: boolean;
   condition: string;
   parameter: string;
   discount_percentage: string,
   deactivate_delivery: boolean
}

export default function Delivery() {
   const [deliveryTax, setDeliveryTax] = useState("")
   const [discountCheckBox, setDiscountCheckBox] = useState(false)
   const [selectedCondition, setSelectedCondition] = useState("")
   const [conditionType, setConditionType] = useState("")

   const [parameter, setParameter] = useState("")
   const [percentage, setPercentage] = useState("")

   const [showDropDown, setShowDropDown] = useState(false)
   const [deactivateDelivery, setDeactiveDelivery] = useState(false)


   //const username = String(localStorage.getItem("username"))
   const token = String(localStorage.getItem("token"))
   const user_id = String(localStorage.getItem("user_id"))

   const discountConditions = [
      { nome: "Valor do pedido", tipo: "maior ou igual" },
      { nome: "Quantidade de itens", tipo: "maior ou igual" },
      { nome: "Cupom", tipo: "igual" },
   ]


   function handleDeactivateDeliveryBoxCheck() {
      setDeactiveDelivery(!deactivateDelivery)
   }

   function handleDiscountBoxCheck() {
      setDiscountCheckBox(!discountCheckBox)
   }

   function handleShowDropDown(option: string, type: string) {

      if (option !== "") {

         setSelectedCondition(option)
         setConditionType(type)
      }
      setShowDropDown(!showDropDown)
   }

   async function onSaveDeliverySetup() {

      try {
         await instace.post("delivery", {
            user_id: user_id,
            has_discount: discountCheckBox,
            tax: deliveryTax,
            discount_percentage: percentage,
            condition: selectedCondition + "-" + conditionType,
            parameter: parameter,
            deactivate_delivery: deactivateDelivery,
         }, {
            headers: {
               Authorization: "Bearer " + token,
            },

         })

         window.alert("Configuracao de entrega salva com sucesso")
      } catch (error) {
         window.alert("Erro ao salvar configuracao")
      }

   }

   useEffect(() => {

      async function loadConfig() {
         const response = await instace.get<IDeliveryConfig>(`/delivery/${user_id}`, {
            headers: {
               Authorization: "Bearer " + token,
            }
         })

         if (response.data) {
            setDeliveryTax(response.data.tax)
            setDiscountCheckBox(response.data.has_discount)
            setSelectedCondition(response.data.condition.split("-")[0])
            setConditionType(response.data.condition.split("-")[1])
            setParameter(response.data.parameter)
            setPercentage(response.data.discount_percentage)
            setDeactiveDelivery(response.data.deactivate_delivery)

         }

      }

      loadConfig()

      return () => {
         setDiscountCheckBox(false)
         setDeactiveDelivery(false)
         setDeliveryTax("")
         setSelectedCondition("")
         setConditionType("")
         setParameter("")
         setPercentage("")
      }


   }, [])

   return (
      <div className={styles.mainContainer}>
         <h3>Configurar Entrega/Encomenda</h3>
         <div className={styles.diccountToggle}>

            <CheckBox checkBoxLabel={"Somente Encomenda"} checked={deactivateDelivery} setChange={handleDeactivateDeliveryBoxCheck} />
         </div>

         {!deactivateDelivery && (
            <>
               <div className={styles.deliveryTaxContainer}>
                  <p>Taxa de Entrega: </p>
                  <Input value={deliveryTax} type={"number"} setFieldValue={setDeliveryTax} /> R$
               </div>

               <div className={styles.diccountToggle}>

                  <CheckBox checkBoxLabel={"Desconto:"} checked={discountCheckBox} setChange={handleDiscountBoxCheck} />
               </div>

               {discountCheckBox && (
                  <div className={styles.condition}>
                     <ul className={styles.dropDownContainer} >
                        <div className={styles.inputArrowContainer}>
                           <Input value={`${selectedCondition + "-" + conditionType}`} name={"discount"} type={"text"} placeholder={"Condição"} readOnly={"readonly"} setFieldValue={() => { }} />
                           <BsFillArrowDownCircleFill size={20} className={styles.arrow} onClick={() => { handleShowDropDown("", "") }} />
                        </div>

                        {discountConditions.map((option, index) => (

                           <li key={index} style={{ display: showDropDown ? "flex" : "none" }} onClick={() => { handleShowDropDown(option.nome, option.tipo) }}>{option.nome} - ({option.tipo})</li>
                        ))}
                     </ul>

                     <div className={styles.bottomContainer}>

                        <div className={styles.parameterContainer}>
                           <p>Parametro: </p>
                           <Input value={parameter} setFieldValue={setParameter} name={"parameter"} />
                        </div>

                        <div className={styles.parameterContainer}>
                           <p>Porcentagem: </p>
                           <Input value={percentage} setFieldValue={setPercentage} name={"parameter"} type={"number"} />
                        </div>
                        <span>Se o {selectedCondition} for {conditionType} a {parameter} então descontará {percentage}% da taxa de entrega</span>

                     </div>


                  </div>

               )}
            </>
         )}

         <div className={styles.buttonContainer}>
            <Button handleClick={onSaveDeliverySetup}>Salvar</Button>
         </div>
      </div>
   )
}