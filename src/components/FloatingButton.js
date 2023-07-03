import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
} from "react-native";
import React, { useRef } from "react";
import mainIcons from "./../../assets/data/mainIcons";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const FloatingButton = ({ phoneNumber, userId,location }) => {
  console.log(parseFloat(location.latitude))
  const fuserid = userId;
  
  const navigation = useNavigation();
  const { _id } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  console.log("Add User Id", userId);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = "telprompt:${" + phoneNumber + "}";
    } else {
      number = "tel:${" + phoneNumber + "}";
    }
    Linking.openURL(number);
  };

  const mapRef = useRef(null);
  const [marker, setMarker] = useState({
    latitude: parseFloat(location.latitude),
    longitude: parseFloat(location.latitude),
  });
  const [region, setRegion] = useState({
    latitude: parseFloat(location.latitude),
    longitude: parseFloat(location.longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  return (
    <>
      <Modal visible={modalVisible} onRequestClose={handleCloseModal}>
        <View className="pt-60 bg-[#FFC03D] flex-1">
          <Text className="text-center font-[NordecoBold] text-3xl text-[#432344]">
            Meetup Location
          </Text>
          <View className="flex items-center mt-2">
            <MapView
              className="h-[220px] w-[280px]"
              ref={mapRef}
              initialRegion={region}
              // onRegionChangeComplete={(reg) => setLocation(reg)}
            >
              <Marker
                draggable
                coordinate={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)}}
              />
            </MapView>

            {/* {setLocation(region)} */}
            {/* <Text>{location.latitude}</Text> */}
          </View>
          <TouchableOpacity title="Close Modal" onPress={handleCloseModal}>
            <Text className="text-center bg-[#432344] w-32 p-2 mt-8 mx-auto text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {userId === _id ? null : (
        <View className="absolute bottom-10 z-50 w-full">
          <View className="bg-[#FFC03D] p-5 rounded-full flex-row items-center justify-between mx-6">
            <TouchableOpacity
              className="flex flex-row items-center ml-2"
              onPress={handleOpenModal}
            >
              <Image source={mainIcons.locationIcon} className="h-6 w-6" />
              <Text className="font-[NordecoBold] text-[#432344] text-xl">
                Location
              </Text>
            </TouchableOpacity>
            <View className="border-r-4 border-[#432344] h-8 rounded-full"></View>
            <TouchableOpacity
              className="flex flex-row items-center space-x-1 mr-4"
              onPress={() =>
                navigation.navigate("MainChatScreen", {
                  fuserid,
                })
              }
            >
              <Image source={mainIcons.chatIcon} className="h-6 w-6" />
              <Text className="font-[NordecoBold] text-[#432344] text-xl">
                Chat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default FloatingButton;
