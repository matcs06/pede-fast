import CartButton from "@/components/CartButton"
import Input from "@/components/Input"
import PhoneInput from "@/components/PhoneInput";
import IsNumber from "@/utils/isNumber";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { GrLocation } from "react-icons/gr"

export default function CustomerInfo() {

   const { push } = useRouter();


   const [customerName, setCustomerName] = useState("")
   const [customerPhone, setCustomerPhone] = useState("")
   const [customerAddress, setCustomerAddress] = useState("")
   const [addressExtraInfo, setAddressExtraInfo] = useState("")
   const [location, setLocation] = useState<GeolocationPosition>()

   const [getLocation, setGetLocation] = useState(false)

   async function getCurrentLocation() {
      setGetLocation(true)
      navigator.geolocation.getCurrentPosition(location => {
         setLocation(location)
      })
   }

   function sendMessage() {

      if (customerName === "" ||
         customerAddress === "" ||
         customerPhone === "") {
         window.alert("Preencha os campos são obrigatórios: Nome, Telefone e Endereço!")
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


         const link = `https://www.google.com/maps?q=${location?.coords.latitude},${location?.coords.longitude}&z=17&hl=pt-BR`

         const wpplink = `https://wa.me/+5511959842539?text=${link}`
         window.open(wpplink)

      }


   }

   return (
      <div className="flex min-h-phoneHeigth flex-col w-full items-center py-8">
         <h3 className="text-secondary-orange">Informacões da entrega</h3>
         <main className="w-full flex flex-col items-center pt-9">
            <Input placeholder="Nome Completo" setValue={setCustomerName} />
            <PhoneInput placeholder="Número (WhatsApp)" setValue={setCustomerPhone} />
            <Input placeholder="Endereço. Ex: Rua, bairo, N" setValue={setCustomerAddress} />
            <Input placeholder="Complemento. Ex: Em frente a" setValue={setAddressExtraInfo} />

            <span className="mt-3 text-xs font-extralight">Quer informar sua Localização de forma mais precisa?</span>
            <button onClick={getCurrentLocation}
               className="flex items-center shadow-sm justify-evenly bg-light-gray-2 w-48 text-opacity-70 rounded-md text-xs p-2 cursor-pointer hover:opacity-90 transition-opacity ease-in-out" >
               Enviar localização atual <GrLocation size={15} />
            </button>
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

            <div className="flex flex-col w-full items-center absolute bottom-0 h-24 justify-between">
               {getLocation ? (
                  <>
                     {location !== undefined ? (
                        <CartButton onClick={sendMessage}>Enviar Pedido</CartButton>) : (
                        <CartButton onClick={() => { window.alert("Aguarde carregar a localizacao!") }} >Carregando...</CartButton>

                     )}
                  </>
               ) : (
                  <CartButton onClick={sendMessage}>Enviar Pedido</CartButton>

               )

               }

            </div>
         </main>
      </div >
   )
}