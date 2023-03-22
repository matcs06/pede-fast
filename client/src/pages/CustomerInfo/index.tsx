import Input from "@/components/Input"
import { useState } from "react"


export default function CustomerInfo() {

   const [customerName, setCustomerName] = useState("")
   const [customerPhone, setCustomerPhone] = useState("")
   const [customerAddress, setCustomerAddress] = useState("")
   const [addressExtraInfo, setAddressExtraInfo] = useState("")
   const [location, setLocation] = useState<GeolocationPosition>()

   const [getLocation, setGetLocation] = useState(false)

   console.log(location)
   async function getCurrentLocation() {
      setGetLocation(true)
      navigator.geolocation.getCurrentPosition(location => {
         console.log(location)
         setLocation(location)
      })
   }

   function sendMessage() {


      const link = `https://www.google.com/maps?q=${location?.coords.latitude},${location?.coords.longitude}&z=17&hl=pt-BR`

      const wpplink = `https://wa.me/+5511959842539?text=${link}`
      window.open(wpplink)
   }

   return (
      <div className="flex min-h-phoneHeigth flex-col w-full items-center py-8">
         <h3 className="text-secondary-orange">Informacões da entrega</h3>
         <main className="w-full flex flex-col items-center pt-9">
            <Input placeholder="Nome Completo" setValue={setCustomerName} />
            <Input placeholder="Número (WhatsApp)" setValue={setCustomerPhone} />
            <Input placeholder="Endereço. Ex: Rua, bairo, N" setValue={setCustomerAddress} />
            <Input placeholder="Complemento. Ex: Em frente a" setValue={setAddressExtraInfo} />

            <span className="mt-3 text-xs font-extralight">Ajuda a informar sua Localização de forma mais precisa</span>
            <button onClick={getCurrentLocation} className="bg-light-gray-2 text-opacity-70 rounded-md text-xs p-2 cursor-pointer hover:opacity-90 transition-opacity ease-in-out" >Enviar Localização atual</button>
            {getLocation && (
               <>
                  {location !== undefined ? (
                     <div className="mt-2 flex w-40 rounded-lg items-center  h-14 justify-center  bg-light-gray p-2 text-xs text-green ">Sua Localização será enviada junto ao pedido.</div>
                  ) : (
                     <div className="animate-pulse mt-2 flex w-40 rounded-lg items-center  h-14 justify-center  bg-light-gray p-2 text-xs text-secondary-orange ">Carregando...</div>

                  )}
               </>
            )

            }

            <button onClick={sendMessage} className="w-10 h-6 bg-secondary-orange ">teste</button>

         </main>
      </div>
   )
}