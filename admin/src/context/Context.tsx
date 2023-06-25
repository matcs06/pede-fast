import { useContext, createContext, useState } from "react";

interface IUserLogin {
   username: string;
   user_id: string;
   token: string
}

export const UserLoginContext = createContext([]) as any


export function useUserLogin(): any {
   return useContext(UserLoginContext)
}

export function MyUserLoginContextWrapper({ children }: any) {
   const [userInfo, setUserInfo] = useState<IUserLogin>()



   return (<UserLoginContext.Provider value={[userInfo, setUserInfo]}>
      {children}
   </UserLoginContext.Provider>)

}