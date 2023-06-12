import styles from "./signin.module.scss"
import pf_logo from "../../../../public/pf_logo.png"
import Image from "next/image"
import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import instace from "../../../api/hello"

import { BsCheckLg } from "react-icons/bs"
import { TiCancel } from "react-icons/ti"
interface UserInterface {
   username: string,
   id: string,
   payment_status: string,

}

export default function SignIn() {

   const [userFullName, setUserFullName] = useState()
   const [password, setPassword] = useState()
   const [confirmPassoword, setConfirmPassword] = useState()
   const [userName, setUsername] = useState()

   const [usersList, setUsersList] = useState<UserInterface[]>([])

   const [checkUserExists, setCheckUserExists] = useState<any>()
   const [checkPasswordConfirms, setChecPasswordConfirms] = useState<any>()


   useEffect(() => {

      async function LoadUsers() {
         const { data } = await instace.get<UserInterface[]>("/users")
         setUsersList(data)
      }

      LoadUsers()

      return () => {
         setUsersList([])
      }

   }, [])

   useEffect(() => {
      function verifyUserExists() {

         if (userName !== "" && userName !== null && userName !== undefined) {
            const exists = usersList?.filter((user) => user.username === userName)

            if (exists?.length > 0) {
               setCheckUserExists(true)
            } else {
               setCheckUserExists(false)
            }
         }

      }


      verifyUserExists()

   }, [userName])

   async function onCreateUser() {
      setChecPasswordConfirms(true)

      let oktoCreate = true

      if (confirmPassoword !== password) {
         window.alert("Informe senhas iguais no campo senha e confirmar senha")
         oktoCreate = false
      }

      if (checkUserExists) {
         window.alert("Usuaário já escolhido, escolha um outro nome de usuário")
         oktoCreate = false
      }

      if (oktoCreate) {
         try {
            await instace.post("users", {
               name: userFullName,
               password: password,
               username: userName,
               user_level: "normal"
            })
            window.alert("Usuário criado com sucesso!, Agora você já pode fazer login")
            window.location.pathname = ("/admin/login")
         } catch (error) {
            window.alert("erro ao criar usuário!")
         }

      }

   }

   return (
      <div className={styles.mainContainer}>
         <header>
            <Image src={pf_logo} width={150} height={150} alt="" />
         </header>
         <main>
            <div className={styles.inputContainer}>
               <Input setFieldValue={setUserFullName} type="text" placeholder={"Nome Completo"} nome={"fullname"} />
               <div className={styles.usernameContainer}>
                  <Input setFieldValue={setUsername} type="text" placeholder={"Nome do usuário"} nome={"username"} />

                  {userName && (
                     <div className={styles.existsIcon}>
                        {!checkUserExists ? (
                           <BsCheckLg size={20} color={"#4bb827"} />
                        ) : (<TiCancel size={20} color={"#ed5555"} />)}
                     </div>
                  )}

               </div>
               <Input setFieldValue={setPassword} type="password" placeholder={"Senha"} nome={"password"} />
               <Input setFieldValue={setConfirmPassword} type="password" placeholder={"Confirmar senha"} nome={"confirmpassword"} />
            </div>
            {checkUserExists && (
               <span style={{ color: "#ed5555", fontSize: "12px" }}>Usuário já existe, escolha outro nome!</span>

            )}
            {checkPasswordConfirms && (
               <>
                  {password !== confirmPassoword && (
                     <span style={{ color: "#ed5555", fontSize: "12px" }}>As senhas digitadas não coincidem!</span>

                  )}
               </>
            )
            }

            <div className={styles.buttonContainer} onClick={onCreateUser} >
               <Button >Criar Conta</Button>
            </div>
         </main>
      </div>
   )

}