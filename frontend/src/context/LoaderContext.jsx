import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  const value = useMemo(() => ({
    isLoading, showLoader, hideLoader
  }), [isLoading, showLoader, hideLoader]);

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => useContext(LoaderContext);