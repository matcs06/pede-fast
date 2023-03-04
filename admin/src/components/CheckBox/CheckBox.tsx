import { useState } from "react";
import styles from "./CheckBox.module.scss"
export default function CheckBox(props: any) {

   return (
      <div className={styles.checkBoxContainer}>
         <label htmlFor="">
            {props.checkBoxLabel}

            <input
               type="checkbox"
               checked={props.checked}
               onChange={props.setChange}
            />
         </label>
      </div>
   )



}