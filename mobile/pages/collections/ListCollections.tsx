import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CollectionList from "../../components/collections/CollectionList";
import { clearErrors, getCollections } from "../../store/collections/actions";

const ListCollections = ({}) => {
  const dispatch = useDispatch();
  const { collections, loading, error } = useSelector(
    (state: any) => state.CollectionReducer
  );

  useEffect(() => {
    if (!error.message.length) {
      dispatch(getCollections({}));
    }
  }, [error]);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && (
        <CollectionList collections={collections} />
      )}
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
          <Button
            title="Retry"
            onPress={() => {
              dispatch(clearErrors());
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

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

export default ListCollections;
