import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { CHAIN_DATA } from "../../constants/chain";
import Input from "./Input";
import { launchImageLibrary } from "react-native-image-picker";

/* eslint-enable no-template-curly-in-string */

const NewCollectionForm = (props: any) => {
  const [inputs, setInputs] = useState({
    image: {
      value: null,
    },
    name: {
      value: "",
    },
    description: {
      value: "",
    },
    chainId: {
      value: "",
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue },
      };
    });
  }

  useEffect(() => {
    const uploadImage = async () => {
      const result = await launchImageLibrary({ mediaType: 'mixed' });
      inputChangedHandler("image", result.assets[0]);
    };
    uploadImage();
  }, []);

  function submitHandler() {
    props.onAddCollection(inputs);
  }

  return (
    <View>
      <Input
        label="Name"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <Text style={[styles.label]}>Chain</Text>
      <RNPickerSelect
        onValueChange={inputChangedHandler.bind(this, "chainId")}
        placeholder={{ label: "Select a chain..." }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        items={Object.keys(CHAIN_DATA).map((key) => ({
          label: CHAIN_DATA[key].name,
          value: key,
        }))}
      />
      <Button title="Submit" onPress={submitHandler} />
    </View>
  );
};

export default NewCollectionForm;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: "black",
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
