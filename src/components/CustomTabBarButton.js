import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomTabBarButton = (props) => {
  const { children, onPress } = props;

  return (
    <TouchableOpacity
      // activeOpacity={1}
      onPress={onPress}
      style={styles.activeBtn}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  activeBtn: {
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#FF2525",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
});
