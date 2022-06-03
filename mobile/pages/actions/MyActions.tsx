import { useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyActionList from "../../components/actions/MyActionList";
import { clearErrors, getMyActions } from "../../store/actions/actions";

const MyActions = () => {
  const dispatch = useDispatch();
  const { myActions, loading, error } = useSelector(
    (state: any) => state.ActionReducer
  );
  const { user } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
    dispatch(getMyActions({ userId: user.id }));
  }, []);

  return (
    <View style={[styles.container]}>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator />
        </View>
      ) : null}
      {!loading && !error.message.length && (
        <MyActionList actions={myActions} />
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

export default MyActions;
