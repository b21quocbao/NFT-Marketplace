import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { Platform } from "react-native";
import rootSaga from "./store/sagas";
import { Provider, useDispatch } from "react-redux";
import Home from "./pages/Home";
import ConnectWallet from "./pages/wallet/ConnectWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import configureStore from "./store/configureStore";
import { useEffect } from "react";
import { getLoginStorage } from "./store/auth/actions";

const Drawer = createDrawerNavigator();

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStorage());
  });

  return (
    <WalletConnectProvider
      bridge="https://bridge.walletconnect.org"
      clientMeta={{
        description: "Connect with WalletConnect",
        url: "https://walletconnect.org",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        name: "WalletConnect",
      }}
      redirectUrl={
        Platform.OS === "web" ? window.location.origin : "yourappscheme://"
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
    >
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Homepage" component={Home} />
          <Drawer.Screen name="Connect Wallet" component={ConnectWallet} />
        </Drawer.Navigator>
      </NavigationContainer>
    </WalletConnectProvider>
  );
}

export default function App() {
  const store = configureStore();
  store.runSaga(rootSaga);

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
