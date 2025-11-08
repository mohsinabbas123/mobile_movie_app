import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User{
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType{
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined> (undefined);  // orginal ine  | undefined> (defaultValue: undefined);

export const GlobalProvider = ({children}: {children:ReactNode}) =>{
    const  {
        data: user,
        loading,
        refetch
    } = useAppwrite({
      fn: getCurrentUser,
  params: {} as Record<string, string | number>,
  skip: false
});

const isLoggedIn = !!user;

// console.log(JSON.stringify(user, null, 2));   // console.log(JSON.stringify(user, replacer:null, space:2));  this is old code 
    
 return (
  <GlobalContext.Provider value={{
    isLoggedIn,
    user,
    loading,
    refetch,
  }}>
    {children}
  </GlobalContext.Provider>
)


}

export const useGlobalContext = (): GlobalContextType =>{
    const context = useContext(GlobalContext);

    if(!context){
        throw new Error('useGlobal context must be used within a GlobalProvider');
    }

    return context;
}



// export default GlobalContext;
export default GlobalProvider;