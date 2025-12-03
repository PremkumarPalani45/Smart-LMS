import { useContext } from "react";
import { createContext, useState } from "react";

import axios from "axios";

const AuthContext=createContext();

const AuthProvider=({children})=>{
   const [user,setUser]=useState(null);

   //login user


   const login=async(email,password)=>{
      try {
        const res = await axios.post("http://localhost:3000/api/login",{email,password});

        // assuming backend returns: { success: true, data: [...] }
        console.log(res.data)
        setUser(res.data.data || res.data);
       localStorage.setItem('user',JSON.stringify(res.data));
      } catch (err) {
        console.error("Error user login:", err);
      }
    //   finally{
    //     setisloading(false);
    //   }
   }

   const logout=()=>{
    setUser(null);
    localStorage.removeItem("user");
   }


   return(
    <AuthContext.Provider value={{user,setUser}}>
       {children}
    </AuthContext.Provider>
   )
}

export const useAuth=()=>{
    useContext(AuthContext);
}