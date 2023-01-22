import { GrProductHunt } from "react-icons/gr"
import { IoIosAddCircle } from "react-icons/io"
import { TbReportSearch } from "react-icons/tb"
import { GoPackage } from "react-icons/go"
import { MdDeliveryDining } from "react-icons/md"
import { BiLinkAlt } from "react-icons/bi"
import ProductList from "../../pages/admin/Product/ProductList/ProductList"
import CreateProduct from "../../pages/admin/Product/CreateProduct/CreateProduct"
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
      title: "Pedidos em aberto",
      icon: <TbReportSearch size={25} />,
      component: <div>ver pedidos abertos </div>,
   },
   {
      title: "Pedidos fechados",
      icon: <GoPackage size={25} />,
      component: <div>ver pedidos fechados </div>,
   },
   {
      title: "Entrega",
      icon: <MdDeliveryDining size={25} />,
      component: <div>Configuracoes de entrega</div>
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