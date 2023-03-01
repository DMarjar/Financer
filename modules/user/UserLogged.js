import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../kernel/components/Loading";
import { Avatar } from "react-native-elements";

export default function UserLogged(props) {
  const { setReloadUser, user } = props;
  const [loading, setLoading] = useState(false);

  const removeValue = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("@session");
      setLoading(false);
      setReloadUser(true);
    } catch (e) {
      console.log("Error -> UserLogged.js -> removeValue" + e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("@session");
        if (value !== null) {
          setReloadUser(true);
        } else {
          setReloadUser(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error -> UserLogged.js -> checkUser" + error);
      }
    })();
  }, []);

  return (
    <View>
      <View style={styles.infoContainer}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/financer-31c28.appspot.com/o/profilePics%2FGmjJGxc7EgTdeie6FT8HAgpPls73.png?alt=media&token=50811044-26f2-4629-955e-e160f959a3c5",
          }}
          containerStyle={styles.avatar}
        />
        <View>
            <Text>
                {user.displayName ? user.displayName : "Anónimo"}
            </Text>
            <Text>
                {user.email}
            </Text>
        </View>
      </View>
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnLogout}
        onPress={removeValue}
      />
      <Loading isVisible={loading} text="Logging out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#FFF",
  },
  btnLogout: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#FF0079",
    paddingVertical: 10,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  avatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
