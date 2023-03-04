
import ProductList from "../../pages/admin/Product/ProductList/ProductList"
import CreateProduct from "../../pages/admin/Product/CreateProduct/CreateProduct"
import Delivery from "../../pages/admin/Delivery/Delivery"

import { Store } from "../../pages/admin/Store/Store"
import { IoStorefrontSharp } from "react-icons/io5"
import { GrProductHunt } from "react-icons/gr"
import { IoIosAddCircle } from "react-icons/io"
import { MdDeliveryDining } from "react-icons/md"
import { BiLinkAlt } from "react-icons/bi"
export const sideBarOptions = [


   {
      title: "Meus Produtos",
      icon: <GrProductHunt size={25} />,
      component: <ProductList />,
   },
   {
      title: "Adicionar Produtos",
      icon: <IoIosAddCircle size={25} />,
      component: <CreateProduct />,
   },
   {
      title: "Minha Loja",
      icon: <IoStorefrontSharp size={25} />,
      component: <Store />,
   },
   {
      title: "Entrega",
      icon: <MdDeliveryDining size={25} />,
      component: <Delivery />,
   },

   {
      title: "Link do cliente",
      icon: <BiLinkAlt size={25} />,
      component: <div>Link do cliente</div>
   }

]


function setSideBarWidth(toggled) {
   if (window.screen.width <= 650) {
      if (toggled) {
         document.documentElement.style.setProperty('--sidebar-width', "230px");
         document.documentElement.style.setProperty('--display-options', "flex")
         document.documentElement.style.setProperty('--set-togle-rotation', "0deg")
         document.documentElement.style.setProperty('--justify-options', "flex-start")

      } else {
         document.documentElement.style.setProperty('--sidebar-width', "50px");
         document.documentElement.style.setProperty('--display-options', "none")
         document.documentElement.style.setProperty('--set-togle-rotation', "180deg")
         document.documentElement.style.setProperty('--justify-options', "center")
      }
   } else {
      if (toggled) {
         document.documentElement.style.setProperty('--sidebar-width', "280px");
         document.documentElement.style.setProperty('--display-options', "flex")
         document.documentElement.style.setProperty('--set-togle-rotation', "0deg")
         document.documentElement.style.setProperty('--justify-options', "flex-start")

      } else {
         document.documentElement.style.setProperty('--sidebar-width', "50px");
         document.documentElement.style.setProperty('--display-options', "none")
         document.documentElement.style.setProperty('--set-togle-rotation', "180deg")
         document.documentElement.style.setProperty('--justify-options', "center")
      }
   }






}

export { setSideBarWidth }