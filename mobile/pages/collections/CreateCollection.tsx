import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NewCollectionForm from "../../components/collections/NewCollectionForm";
import {
  addCollection,
  clearAddedCollection,
} from "../../store/collections/actions";

function CreateCollection({ navigation: { navigate } }) {
  const [loadingForm, setLoadingForm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.AuthReducer);
  const { loading, error, addedCollection } = useSelector(
    (state: any) => state.CollectionReducer
  );

  async function addCollectionHandler(enteredCollectionData: any) {
    setLoadingForm(true);
    dispatch(addCollection({ ...enteredCollectionData, userId: user.id }));
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {user && !loading && !addedCollection && (
        <NewCollectionForm
          onAddCollection={addCollectionHandler}
          loading={loadingForm}
        />
      )}
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
        </View>
      ) : null}
      {user && !loading && addedCollection && (
        <View style={[styles.button]}>
          <Text>Added collection successfully</Text>
          <View style={[styles.button]}>
            <Button
              title="Go to My Collections"
              onPress={() => {
                navigate("My Collections");
              }}
            />
          </View>
          <View style={[styles.button]}>
            <Button
              title="Insert New Collection"
              onPress={() => {
                dispatch(clearAddedCollection());
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
    padding: 24,
  },
  button: {
    marginVertical: 15,
  },
});

export default CreateCollection;
