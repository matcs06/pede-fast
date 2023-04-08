import SideBar from "../../../components/SideBar/SideBar"
import ProductList from "./Product/ProductList/ProductList"
export default function AdminApp() {

   return (
      <SideBar defaultComponent={<ProductList />} />
   )
}