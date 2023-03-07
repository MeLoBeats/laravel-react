import {Context, createContext, ReactNode, useContext, useState} from "react";
import {StateContextType} from "../types";

const initialValue: StateContextType = {
  token: null,
  user: {
    name:''
  },
  setUser: () => {},
  setToken: () => {}
}

const StateContext: Context<StateContextType> = createContext<StateContextType>(initialValue)

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({});
  const [token, _setToken] = useState<string|null>(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');

  const setNotification = (message: string) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  const setToken = (token: string|null) => {
  _setToken(token)
    if(token) {
      localStorage.setItem('ACCESS_TOKEN', token)
    } else {
      localStorage.removeItem("ACCESS_TOKEN")
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
      setNotification,
      notification
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
