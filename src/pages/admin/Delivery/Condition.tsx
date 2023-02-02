import styles from "./Condition.module.scss"
import { IoMdCloseCircle } from "react-icons/io"
export default function Condition(props: any) {


   function handleClose() {
      props.showModal(false)
   }
   return (
      <div className={styles.mainContainer}>
         <div className={styles.closeContainer} onClick={handleClose}>
            <IoMdCloseCircle size={25} className={styles.close} />
         </div>
         <h1>hello condition</h1>
      </div>
   )
}