"use client"
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface LoginContextType {
    isLogin: boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
  }

const LoginContext = createContext<LoginContextType | undefined>(undefined);
export const LoginContextProvider = ({children}:{children:React.ReactNode}) => {
    const [isLogin,setIsLogin] = useState(false);

    return (
        <LoginContext.Provider value={{isLogin, setIsLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLoginContext must be used within a LoginContextProvider');
      }
      return context;
};
