import { useCallback, useEffect } from "react";
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
  const { collections, loading, error, addedCollection } = useSelector(
    (state: any) => state.CollectionReducer
  );

  const onRefresh = useCallback(() => {
    dispatch(getCollections({}));
  }, []);

  useEffect(() => {
    if (!error.message.length) {
      dispatch(getCollections({}));
    }
  }, [error, addedCollection]);

  return (
    <View style={[styles.container]}>
      {!error.message.length && (
        <CollectionList  loading={loading} onRefresh={onRefresh} collections={collections} />
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
