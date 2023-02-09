import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import React from "react";
import type { AppProps } from "next/app";

import ThemeConfig from "styles/theme";
import GlobalStyles from "styles/theme/globalStyles";

import "styles/globals.css";

const cache = createCache({
  key: "css",
  prepend: true,
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CacheProvider value={cache}>
      <ThemeConfig mode={"light"}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeConfig>
    </CacheProvider>
  );
};

export default App;
