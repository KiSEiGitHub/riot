import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "../styles/global.css";
import { theme } from "../themes/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Select your champion</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
