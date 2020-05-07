import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { THEMES, themes } from "../themes/themes";

export function setThemeToCSSVars(theme) {
  const properties = THEMES[theme] ? themes[theme] : themes[THEMES.light];
  const root = document.querySelector(":root") as HTMLElement;

  Object.keys(properties).forEach((key) => {
    root.style.setProperty(key, properties[key]);
  });
}

export default function useTheme(): [string, Dispatch<SetStateAction<string>>] {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");

    setTheme(localTheme);
  }, []);

  useEffect(() => {
    // save theme to local and update css vars
    if (theme && THEMES[theme]) {
      window.localStorage.setItem("theme", theme);
      setThemeToCSSVars(theme);
    }
  }, [theme]);

  return [theme, setTheme];
}
