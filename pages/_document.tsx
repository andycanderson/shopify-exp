import Document, { NextScript, Head, Main } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { themes, THEMES } from "../themes/themes";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&&family=Work+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  const THEMES = ${JSON.stringify(THEMES)};
                  const localTheme = THEMES[localStorage.getItem('theme')];

                  let theme;

                  if (!localTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    theme = 'dark';
                  } else if (localTheme) {
                    theme = window.localStorage.getItem('theme');
                  } else {
                    theme = 'light';
                  }

                  const themes = ${JSON.stringify(themes)};
                  const properties = themes[theme];
                  const root = document.querySelector(':root');

                  Object.keys(properties).forEach((key) => {
                    root.style.setProperty(key, properties[key]);
                  });

                  window.localStorage.setItem('theme', theme);
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </html>
    );
  }
}
