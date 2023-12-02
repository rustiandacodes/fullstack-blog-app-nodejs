import { createContext, useState, useEffect, useRef } from 'react';

export const GeneralContext = createContext({});

export function GeneralContextProvider({ children }) {
  const [popUp, setPopUp] = useState(false);
  const [showMenuPop, setShowMenuPop] = useState(false);
  const refOne = useRef('');

  useEffect(() => {
    document.addEventListener('click', handleOutside, true);
  }, []);

  const handleOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      setPopUp(false);
      setMenuPop(false);
    }
  };
  return <GeneralContext.Provider value={{ showMenuPop, setShowMenuPop, popUp, setPopUp, refOne }}>{children}</GeneralContext.Provider>;
}
