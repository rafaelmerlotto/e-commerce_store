import { authservice } from "../api";
import * as React from "react";


interface Auth {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    token: string | undefined
}

export const authContext = React.createContext<Auth>({
    login: async () => { return false },
    logout: () => {},
    token: undefined
})

export const AuthProvider: React.FC<any> = ({children}) => {
    const [token, setToken] = React.useState<string>();
    const login = async (email: string, password: string) => {
        const res = await authservice.login(email, password);
        if(res) {
            setToken(authservice.token)
        }
        return res
    }
    const logout = () => setToken(undefined);
    return <authContext.Provider value={{token, login, logout}}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return React.useContext(authContext)
}