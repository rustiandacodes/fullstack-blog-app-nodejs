import { createContext, useState, useEffect, useRef } from 'react';

export const GeneralContext = createContext({});

export function GeneralContextProvider({ children }) {
  const [popUpChangePassword, setPopUpChangePassword] = useState(false);
  const [popUpUpdateProfile, setPopUpUpdateProfile] = useState(false);
  const [showMenuPop, setShowMenuPop] = useState(false);
  const refMenu = useRef();

  useEffect(() => {
    document.addEventListener('click', handleOutside, true);
  }, []);

  const handleOutside = (e) => {
    if (!refMenu.current.contains(e.target)) {
      setShowMenuPop(false);
      setPopUpChangePassword(false);
      setPopUpUpdateProfile(false);
    }
  };
  return <GeneralContext.Provider value={{ showMenuPop, setShowMenuPop, popUpChangePassword, setPopUpChangePassword, popUpUpdateProfile, setPopUpUpdateProfile, refMenu }}>{children}</GeneralContext.Provider>;
}
