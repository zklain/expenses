import React, { createContext, ReactNode, useEffect, useState } from 'react';

export const initState = {
  formOpen: false,
  setFormOpen: null,
};

type AddExpenseContextType = {
  formOpen: boolean;
  setFormOpen: any;
};

export const AddExpenseContext = createContext<AddExpenseContextType>(
  initState
);

export const AddExpenseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (formOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [formOpen]);

  return (
    <AddExpenseContext.Provider value={{ formOpen, setFormOpen }}>
      {children}
    </AddExpenseContext.Provider>
  );
};
