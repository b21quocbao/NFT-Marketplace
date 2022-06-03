import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CollectionList from "../../components/collections/CollectionList";
import { getMyCollections } from "../../store/collections/actions";

const MyCollections = () => {
  const dispatch = useDispatch();
  const { myCollections, loading, error } = useSelector(
    (state: any) => state.CollectionReducer
  );
  const { user } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
    dispatch(getMyCollections({ userId: user.id }));
  }, [dispatch]);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && (
        <CollectionList collections={myCollections} />
      )}
      {!loading && error.message.length ? (
        <View style={[styles.button]}>
          <Text>Error message: {error.message}</Text>
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
