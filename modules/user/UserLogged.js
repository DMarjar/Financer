import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Avatar } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../kernel/components/Loading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
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
      .then((url) => {
        updateProfile(user, { photoURL: url })
          .then((credential) => {
            console.log("Imagen actualizada correctamente -> ", credential);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(
              "Error -> UserLogged.js -> uploadProfilePic -> " + error
            );
          });
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
          <View>
            <Text>
              {user.providerData[0].displayName
                ? user.providerData[0].displayName
                : "Anónimo"}
            </Text>
            <Text>{user.providerData[0].email}</Text>
          </View>
        </View>
      </View>
      <Button
        title="Sign out"
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

/*import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../kernel/components/Loading";
import { Avatar } from "react-native-elements";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { size } from "lodash";

export default function UserLogged(props) {
  const {setReload, user} = props;
  const [loading, setLoading] = useState(false);

  console.log("User logged -> " + user);

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

  const uploadImage = async (uri) => {
    setLoading(true);
    const response = await fetch(uri); // Fetch hace una petición a la uri y devuelve una respuesta en formato json
    const { _bodyBlob } = response; // Extrae el blob de la respuesta
    const storage = getStorage(); // Crea una instancia de la base de datos
    const storageRef = ref(storage, `profilePics/${user.uid}`); // Crea una referencia a la ruta especificada
    return uploadBytes(storageRef, _bodyBlob); // Sube el archivo a la ruta especificada
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
        <Avatar.Accessory size="22" onPress={changeAvatar} />
        <View>
          <Text>
            {user.providerData[0].displayName
              ? user.providerData[0].displayName
              : "Anónimo"}
          </Text>
          <Text>{user.providerData[0].email}</Text>
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
*/
