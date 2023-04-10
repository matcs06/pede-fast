import styles from "./login.module.scss"
import pf_logo from "../../../../public/pf_logo.png"
import Image from "next/image"
import { useState } from "react"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
export default function Login() {

   const [userName, setUserName] = useState()
   const [password, setPassword] = useState()

   return (
      <div className={styles.mainContainer}>
         <header>
            <Image src={pf_logo} width={100} height={100} alt="" />
         </header>
         <main>
            <div className={styles.inputContainer}>
               <Input setFieldValue={setUserName} type="text" value={userName} placeholder={"Nome do Usuário"} nome={"username"} />
               <Input setFieldValue={setPassword} type="password" value={password} placeholder={"Senha"} nome={"password"} />
            </div>
            <div className={styles.buttonContainer}>
               <Button>Entrar</Button>
            </div>
         </main>
      </div>
   )

}