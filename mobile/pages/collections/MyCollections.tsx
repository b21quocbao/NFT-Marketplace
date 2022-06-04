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
import { clearErrors, getMyCollections } from "../../store/collections/actions";

const MyCollections = () => {
  const dispatch = useDispatch();
  const { myCollections, loading, error, addedCollection } = useSelector(
    (state: any) => state.CollectionReducer
  );
  const { user } = useSelector((state: any) => state.AuthReducer);

  const onRefresh = useCallback(() => {
    dispatch(getMyCollections({ userId: user.id }));
  }, []);

  useEffect(() => {
    if (!error.message.length) {
      dispatch(getMyCollections({ userId: user.id }));
    }
  }, [user.id, error, addedCollection]);

  return (
    <View style={[styles.container]}>
      {!error.message.length && (
        <CollectionList
          loading={loading}
          onRefresh={onRefresh}
          collections={myCollections}
        />
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

export default MyCollections;
