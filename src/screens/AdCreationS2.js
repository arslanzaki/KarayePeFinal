import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import mainIcons from "../../assets/data/mainIcons";
import { ApiLink } from "../api/ApiLink";

const AdCreationS2 = ({ route, navigation }) => {
  //console.log("s2");
  const { adPicturePath, category, title, description } = route.params;
  const userId = useSelector((state) => state.user._id);


  const [itemRent, setItemRent] = useState(0);
  const [rentDuration, setRentDuration] = useState("");
  const [securityRequirement, setSecurityRequirement] = useState("");
 

  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: 30.799115,
    longitude: 73.43148,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  if (errorMessage) {
    alert(errorMessage);
  }

  const adData = {
    userId: userId,
    title: title,
    description: description,
    category: category,
    adPicturePath: adPicturePath,
    itemRent: itemRent,
    rentDuration: rentDuration,
    securityRequirement: securityRequirement,
    // latitude: latitude,
    // longitude: longitude
  };

  //console.log(JSON.stringify(adData))
  const sendToBackend = () => {
    try {
      if (
        adData.title == "" ||
        adData.description == "" ||
        adData.adPicturePath == "" ||
        adData.category == "" ||
        adData.itemRent == 0 ||
        adData.rentDuration == "" ||
        adData.securityRequirement == ""
        // adData.latitude == "" ||
        // adData.longitude == ""
      ) {
        setErrorMessage("All Fields Are Required!");
        return;
      } else {
        fetch(`${ApiLink}/ads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(adData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("test", data);
            alert("Ad Created Successfully!");
            navigation.navigate("Home");
          })
          .catch((err) => {
            alert(err.message);
            console.log(err);
          });
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <ScrollView className="bg-[#E7EEFB]">
      <View className="bg-[#432344] pt-10 pb-6">
        <View className="flex flex-row-reverse items-center justify-end pr-4">
          <Text className="font-[NordecoBold] text-3xl ml-4 text-[#FFC03D]">
            Create Ad
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
        <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-6">
          Set Rent
        </Text>
        <TextInput
          placeholder="Rent"
          keyboardType="number-pad"
          onChangeText={(text) => setItemRent(text)}
          className="border mx-4 h-12 px-4 bg-gray-100"
        />

        <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
          Rent Duration
        </Text>
        <View className="border bg-[#FFC03D] mx-4">
          <Picker
            selectedValue={adData.rentDuration}
            onValueChange={(itemValue, itemIndex) => setRentDuration(itemValue)}
            mode="dialog"
            dropdownIconColor={"#432344"}
            dropdownIconRippleColor={"#432344"}
          >
            <Picker.Item label="Per Month" value="Month" color="#432344"/>
            <Picker.Item label="Per Week" value="Week" color="#432344" />
            <Picker.Item label="Per Day" value="Day" color="#432344" />
            <Picker.Item label="Per Hour" value="Hour" color="#432344" />
          </Picker>
        </View>
        <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
          Security Requirement
        </Text>
        <View className="border bg-[#FFC03D] mx-4">
          <Picker
            selectedValue={adData.securityRequirement}
            onValueChange={(itemValue, itemIndex) =>
              setSecurityRequirement(itemValue)
            }
          >
            <Picker.Item label="CNIC" value="cnic" color="#432344" />
            <Picker.Item label="Bank Cheque" value="cheque" color="#432344" />
            <Picker.Item label="Other" value="other" color="#432344" />
          </Picker>
        </View>
      </View>

      <Text className="text-gray-500 font-[NordecoBold] text-lg mt-4 text-center">
        Choose Meetup/Shop Location
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
            coordinate={{ latitude: 30.799115, longitude: 73.43148 }}
          />
        </MapView>

        {/* {setLocation(region)} */}
        {/* <Text>{location.latitude}</Text> */}
      </View>

      <TouchableOpacity
        onPress={() => {
          sendToBackend();
        }}
      >
        <Text className="text-center bg-[#432344] py-2 w-48 mx-auto mt-8 text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
          Create
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdCreationS2;
