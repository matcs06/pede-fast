import styles from "./Button.module.scss"

export default function Button({ ...props }) {

   return (
      <div className={styles.buttonContainer} onClick={props.handleClick}>
         {props.children}
      </div>
   )
}