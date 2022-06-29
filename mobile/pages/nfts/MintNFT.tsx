import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NewNftForm from "../../components/nfts/NewNftForm";
import { getSupportCollections } from "../../store/collections/actions";
import Web3 from "web3";
import { getChainConfig } from "../../helpers/ipfs";
import erc721ABI from "../../contracts/abi/erc721ABI.json";
import { clearCreatedNft, clearErrors, createNft } from "../../store/nfts/actions";
import { CHAIN_DATA } from "../../constants/chain";

function MintNFT({ navigation: { navigate } }) {
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const [contract, setContract] = useState(undefined as any);
  const { user } = useSelector((state: any) => state.AuthReducer);
  const { supportCollections } = useSelector(
    (state: any) => state.CollectionReducer
  );
  const { createdNft, loading, error } = useSelector(
    (state: any) => state.NftReducer
  );

  useMemo(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(getChainConfig(connector.chainId))
    );
    setContract(
      new web3.eth.Contract(
        erc721ABI as any,
        CHAIN_DATA[connector.chainId].erc721
      )
    );
  }, [connector.chainId]);

  useEffect(() => {
    dispatch(
      getSupportCollections({ chainId: connector.chainId, userId: user.id })
    );
  }, [dispatch]);

  const addNftHandler = async (enteredData: any) => {
    dispatch(
      createNft({
        ...enteredData,
        connector,
        contract,
        userId: user.id,
        userAddress: user.address,
        chainId: connector.chainId.toString(),
      })
    );
  };

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !createdNft && !error.message.length && (
        <NewNftForm
          onAddNft={addNftHandler}
          collections={supportCollections}
          chainId={connector.chainId}
        />
      )}
      {!loading && error.message.length ? (
        <View style={[styles.error]}>
          <Text>Error message: {error.message}</Text>
          <Button
            title="Retry"
            onPress={() => {
              dispatch(clearErrors());
            }}
          />
        </View>
      ) : null}
      {!loading && createdNft && (
        <View style={[styles.button]}>
          <Text>Mint NFT successfully</Text>
          <View style={[styles.button]}>
            <Button
              title="Go to My NFTs"
              onPress={() => {
                navigate("My NFTs");
              }}
            />
          </View>
          <View style={[styles.button]}>
            <Button
              title="Insert New Nft"
              onPress={() => {
                dispatch(clearCreatedNft());
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  button: {
    marginVertical: 15,
  },
  error: {
    color: "red",
    marginVertical: 15,
  },
});

export default MintNFT;
