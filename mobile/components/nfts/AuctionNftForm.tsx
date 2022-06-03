import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Input from "./Input";

const AuctionNftForm = (props: any) => {
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
      <Input
        label="Token Address"
        invalid={!inputs.erc20TokenAddress.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "erc20TokenAddress"),
          value: inputs.erc20TokenAddress.value,
        }}
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

export default AuctionNftForm;
