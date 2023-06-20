import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

const CustomTabBar = (props) => {
  return (
    <View>
      <View className="absolute right-2 left-2 bottom-7 h-5 bg-white rounded-lg shadow-black" />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;