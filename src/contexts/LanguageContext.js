import React, { useContext } from 'react';
 
const LanguangeContext = React.createContext();
export const useLanguange = () => useContext(LanguangeContext);
export const LanguangeProvider = LanguangeContext.Provider;
 
export default LanguangeContext;