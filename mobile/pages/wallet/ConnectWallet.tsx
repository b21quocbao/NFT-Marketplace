import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Button } from "react-native";

function ConnectWallet() {
  const connector = useWalletConnect();
  console.log(connector.connected, "connector");
  
  if (!connector.connected) {
    /**
     *  Connect! 🎉
     */
    return <Button title="Connect" onPress={() => connector.connect()} />;
  }
  return <Button title="Logout" onPress={() => connector.killSession()} />;
}

export default ConnectWallet;
