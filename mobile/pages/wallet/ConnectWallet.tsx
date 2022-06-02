import { useWalletConnect } from "@walletconnect/react-native-dapp";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/auth/actions";

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
      {!loading && !connector.connected ? (
        <View style={[styles.button]}>
          <Button title="Connect" onPress={() => connector.connect()} />
        </View>
      ) : null}
      {!loading && connector.connected ? (
        <View style={[styles.button]}>
          <Button title="Disconnect" onPress={() => connector.killSession()} />
        </View>
      ) : null}
      {!loading && connector.connected && !user ? (
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
      {!loading && connector.connected && user ? (
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
        </View>
      ): null}
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
