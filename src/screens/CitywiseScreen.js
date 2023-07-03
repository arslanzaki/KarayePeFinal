import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ApiLink } from "../api/ApiLink";
import { Image } from "react-native";

const CitywiseScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [resultAds, setResultAds] = useState([]);

  const getAds = () => {
    setLoading(true);
    fetch(`${ApiLink}/ads/search/city?search=${searchCity}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setResultAds(data);
        setLoading(false);
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => getAds(), [searchCity]);

  return (
    <>
      <View>
        <Spinner
          visible={loading}
          textContent={"Loading City Wise Ads..."}
          textStyle={{ color: "#432344" }}
          animation="fade"
          overlayColor="#FFC03D"
        />
      </View>

      <View className="bg-[#432344] pt-12 pb-8">
        <View className="pr-4">
          <Text className="font-[NordecoBold] text-center text-3xl ml-4 text-[#FFC03D]">
            City Wise Search
          </Text>
        </View>

        <View>
          <View className="flex-row items-center space-x-2 px-4">
            <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3 rounded-xl mt-4">
              <Ionicons name="search-outline" size={20} />
              <KeyboardAvoidingView>
                <TextInput
                  keyboardType="default"
                  placeholder="Lahore"
                  onChangeText={(newText) => setSearchTerm(newText)}
                  onSubmitEditing={() => {
                    setSearchCity(searchTerm);
                  }}
                  className="w-64"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="pt-4">
        <View>
          {resultAds
            .slice(0)
            .reverse()
            .map(
              ({
                _id,
                userId,
                name,
                location,
                title,
                description,
                adPicturePath,
                userPicturePath,
                category,
                itemRent,
                rentDuration,
                securityRequirement,
              }) => (
                <TouchableOpacity
                  key={_id}
                  className="h-60 bg-[#E7EEFB] mx-[10] my-2 border border-gray-400 rounded-lg"
                  onPress={() =>
                    navigation.navigate("AdDetails", {
                      _id,
                      userId,
                      name,
                      location,
                      title,
                      description,
                      adPicturePath,
                      userPicturePath,
                      category,
                      itemRent,
                      rentDuration,
                      securityRequirement,
                    })
                  }
                >
                  <View>
                    <View className="flex items-center mt-2">
                      <Image
                        source={{ uri: adPicturePath }}
                        className="w-11/12 h-[160px] rounded-lg object-fill"
                      />
                    </View>

                    <View>
                      <Text className="font-[NordecoBold] mt-2 text-center text-xl">
                        {title}
                      </Text>
                      <Text className="font-[NordecoBold] text-center text-[#777A7E] text-sm">
                        Rs.{itemRent} per {rentDuration}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )}
        </View>
      </ScrollView>
    </>
  );
};

export default CitywiseScreen;
