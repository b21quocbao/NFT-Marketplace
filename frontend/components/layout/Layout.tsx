import "antd/dist/antd.css";
import styles from "./Layout.module.css";
import { Layout as LayoutAnt, Menu } from "antd";
const { Header, Content, Footer } = LayoutAnt;
import { useRouter } from "next/router";
import StorageUtils from "../../utils/storage";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "../wallet/Hooks";

function Layout(props: any) {
  const router = useRouter();
  const [logined, setLogined] = useState(false);
  const [user, setUser] = useState({} as any);
  const context = useWeb3React();
  const { connector, chainId } = context;

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    setLogined(!!StorageUtils.getToken());
    setUser(StorageUtils.getUser())
  }, [])

  return (
    <LayoutAnt className="layout">
      <Header>
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { key: 0, label: "Homepage" },
            logined ? { key: 1, label: "Mint NFT" } : null,
            logined ? { key: 2, label: "My NFTs" } : null,
            { key: 3, label: "All NFTs" },
            logined ? { key: 4, label: "Create Collection" } : null,
            logined ? { key: 5, label: "My Collections" }: null,
            { key: 6, label: "All Collections" },
            logined ? { key: 7, label: "My Actions" }: null,
            { key: 8, label: "Connect Wallet" },
          ]}
          onClick={({ key }) => {
            const keyNum = Number(key);
            switch (keyNum) {
              case 0:
                router.push("/");
                break;
              case 1:
                router.push(`/nfts/${user.id}/create`);
                break;
              case 2:
                router.push(`/nfts/${user.id}`);
                break;
              case 3:
                router.push(`/nfts`);
                break;
              case 4:
                router.push("/collections/create");
                break;
              case 5:
                router.push(`/collections/${user.id}`);
                break;
              case 6:
                router.push(`/collections`);
                break;
              case 7:
                router.push(`/actions/${user.id}`);
                break;
              case 8:
                router.push("/wallet/connect");
                break;
            }
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          style={{
            margin: "16px 0",
          }}
        ></div>
        <div className={styles["site-layout-content"]}>{props.children}</div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </LayoutAnt>
  );
}

export default Layout;
