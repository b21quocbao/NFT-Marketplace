import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, logout } from "../../store/auth/actions";
import NFTItemField from "../../components/nfts/NftItemField";
import { CHAINS } from "../../constants/chain";

function ConnectWallet() {
  const connector = useWalletConnect();
  const { user, loading, error } = useSelector(
    (state: any) => state.AuthReducer
  );

  const dispatch = useDispatch();

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && connector.connected ? (
        <View>
          <NFTItemField title="Address" value={connector.accounts} />
        </View>
      ) : null}
      {!loading && !error.message.length && connector.connected ? (
        <View>
          <NFTItemField title="Chain" value={CHAINS[connector.chainId]} />
        </View>
      ) : null}
      {!loading && !error.message.length && !connector.connected ? (
        <View style={[styles.button]}>
          <Button title="Connect" onPress={() => connector.connect()} />
        </View>
      ) : null}
      {!loading && !error.message.length && connector.connected ? (
        <View style={[styles.button]}>
          <Button
            title="Disconnect"
            onPress={() => {
              connector.killSession();
              dispatch(logout());
            }}
          />
        </View>
      ) : null}
      {!loading && connector.connected && !error.message.length && !user ? (
        <View style={[styles.button]}>
          <Button
            title="Login"
            onPress={() => {
              const message = `Welcome to Bao's Marketplace!\n\nClick to sign in and accept the Bao's Marketplace Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet address:\n${connector.accounts[0]}\n`;

              connector
                .signPersonalMessage([message, connector.accounts[0]])
                .then(async (signature: string) => {
                  dispatch(
                    login({
                      username: connector.accounts[0],
                      password: signature,
                      message: message,
                    })
                  );
                });
            }}
          />
        </View>
      ) : null}
      {!loading && connector.connected && !error.message.length && user ? (
        <View style={[styles.button]}>
          <Button
            title="Logout"
            onPress={() => {
              dispatch(logout());
            }}
          />
        </View>
      ) : null}
      {loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
          <Button
            title="Retry"
            onPress={() => {
              dispatch(clearErrors());
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  button: {
    marginVertical: 15,
  },
});

export default ConnectWallet;
