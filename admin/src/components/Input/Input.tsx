import styles from "./Input.module.scss";

export default function Input({ setFieldValue, ...props }) {

   const handleSet = (event: any) => {
      event?.preventDefault()
      setFieldValue(event?.target.value)
   }


   return (
      <div className={styles.inputContainer}>
         <input className={styles.input} placeholder={props.placeholder} onChange={handleSet} type={props.type} name={props.name}  {...props} />
      </div>
   )

}