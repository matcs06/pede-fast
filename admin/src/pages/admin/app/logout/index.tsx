import React, { useEffect } from 'react';

export default function Logout() {

   useEffect(() => {


      localStorage.setItem("username", "")
      localStorage.setItem("user_id", "")
      localStorage.setItem("token", "")

      window.location.pathname = ("/admin/login/")

   })

   return 0;
}