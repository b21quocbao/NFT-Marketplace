import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Input from "./Input";
import { launchImageLibrary } from "react-native-image-picker";

/* eslint-enable no-template-curly-in-string */

const NewNftForm = (props: any) => {
  const [inputs, setInputs] = useState({
    image: {
      value: null,
    },
    name: {
      value: "",
      isValid: true,
    },
    description: {
      value: "",
      isValid: true,
    },
    collectionId: {
      value: "",
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

  useEffect(() => {
    const uploadImage = async () => {
      const result = await launchImageLibrary({ mediaType: 'mixed' });
      inputChangedHandler("image", result.assets[0]);
    };
    uploadImage();
  }, []);

  function submitHandler() {
    props.onAddNft(inputs);
  }

  return (
    <View>
      <Input
        label="Name"
        invalid={!inputs.name.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <Text style={[styles.label]}>Collection</Text>
      <RNPickerSelect
        onValueChange={inputChangedHandler.bind(this, "collectionId")}
        placeholder={{ label: "Select a collection..." }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        items={props.collections.map((collection: any) => ({
          label: `${collection.name} - ${collection.id}`,
          value: collection.id,
        }))}
      />
      <Button title="Submit" onPress={submitHandler} />
    </View>
  );
};

export default NewNftForm;

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
