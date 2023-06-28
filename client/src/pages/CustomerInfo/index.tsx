import CartButton from "@/components/CartButton"
import Input from "@/components/Input"
import PhoneInput from "@/components/PhoneInput";
import { useCartContext } from "@/context/Context";
import { BRLReais } from "@/utils/currencyFormat";
import IsNumber from "@/utils/isNumber";
import { TIMEOUT } from "dns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { GrLocation } from "react-icons/gr"
import { FormatMessage } from "./formatWppMesssage";
import { IOrderProducts } from "./types";
import instace from "@/api/appAPI";
import { ApplyDiscount } from "./deliveryDiscount";

interface IDelivery {
   tax: string;
   has_discount: boolean;
   condition: string;
   parameter: string;
   discount_percentage: string,
   deactivate_delivery: boolean
}

export default function CustomerInfo() {

   const { back } = useRouter();

   const [cartContent, setCartContent] = useCartContext()

   const [customerName, setCustomerName] = useState("")
   const [customerPhone, setCustomerPhone] = useState("")
   const [customerAddress, setCustomerAddress] = useState("")
   const [addressExtraInfo, setAddressExtraInfo] = useState("")
   const [location, setLocation] = useState<GeolocationPosition>()
   const [businesAddress, setBusinessAddress] = useState<any>("")

   const [getLocation, setGetLocation] = useState(false)

   const [showBackButton, setShowBackButton] = useState(false)
   const [deliveryInfo, setDeliveryInfo] = useState<IDelivery>()

   const cartTotalValue = cartContent.reduce((acc: number, cart: IOrderProducts) => acc + cart.productOrderPrice, 0)
   const totalItems = cartContent.reduce((acc: number, cart: IOrderProducts) => acc + cart.productQuantity, 0)
   const [discount, setDiscount] = useState(0)
   const [deliveryTaxAmmount, setDeliveTaxAmmount] = useState(0)

   async function getCurrentLocation() {

      setGetLocation(true)
      navigator.geolocation.getCurrentPosition(location => {
         setLocation(location)
      }, error => window.alert(error.message))


   }

   function sendMessage() {
      let informAddress = false
      if (!deliveryInfo?.deactivate_delivery && customerAddress === "") {
         informAddress = true //Flag paga caso precise informar o endereço
      }

      if (customerName === "" ||
         customerPhone === "" ||
         informAddress) {
         window.alert("Preencha os campos são obrigatórios: Nome, Telefone, endereço")
      } else {

         const customerNumberUnformated = customerPhone.split("").filter((item: string) => IsNumber(item)).join("")

         const customerInfo = {
            customerName,
            customerAddress,
            customerPhone: customerNumberUnformated,
            addressExtraInfo,
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude
         }

         localStorage.setItem("customer_info", JSON.stringify(customerInfo))


         let locationLink = ""
         if (!deliveryInfo?.deactivate_delivery) {
            locationLink = location?.coords.latitude ? `https://www.google.com/maps?q=${location?.coords.latitude},${location?.coords.longitude}&z=17&hl=pt-BR` : ""
         }

         const customerInfoMessage = `Nome: ${customerName}\nContato: ${customerPhone}\n\n`
         const cartMessage: IOrderProducts[] = cartContent
         let deliveryTax = ""

         //Apenas enviar informacao de entrega se a entrega estiver aberta
         if (!deliveryInfo?.deactivate_delivery) {
            deliveryTax = Number(deliveryInfo?.tax) - Number(discount) > 0 ? "\n*Taxa de Entrega: " + BRLReais.format((Number(deliveryInfo?.tax) - discount)) + "*" : ""
         }

         const totalOrderPrice = "\n*Total: " + BRLReais.format(cartTotalValue + deliveryTaxAmmount) + "*\n"

         //Apenas enviar informacao de entrega se a entrega estiver aberta
         let deliveryInformation = ""
         if (!deliveryInfo?.deactivate_delivery) {
            deliveryInformation = "\nEndereço de Entrega: \n" + customerAddress + "\nComplemento: " + addressExtraInfo
         }

         let formatedOrder = customerInfoMessage + FormatMessage(cartMessage) + deliveryTax + totalOrderPrice + deliveryInformation + "\n" + locationLink

         formatedOrder = window.encodeURIComponent(formatedOrder)

         const wpplink = `https://wa.me/+5511959842539?text=${formatedOrder}`
         window.open(wpplink)
         setShowBackButton(true)

      }


   }

   useEffect(() => {

      const id = localStorage.getItem("adm_id")
      const business_address = localStorage.getItem("business_address")
      async function loadInfo() {
         const response = await instace.get<IDelivery>(`/delivery/${id}`)
         setDeliveryInfo(response.data)

         setDiscount(ApplyDiscount(response.data, totalItems, cartTotalValue, ""))

         if (!response.data.deactivate_delivery) {
            setDeliveTaxAmmount(Number(response.data.tax) - ApplyDiscount(response.data, totalItems, cartTotalValue, ""))

         }


      }
      setBusinessAddress(business_address)


      loadInfo()

      return () => {
         setDeliveryInfo({ condition: "", discount_percentage: "", has_discount: false, parameter: "", tax: "", deactivate_delivery: false })
      }
   }, [cartTotalValue, totalItems])

   return (
      <div className="flex min-h-phoneHeigth flex-col w-full items-center py-8 select-none">
         <h3 className="text-secondary-orange ">Informacões da entrega</h3>
         <main className="w-full flex flex-col items-center pt-9">
            <Input placeholder="Nome Completo" setValue={setCustomerName} />
            <PhoneInput placeholder="Número (WhatsApp)" setValue={setCustomerPhone} />
            {!deliveryInfo?.deactivate_delivery && (
               <>
                  <Input placeholder="Endereço. Ex: Rua, bairo, N" setValue={setCustomerAddress} />
                  <Input placeholder="Complemento. Ex: Em frente a" setValue={setAddressExtraInfo} />
               </>

            )}


            <span className="mt-3 text-xs font-extralight">Quer informar sua Localização de forma mais precisa?</span>
            {!deliveryInfo?.deactivate_delivery && (
               <button onClick={getCurrentLocation}
                  className="flex items-center shadow-sm justify-evenly bg-light-gray-2 w-48 text-opacity-70 rounded-md text-xs p-2 cursor-pointer hover:opacity-90 transition-opacity ease-in-out" >
                  Enviar localização atual <GrLocation size={15} />
               </button>
            )}

            {getLocation && (
               <>
                  {location !== undefined ? (
                     <div className="mt-2 flex w-52 rounded-lg font-semibold shadow-md flex-row items-center h-14 justify-center  bg-light-gray p-4 text-xs text-green ">Pronto! Sua Localização será enviada junto ao pedido.</div>
                  ) : (
                     <div className="animate-pulse mt-2 flex w-40 font-semibold shadow-md rounded-lg items-center  h-14 justify-center  bg-light-gray p-2 text-xs text-secondary-orange ">Carregando...</div>

                  )}
               </>
            )

            }

            {deliveryInfo?.deactivate_delivery ? (
               <div className="mt-4 flex justify-center items-center flex-col">
                  <p className="text-secondary-orange text-sm">Esta loja está aberta apenas para encomendas</p>
                  <p className="text-secondary-orange text-sm">Retire seu pedido no nosso Endereço:</p>
                  <p className="text-light-gree text-sm">{businesAddress}</p>

               </div>
            ) : (
               <div className="w-4/5 flex flex-col justify-end items-end mt-6">
                  <p className="text-secondary-orange text-sm">Subtotal: {BRLReais.format(cartTotalValue)}</p>

                  <p className="text-secondary-orange text-sm">Taxa de entrega: {BRLReais.format(Number(deliveryInfo?.tax))}</p>
                  {discount > 0 && (
                     <p className="text-light-gree text-sm">Desconto: {BRLReais.format(discount)}</p>

                  )}

                  <p className="text-secondary-orange text-sm font-bold">Total: {BRLReais.format(cartTotalValue + deliveryTaxAmmount)}</p>
               </div>
            )}




            <div className="flex flex-col w-full items-center absolute bottom-0 h-24 justify-between">
               {getLocation ? (
                  <>
                     {location !== undefined ? (
                        <CartButton numberOfItems={cartContent.length} cartValue={cartTotalValue + deliveryTaxAmmount} onClick={sendMessage}>Enviar Pedido</CartButton>) : (
                        <CartButton onClick={() => { window.alert("Aguarde carregar a localizacao!") }} >Carregando...</CartButton>

                     )}
                  </>
               ) : (
                  <CartButton onClick={sendMessage} numberOfItems={cartContent.length} cartValue={cartTotalValue + deliveryTaxAmmount}>Enviar Pedido</CartButton>

               )

               }
               {showBackButton && (
                  <CartButton onClick={() => { back() }}>Voltar</CartButton>

               )}


            </div>
         </main>
      </div >
   )
}