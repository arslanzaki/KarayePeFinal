import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import mainIcons from "../../assets/data/mainIcons";
import { ApiLink } from "../api/ApiLink";
import Spinner from "react-native-loading-spinner-overlay";

const CategorySearchScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const [newSearchTerm, setSearchTerm] = useState(name.toLowerCase());

  const [resultAds, setResultAds] = useState([]);
  const [loading, setLoading] = useState(false);
  //console.log(searchTerm);

  const getAds = () => {
    setLoading(true);
    fetch(`${ApiLink}/ads/search/category?search=${newSearchTerm}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setResultAds(data);
        setLoading(false);
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => getAds(), []);
  //console.log("search", resultAds);
  return (
    <>
      <View className="bg-[#432344] py-10">
        <View>
          <Spinner
            visible={loading}
            textContent={"Searching..."}
            textStyle={{ color: "#432344" }}
            animation="fade"
            overlayColor="#FFC03D"
          />
        </View>
        <View className="flex flex-row-reverse items-center justify-end pr-4">
          <Text className="font-[NordecoBold] text-3xl ml-4 text-[#FFC03D]">
            {name}
          </Text>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-[#FFC03D] flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image source={mainIcons.backIcon} className="h-6 w-6" />
          </TouchableOpacity>
        </View>

        <View>
          <View className="flex-row items-center space-x-2 px-4">
            <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3 rounded-xl mt-4">
              <Ionicons name="search-outline" size={20} />
              <KeyboardAvoidingView>
                <TextInput
                  keyboardType="default"
                  onChangeText={(newText) => setSearchTerm(newText)}
                  value={newSearchTerm}
                  onEndEditing={() => getAds()}
                  className="w-64"
                  autoCapitalize="none"
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

export default CategorySearchScreen;
