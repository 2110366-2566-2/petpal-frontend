"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../_interface/user/user";
import { Svcp } from "../_interface/svcp/svcp";
import { getCurrentEntity } from "../libs/user/userBackend";
import { getCurrentEntityType } from "../libs/currentEntiity/getCurrentEntityType";
import { Admin } from "../_interface/admin/admin";

type CurrentEntity = User | Svcp | Admin;

interface TAuthContext {
  currentEntity: CurrentEntity | null;
  isLogin : Boolean;
  setCurrentEntity : (currentEntity: CurrentEntity | null) => void;
  setIsLogin : (isLogin : Boolean ) => void;
}

export const AuthContext = createContext<TAuthContext>({
    currentEntity: null,
    setCurrentEntity: () => {},
    isLogin: false,
    setIsLogin: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [currentEntity, setCurrentEntity] = useState<CurrentEntity | null>(null);
  const [isLogin ,setIsLogin] = useState<Boolean>(false);
  const [accType, setAccType] = useState<string>("waiting")
  
  useEffect(() => {
    getCurrentEntity().then((Response) => {
        setCurrentEntity(Response);
        setAccType(getCurrentEntityType(Response))
        console.log("Current enitity : ",Response)
    });
  }, []);
  useEffect(() => {
    // console.log(accType)
    switch (accType) {
        case "waiting": {
            console.log("waiting")
            break
        }
        case "user": {
            console.log("user")
            setIsLogin(true);
            break
        }
        case "svcp": {
            console.log("svcp")
            setIsLogin(true);
            break
        }
        case "undefined": {
            console.log("undefined")
            setIsLogin(false);
            break
        }
        default: {
            console.log("error")
            setIsLogin(false);
            break
        }
        }
  }, [accType]);

  return (
    <AuthContext.Provider value={{ currentEntity, setCurrentEntity ,isLogin ,setIsLogin}}>
      {children}
    </AuthContext.Provider>
  );
};