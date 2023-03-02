import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { reload } from "firebase/auth";
import UserLogged from "../../../user/UserLogged";
import UserGuest from "./UserGuest";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../../../kernel/components/Loading";

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem("@session");
        setSession(JSON.parse(value));
        if (value !== null) {
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        console.log("Error -> Profile.js -> checkUser" + error);
      }
    };
    checkUser();
  }, [reload]);

  if (user === null) return <Loading isVisible={true} text="Loading" />;
  return user ? <UserLogged /> : <UserGuest navigation={navigation} />;
}

const styles = StyleSheet.create({});
