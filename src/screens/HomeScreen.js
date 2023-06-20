import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAds } from "../state";

import Ionicons from "@expo/vector-icons/Ionicons";
import Categories from "../components/Categories";
import { ApiLink } from "../api/ApiLink";
import Spinner from "react-native-loading-spinner-overlay";

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const ads = useSelector((state) => state.ads);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  //console.log("y");
  //const getAds = () => {};

  // const [picture, setPicture] = useState("");
  // const [username, setUsername] = useState("");

  
  useEffect(() => {
    fetch(`${ApiLink}/ads`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAds({ ads: data }));
        setLoading(false);
      })
      .catch((err) => alert(err.message));
  }, [ads, user]);
  //console.log(ads);

  return (
    <>
      <ScrollView>
        <View>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#432344" }}
            animation="fade"
            overlayColor="#FFC03D"
          />
        </View>
        <View className="pt-8">
          <Text className="font-[NordecoBold] text-3xl ml-4 text-[#432344]">
            KarayePe!
          </Text>

          <View>
            <Text className="font-[NordecoBold] text-[16px] ml-4 mt-4">
              I'm looking for a
            </Text>

            <View className="flex-row items-center space-x-2 pb-2 px-4">
              <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3 rounded-xl mt-4">
                <Ionicons name="search-outline" size={20} />
                <KeyboardAvoidingView>
                  <TextInput
                    placeholder="Bicycle"
                    keyboardType="default"
                    onChangeText={(newText) => setSearchTerm(newText)}
                    value={searchTerm}
                    onSubmitEditing={() =>
                      navigation.navigate("Search", { searchTerm })
                    }
                    className="w-64"
                  />
                </KeyboardAvoidingView>
              </View>
              {/* <AdjustmentsIcon color="#00CCBB" /> */}
            </View>
          </View>

          {/* CATEGORIES */}
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <Categories />
          </ScrollView>

          {/* TRENDING NOW */}

          {/* LISTINGS */}
          <View className="flex flex-row flex-wrap">
            {!ads ? (
              <Text>Loading...</Text>
            ) : (
              ads
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
                    createdAt,
                  }) => (
                    <TouchableOpacity
                      key={_id}
                      className="w-[160px] h-[170px] bg-[#E7EEFB] mx-auto my-2 border border-gray-400 rounded-lg"
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
                          createdAt,
                        })
                      }
                    >
                      <View>
                        <View className="flex items-center mt-2">
                          <Image
                            source={{ uri: adPicturePath }}
                            className="w-[145px] h-[100px] rounded-lg"
                          />
                        </View>

                        <View>
                          <Text
                            style={{
                              fontFamily: "NordecoBold",
                              paddingHorizontal: 8,
                              marginTop: 8,
                            }}
                          >
                            {title}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "NordecoBold",
                              paddingHorizontal: 8,
                              marginTop: 2,
                              fontSize: 12,
                              color: "#777A7E",
                            }}
                          >
                            Rs.{itemRent} per {rentDuration}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                )
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
