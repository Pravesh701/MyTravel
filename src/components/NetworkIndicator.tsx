import { addEventListener, fetch } from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Modal, StatusBar, Text, View, StyleSheet } from "react-native";
// import ManInSpace from "src/assets/svg/ManInSpace";
// import Button from "./Button";

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
    fetch().then((state: any) => {
      setIsConnected(state.isInternetReachable);
    });
  };

  return (
    <>
      {!isConnected && <StatusBar backgroundColor="white" />}
      <Modal visible={!isConnected} animationType="fade">
        <View style={styles.container}>
          {/* <ManInSpace /> */}
          {/* <Text style={styles.title}>{t(`${PATH}/noInternet`)}</Text>
          <Text style={styles.subtitle}>{t(`${PATH}/noInternetMsg`)}</Text> */}
          {/* <Button
            btnText={t(`${PATH}/tryAgain`)}
            buttonStyle={styles.btnStyle}
            buttonWidth={220}
            borderRadius={10}
            textStyle={styles.btnTextStyle}
            onPress={onPress}
          /> */}
        </View>
      </Modal>
    </>
  );
};

export default NetworkIndicator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    paddingHorizontal: 36,
    paddingVertical: 15,
    height: undefined,
    marginTop: 40,
  },
  btnTextStyle: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "NotoSansDevanagari-Bold",
  },
  subtitle: {
    fontFamily: "NotoSansDevanagari-Regular",
    width: "70%",
    textAlign: "center",
  },
});
