import { useEffect } from "react"
import SideBar from "../../../components/SideBar/SideBar"
import ProductList from "./Product/ProductList/ProductList"
export default function AdminApp() {

   useEffect(() => {
      function delay(time: any) {
         return new Promise(resolve => setTimeout(resolve, time))
      }

      delay(1000).then(() => console.log("Aguardar 1 segundo para abrir product list"))


   }, [])

   return (
      <SideBar defaultComponent={<ProductList />} />
   )
}