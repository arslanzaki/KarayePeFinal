import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import mainIcons from "../../assets/data/mainIcons";
import { ApiLink } from "../api/ApiLink";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../state";

const ModeSwitchingScreen = ({ navigation }) => {
  const { _id, accountType } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const changeMode = () => {
    fetch(`${ApiLink}/auth/user/accountType`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: _id,
        accountType: {
          Seller: 2000,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMode(data.accountType));
        alert("Switched To Business Mode");
        navigation.navigate("Home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <View className="bg-[#432344] py-10">
        <View className="flex flex-row-reverse items-center justify-end pr-4">
          <Text className="font-[NordecoBold] text-3xl ml-4 text-[#FFC03D]">
            Business Mode
          </Text>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-[#FFC03D] flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image source={mainIcons.backIcon} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text className="font-[NordecoBold] text-center text-3xl mt-12">
          Are You Rental Business Owner?
        </Text>
        <Text className="font-[NordecoBold] text-center mt-2 px-4">
          Switch to business mode to boost your rental business by adding
          listings.
        </Text>
        <TouchableOpacity onPress={changeMode}>
          <Text className="text-center bg-[#432344] py-2 w-48 mx-auto mt-32 text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
            Switch
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModeSwitchingScreen;
