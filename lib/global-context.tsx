import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getUser } from "./appwrite";

interface User {
    $id: string,
    name: string,
    email: string,
    avatar: string
}

interface GlobalContextType {
    isLoggedIn : boolean,
    user: User | null,
    loading: boolean,
    refetch: () => void
}

const GlobalContext = createContext<GlobalContextType | undefined>( undefined )

interface childerProps {
    children: ReactNode
}

export const GlobalProvider = ({children}: childerProps) => {
    const {data: user, loading, refetch} = useAppwrite({fn: getUser})
    console.log(JSON.stringify(user, null, 2));
    
    const isLoggedIn = !!user
    return (
        <GlobalContext.Provider value={{isLoggedIn, user, loading, refetch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext)
    if(!context) throw new Error('must used within a global provider')
    return context;
}

export default GlobalProvider;