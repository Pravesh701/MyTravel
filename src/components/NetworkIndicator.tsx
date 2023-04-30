import React, { useEffect, useState } from "react";
import NetInfo, { addEventListener } from "@react-native-community/netinfo";
import { Modal, StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native";

//Custom Imports
import color from "../constants/color";
import fontFamily from "../constants/fontFamily";
import ManInSpace from "../assets/svgs/ManInSpace";

type Props = {}

const NetworkIndicator = (props: Props) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      if (state.isInternetReachable === false) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const onPress = () => {
    NetInfo.fetch().then((state: any) => {
      setIsConnected(state.isInternetReachable);
    });
  };

  return (
    <>
      {!isConnected && <StatusBar backgroundColor="white" />}
      <Modal visible={!isConnected} animationType="fade">
        <View style={styles.container}>
          <ManInSpace />
          <Text style={styles.title}>{"Oops! No Internet"}</Text>
          <Text style={styles.subtitle}>{"Your Internet is not working Please try again."}</Text>
          <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
            <Text style={styles.btnTextStyle}>{"Try again"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default NetworkIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  btnStyle: {
    height: 44,
    borderRadius: 10,
    backgroundColor: color.primary,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  btnTextStyle: {
    fontSize: 20,
    color: color.white,
    fontFamily: fontFamily.bold,
  },
  title: {
    fontSize: 24,
    color: color.mediumBlack,
    fontFamily: fontFamily.bold,
  },
  subtitle: {
    color: color.mediumBlack,
    fontFamily: fontFamily.regular,
    width: "70%",
    textAlign: "center",
  },
});
