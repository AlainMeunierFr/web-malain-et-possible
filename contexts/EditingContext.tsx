'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditingContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const EditingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // L'authentification n'est PAS persistante : perdue lors de la navigation ou du rechargement
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <EditingContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = (): EditingContextType => {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error('useEditing must be used within an EditingProvider');
  }
  return context;
};
