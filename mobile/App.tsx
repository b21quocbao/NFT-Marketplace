import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { Platform, StyleSheet } from "react-native";
import rootSaga from "./store/sagas";
import { Provider, useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import ConnectWallet from "./pages/wallet/ConnectWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import configureStore from "./store/configureStore";
import { useEffect } from "react";
import { getLoginStorage } from "./store/auth/actions";
import ListNfts from "./pages/nfts/ListNFTs";
import MyNfts from "./pages/nfts/MyNFTs";
import MyActions from "./pages/actions/MyActions";
import MyCollections from "./pages/collections/MyCollections";
import ListCollections from "./pages/collections/ListCollections";
import CreateCollection from "./pages/collections/CreateCollection";
import CollectionNfts from "./pages/nfts/CollectionNFTs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NFTOffers from "./pages/offers/NFTOffers";
import AuctionNft from "./pages/nfts/AuctionNFT";
import SaleNft from "./pages/nfts/SaleNFT";
import BidNft from "./pages/nfts/BidNFT";
import MintNFT from "./pages/nfts/MintNFT";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  const { user } = useSelector((state: any) => state.AuthReducer);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Homepage" component={Home} />
      <Drawer.Screen name="Connect Wallet" component={ConnectWallet} />
      {user && <Drawer.Screen name="Mint NFT" component={MintNFT} />}
      {user && <Drawer.Screen name="My NFTs" component={MyNfts} />}
      <Drawer.Screen name="All NFTs" component={ListNfts} />
      {user && (
        <Drawer.Screen name="My Collections" component={MyCollections} />
      )}
      <Drawer.Screen name="All Collections" component={ListCollections} />
      {user && <Drawer.Screen name="My Actions" component={MyActions} />}
      {user && (
        <Drawer.Screen name="Create Collection" component={CreateCollection} />
      )}
    </Drawer.Navigator>
  );
}

function Root() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    dispatch(getLoginStorage());
  }, []);

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
      {!loading && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Collection NFTs" component={CollectionNfts} />
            <Stack.Screen name="NFT Offers" component={NFTOffers} />
            <Stack.Screen name="Auction NFT" component={AuctionNft} />
            <Stack.Screen name="Sale NFT" component={SaleNft} />
            <Stack.Screen name="Bid NFT" component={BidNft} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
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
