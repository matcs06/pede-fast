import styles from "./login.module.scss"
import pf_logo from "../../../../public/pf_logo.png"
import Image from "next/image"
import { useState } from "react"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import instace from "../../../api/hello"
import { useUserLogin } from "../../../context/Context"

interface SessionData {
   token: string,
   user: {
      username: string,
      user_id: string
   }
}
export default function Login() {

   const [userName, setUserName] = useState()
   const [password, setPassword] = useState()
   const [_, setUserInfo] = useUserLogin()

   async function onLoginClick() {

      try {
         const response = await instace.post<SessionData>("sessions", {
            username: userName,
            password: password
         })

         localStorage.setItem("username", response.data.user.username)
         localStorage.setItem("user_id", response.data.user.user_id)
         localStorage.setItem("token", response.data.token)

         const userInfoObject = {
            username: response.data.user.username,
            user_id: response.data.user.user_id,
            token: response.data.token

         }

         setUserInfo(userInfoObject)



         window.location.pathname = ("/admin/app/")

      } catch (error) {
         window.alert("Erro ao fazer login, tente novamente!")
      }

   }


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
            <div className={styles.buttonContainer} onClick={onLoginClick}>
               <Button>Entrar</Button>
            </div>
         </main>
      </div>
   )

}