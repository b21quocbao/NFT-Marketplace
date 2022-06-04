import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { NATIVE_TOKEN } from "../../constants/zeroEx";
import Input from "./Input";

const SaleNftForm = (props: any) => {
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      saleRoyaltyFee: +inputs.saleRoyaltyFee.value,
      erc20TokenAddress: inputs.erc20TokenAddress.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const saleRoyaltyFeeIsValid =
      !isNaN(expenseData.saleRoyaltyFee) && expenseData.saleRoyaltyFee > 0;
    const erc20TokenAddressIsValid =
      expenseData.erc20TokenAddress.trim().length > 0 &&
      expenseData.erc20TokenAddress.startsWith("0x");

    if (!erc20TokenAddressIsValid || !amountIsValid || !saleRoyaltyFeeIsValid) {
      setInputs((curInputs) => {
        return {
          amount: {
            value: curInputs.amount.value,
            isValid: amountIsValid,
          },
          saleRoyaltyFee: {
            value: curInputs.saleRoyaltyFee.value,
            isValid: saleRoyaltyFeeIsValid,
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
      value: NATIVE_TOKEN,
      isValid: true,
    },
    saleRoyaltyFee: {
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
        invalid={!inputs.saleRoyaltyFee.isValid}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "saleRoyaltyFee"),
          value: inputs.saleRoyaltyFee.value,
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
