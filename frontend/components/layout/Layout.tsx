import "antd/dist/antd.css";
import styles from "./Layout.module.css";
import { Layout as LayoutAnt, Menu } from "antd";
const { Header, Content, Footer } = LayoutAnt;
import { useRouter } from "next/router";
import StorageUtils from "../../utils/storage";
import { useEffect, useState } from "react";

function Layout(props: any) {
  const router = useRouter();
  const [logined, setLogined] = useState(false);
  const [user, setUser] = useState({} as any);
  console.log(router.pathname, 'pathname');
  

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
            logined ? { key: 1, label: "Create NFT" } : null,
            logined ? { key: 2, label: "My NFTs" } : null,
            { key: 3, label: "All NFTs" },
            logined ? { key: 4, label: "Create Collection" } : null,
            logined ? { key: 5, label: "My Collections" }: null,
            { key: 6, label: "All Collections" },
            { key: 7, label: "Connect Wallet" },
          ]}
          onClick={({ key }) => {
            const keyNum = Number(key);
            switch (keyNum) {
              case 0:
                router.push("/");
                break;
              case 1:
                router.push("/nfts/create");
                break;
              case 2:
                router.push(`/nfts/${user.id}`);
                break;
              case 3:
                router.push("/nfts");
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
