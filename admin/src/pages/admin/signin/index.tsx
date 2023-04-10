import styles from "./signin.module.scss"
import pf_logo from "../../../../public/pf_logo.png"
import Image from "next/image"
import { useState } from "react"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
export default function SignIn() {

   const [userName, setUserName] = useState()
   const [password, setPassword] = useState()
   const [confirmPassoword, setConfirmPassword] = useState()
   const [email, setEmail] = useState()


   return (
      <div className={styles.mainContainer}>
         <header>
            <Image src={pf_logo} width={150} height={150} alt="" />
         </header>
         <main>
            <div className={styles.inputContainer}>
               <Input setFieldValue={setUserName} type="text" placeholder={"Nome do Usuário"} nome={"username"} />
               <Input setFieldValue={setEmail} type="email" placeholder={"Email"} nome={"email"} />
               <Input setFieldValue={setPassword} type="password" placeholder={"Senha"} nome={"password"} />
               <Input setFieldValue={setPassword} type="password" placeholder={"Confirmar senha"} nome={"confirmpassword"} />
            </div>
            <div className={styles.buttonContainer}>
               <Button>Criar Conta</Button>
            </div>
         </main>
      </div>
   )

}