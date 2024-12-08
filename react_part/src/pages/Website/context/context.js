import { createContext, useState } from "react";

//قيمه تخزينيه مثل local storageلكن محميه
//children >>لكل ال index file
export const User = createContext({});

export default function Userprovider({ children }) {
  const [auth, setauth] = useState();
  return <User.Provider value={{auth,setauth}}>{children}</User.Provider>;
}
