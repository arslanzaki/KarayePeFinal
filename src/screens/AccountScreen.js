import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../state";
import { ApiLink } from "../api/ApiLink";

import images from "./../../assets/data/images";

import { LinearGradient } from "expo-linear-gradient";

const AccountScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //const { _id, accountType } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const { _id, name, email, picturePath, accountType } = useSelector(
    (state) => state.user
  );
  const changeMode = () => {
    fetch(`${ApiLink}/auth/user/accountType`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: _id,
        accountType: {
          Buyer: 1000,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMode(data.accountType));
        alert("Switched To Normal Mode");
        navigation.navigate("Home");
      })
      .catch((err) => console.log(err));
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  //console.log(accountType)
  //console.log("jj", picturePath);
  //const [picture, setPicture] = useState("d");

  return (
    <LinearGradient colors={["#FFFFFF", "#E7EEFB"]} className="h-full">
      <View className="h-72 rounded-b-[48] bg-[#432344]">
        <Text className="font-[NordecoBold] text-3xl text-center text-[#FFC03D] mt-12">
          My Account
        </Text>
        <View className="bg-violet-50 flex flex-row items-center space-x-6 mt-8 px-4 py-6 border border-[#432344] rounded-3xl mx-4">
          <View>
            {!picturePath ? (
              <Image
                source={images.profileImage}
                className="h-20 w-20 mx-auto rounded-full"
              />
            ) : (
              // <View className="bg-[#432344] rounded-full h-32 w-32 mx-auto"></View>
              <Image
                source={{ uri: picturePath }}
                className="h-20 w-20 mx-auto rounded-full"
              />
            )}
          </View>

          <View>
            <Text className="font-[NordecoBold] text-xl">{name}</Text>
            <Text className="font-[NordecoRegular] text-sm">{email}</Text>
          </View>
        </View>
      </View>

      <Modal visible={modalVisible} onRequestClose={handleCloseModal}>
        <View className="mt-72">
          <Text className="text-2xl font-[NordecoBold] text-center">
            Are you sure to want to logout?
          </Text>

          <View className="flex flex-row items-center justify-center space-x-2">
            <TouchableOpacity
              title="Close Modal"
              onPress={() => dispatch(setLogout())}
            >
              <Text className="text-center bg-[#432344]  w-16 mt-8 py-2 text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity title="Close Modal" onPress={handleCloseModal}>
              <Text className="text-center bg-[#432344] w-16 p-2 mt-8 text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="mt-4 border-t-2 border-b-2  border-[#432344]">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileDetails", {
              _id,
              name,
              email,
              picturePath,
            })
          }
        >
          <Text className="text-lg font-[NordecoRegular] px-4 py-4">
            View Profile
          </Text>
        </TouchableOpacity>
      </View>

      {accountType?.Buyer ? (
        <View className="border-b-2 border-[#432344]">
          <TouchableOpacity
            onPress={() => navigation.navigate("ModeSwitching")}
          >
            <Text className="text-lg font-[NordecoRegular] px-4 py-4">
              Boost Your Business
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="border-b-2 border-[#432344]">
          <TouchableOpacity onPress={changeMode}>
            <Text className="text-lg font-[NordecoRegular] px-4 py-4">
              Switch To Normal Mode
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <View className="border-b-2 border-[#432344]">
        <TouchableOpacity>
          <Text className="text-lg font-[NordecoRegular] px-4 py-4">
            Apply For Verification
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* {accountType.Buyer ? (
        
      ) : (
        <View className="mt-4 border-t-2 border-b-2 border-[#432344]">
          <TouchableOpacity>
            <Text className="text-lg font-[NordecoRegular] px-4 py-4">
              Apply For Verification
            </Text>
          </TouchableOpacity>
        </View>
      )} */}

      <View className="mb-4 border-b-2 border-[#432344]">
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Text className="text-lg font-[NordecoRegular] px-4 py-4">
            About <Text className="font-bold">KarayePe!</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <View className="h-full rounded-t-[48] bg-[#FFC03D]">
          <TouchableOpacity onPress={handleOpenModal}>
            <Text className="font-[NordecoBold] text-xl py-1 bg-red-500 rounded-3xl text-center text-white w-40 mx-auto mt-16">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AccountScreen;
