import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Input from "./Input";

const SaleNftForm = (props: any) => {
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      bidRoyaltyFee: +inputs.bidRoyaltyFee.value,
      erc20TokenAddress: inputs.erc20TokenAddress.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const bidRoyaltyFeeIsValid =
      !isNaN(expenseData.bidRoyaltyFee) && expenseData.bidRoyaltyFee > 0;
    const erc20TokenAddressIsValid =
      expenseData.erc20TokenAddress.trim().length > 0 &&
      expenseData.erc20TokenAddress.startsWith("0x");

    if (!erc20TokenAddressIsValid || !amountIsValid || !bidRoyaltyFeeIsValid) {
      setInputs((curInputs) => {
        return {
          amount: {
            value: curInputs.amount.value,
            isValid: amountIsValid,
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

    props.onSaleNft(expenseData);
  }

  const [inputs, setInputs] = useState({
    amount: {
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
        label="Amount"
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputs.amount.value,
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

export default SaleNftForm;
