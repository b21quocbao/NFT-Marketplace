import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Button, StyleSheet, View } from "react-native";
import { CHAIN_DATA } from "../../constants/chain";
import Input from "./Input";

const AuctionNftForm = (props: any) => {
  const { chainId } = useWalletConnect();

  function submitHandler() {
    const expenseData = {
      expiry: +inputs.expiry.value,
      startingPrice: +inputs.startingPrice.value,
      bidRoyaltyFee: +inputs.bidRoyaltyFee.value,
      erc20TokenAddress: inputs.erc20TokenAddress.value,
    };

    const expiryIsValid = !isNaN(expenseData.expiry) && expenseData.expiry > 0;
    const startingPriceIsValid =
      !isNaN(expenseData.startingPrice) && expenseData.startingPrice > 0;
    const bidRoyaltyFeeIsValid =
      !isNaN(expenseData.bidRoyaltyFee) && expenseData.bidRoyaltyFee > 0;
    const erc20TokenAddressIsValid =
      expenseData.erc20TokenAddress.trim().length > 0 &&
      expenseData.erc20TokenAddress.startsWith("0x");

    if (
      !expiryIsValid ||
      !erc20TokenAddressIsValid ||
      !startingPriceIsValid ||
      !bidRoyaltyFeeIsValid
    ) {
      setInputs((curInputs) => {
        return {
          expiry: { value: curInputs.expiry.value, isValid: expiryIsValid },
          startingPrice: {
            value: curInputs.startingPrice.value,
            isValid: startingPriceIsValid,
          },
          bidRoyaltyFee: {
            value: curInputs.bidRoyaltyFee.value,
            isValid: bidRoyaltyFeeIsValid,
          },
          erc20TokenAddress: {
            value: curInputs.erc20TokenAddress.value,
            isValid: erc20TokenAddressIsValid,
          },
        };
      });
      return;
    }

    props.onAuctionNft(expenseData);
  }

  const [inputs, setInputs] = useState({
    expiry: {
      value: "",
      isValid: true,
    },
    startingPrice: {
      value: "",
      isValid: true,
    },
    erc20TokenAddress: {
      value: "",
      isValid: true,
    },
    bidRoyaltyFee: {
      value: "2.5",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  return (
    <View>
      {chainId && (
        <View style={styles.container}>
          <Input
            label="Expiry"
            invalid={!inputs.expiry.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "expiry"),
              value: inputs.expiry.value,
            }}
          />
          <Input
            label="Starting Price"
            invalid={!inputs.startingPrice.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "startingPrice"),
              value: inputs.startingPrice.value,
            }}
          />
          <RNPickerSelect
            onValueChange={inputChangedHandler.bind(this, "erc20TokenAddress")}
            placeholder={{ label: "Select a token..." }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            items={CHAIN_DATA[chainId].erc20.map((token: any) => ({
              label: `${token.name} - ${token.symbol}`,
              value: token.address,
            }))}
          />
          <Input
            label="Royalty Fee"
            invalid={!inputs.bidRoyaltyFee.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "bidRoyaltyFee"),
              value: inputs.bidRoyaltyFee.value,
            }}
          />
          <View style={styles.button}>
            <Button title="Submit" onPress={submitHandler} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  button: {
    marginTop: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    marginVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AuctionNftForm;
