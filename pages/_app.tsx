import { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";

import useTheme from "../hooks/useTheme";
import Header from "../components/Header";
import { ThemeContext, ThemeContextInterface } from "../themes/themes";

const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 70px;
    --active-color: #808;
    --copy-font: 'Work Sans', sans-serif;
    --accent-font: 'DM Serif Text', serif;
    --grid-item-size: 280px;
  }

  * {
    box-sizing: border-box;
  }

  html {
    background: var(--background);
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;

    font-family: var(--copy-font);
    color: var(--color);
  }

  p, h1 {
    margin: 0;
  }

  button {
    font-family: var(--copy-font);
  }
`;

const Main = styled.div`
  padding-top: var(--header-height);
  visibility: ${(props) => (props.theme ? "visible" : "hidden")};
  background: var(--background);
  min-height: 100vh;
`;

const App = ({ Component, pageProps }) => {
  const [theme, setTheme] = useTheme();
  const themeContext: ThemeContextInterface = {
    theme,
    setTheme,
  };

  return (
    <Fragment>
      <GlobalStyle />
      <ThemeContext.Provider value={themeContext}>
        <Main>
          <Header />
          <Component {...pageProps}></Component>
        </Main>
      </ThemeContext.Provider>
    </Fragment>
  );
};

export default App;
