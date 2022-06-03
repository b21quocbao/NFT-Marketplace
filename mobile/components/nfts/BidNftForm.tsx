import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Input from "./Input";

const BidNftForm = (props: any) => {
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;

    if (!amountIsValid) {
      setInputs((curInputs) => {
        return {
          amount: {
            value: curInputs.amount.value,
            isValid: amountIsValid,
          },
        };
      });
      return;
    }

    props.onBidNft(expenseData);
  }

  const [inputs, setInputs] = useState({
    amount: {
      value: "",
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

export default BidNftForm;
