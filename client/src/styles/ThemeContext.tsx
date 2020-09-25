import React, { ReactNode } from 'react';
import Theme from './theme';
import { ThemeProvider } from 'theme-ui';

export type ThemeVariant = 'dark' | 'light';

export interface IThemeContext {
  currentVariant: ThemeVariant;
  switchTheme: any;
}

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
};
