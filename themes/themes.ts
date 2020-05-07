import { createContext, Dispatch, SetStateAction } from "react";

export enum THEMES {
  light = "light",
  dark = "dark",
}

export const themes = {
  light: {
    "--background": "#fff",
    "--color": "#000",
    "--buttonBorder": "1px solid #000",
  },
  dark: {
    "--background": "#000",
    "--color": "#fff",
    "--buttonBorder": "1px solid #fff",
  },
};

export interface ThemeContextInterface {
  theme: string;
  setTheme(val): void;
}

export const ThemeContext = createContext({} as ThemeContextInterface);
