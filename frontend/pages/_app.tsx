import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 2000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <PayPalScriptProvider options={{ "client-id": "sb" }}>
        <Layout key={router.asPath}>
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
