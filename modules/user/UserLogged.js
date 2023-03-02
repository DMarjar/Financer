import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Avatar } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../kernel/components/Loading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function UserLogged(props) {
  const { setReload, user } = props;
  const [loading, setLoading] = useState(false);

  const removeValue = async () => {
    console.log("Removing session...");
    try {
      setLoading(true);
      await AsyncStorage.removeItem("@session");
      setLoading(false);
      console.log("Session removed.");
      setReload(true);
      console.log("Reload set to true.");
    } catch (e) {
      console.log("Error -> UserLogged.js -> removeValue" + e);
    }
  };

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA); // Pide permiso para acceder a la cámara
    if (resultPermission.permissions.camera.status !== "denied") {
      // Si el usuario acepta el permiso
      let result = await ImagePicker.launchImageLibraryAsync({
        // Abre la galería de imágenes o la cámara
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo permite seleccionar imágenes
        allowsEditing: true, // Permite editar la imagen
        quality: 1, // Calidad de la imagen
        aspect: [1, 1], // Relación de aspecto de la imagen
      });
      if (!result.canceled) {
        uploadImage(result.uri)
          .then(() => {
            uploadProfilePic();
            console.log("Imagen subida correctamente");
          })
          .catch((error) => {
            console.log(
              "Error -> UserLogged.js -> changeAvatar -> uploadImage " + error
            );
          });
      } else {
        console.log("No image selected");
      }
    }
  };

  const uploadProfilePic = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `profilePics/${user.uid}`))
      .then(async (url) => {
        const db = getFirestore();
        const response = await setDoc(doc(db, "person", `${user.uid}`), {
          displayName: "",
          profilePic: url,
        });
        console.log("Document written: ", response);
      })
      .catch((error) => {
        console.log("Error -> UserLogged.js -> uploadProfilePic -> " + error);
      });
  };

  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.avatar}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/finanzas-aaa07.appspot.com/o/avatar%2FfnUnDior7QXzUJE20AUVdx1IVYM2.jpg?alt=media&token=bdd36221-19ba-44e4-8f0b-64a1337da1f3",
            }}
            containerStyle={styles.avatar}
          >
            <Avatar.Accessory size={22} onPress={changeAvatar} />
          </Avatar>
        </View>
        <View>
          <Text>
            {user.providerData[0].displayName ? user.providerData[0].displayName : "Anónimo"}
          </Text>
          <Text>{user.providerData[0].email}</Text>
        </View>
      </View>
      <Button
        title="Sign out"
        buttonStyle={styles.btnLogout}
        containerStyle={styles.btnLogoutContainer}
        onPress={removeValue}
      />
      <Loading show={loading} text="Logging out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#FFF",
  },
  btnLogoutContainer: {
    marginTop: 30,
    width: "50%",
    alignSelf: "center",
  },
  btnLogout: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#FF0079",
    paddingVertical: 10,
    width: "100%",
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