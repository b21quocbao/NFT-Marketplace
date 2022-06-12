import React from "react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Button, Row } from "antd";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import StorageUtils from "../../utils/storage";
import { useRouter } from "next/router";
import { sign } from 'tweetnacl';
import bs58 from 'bs58';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function ConnectSolana() {
  const { wallet, signMessage, publicKey } = useSolanaWallet();
  const router = useRouter();

  async function loginHandler(loginData: any) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data.user, 'data');
    

    const { user, accessToken, refreshToken } = data;
    StorageUtils.setUser({ ...user, id: user._id.toString() });
    StorageUtils.setToken(accessToken);
    StorageUtils.setRefreshToken(refreshToken);
    window.alert(`Success!\n\n${loginData.password}`);

    router.push("/");
  }

  return (
    <>
      <WalletModalProvider>
        <Row style={{ marginBottom: "10px" }} align="middle" justify="center">
          <WalletMultiButton onClick={() => console.log("clikckckcoxicvu")} />
        </Row>
        <Row style={{ marginBottom: "10px" }} align="middle" justify="center">
          <WalletDisconnectButton />
        </Row>
      </WalletModalProvider>
      {wallet && signMessage && publicKey && (
        <Row align="middle" justify="center">
          <Button 
            size="large"
            type="primary"
            onClick={async () => {
              const rawMessage = `Welcome to Bao's Marketplace!\n\nClick to sign in and accept the Bao's Marketplace Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet address:\n${publicKey}\n`;
              const message = new TextEncoder().encode(rawMessage);

              const signature = await signMessage(message);

              if (!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');
              
              await loginHandler({
                publicKey: JSON.stringify(Array.from(publicKey.toBytes())),
                username: publicKey.toString(),
                password: bs58.encode(signature),
                message: rawMessage,
                solana: true,
              });
            }}
          >
            Login
          </Button>
        </Row>
      )}
    </>
  );
}
