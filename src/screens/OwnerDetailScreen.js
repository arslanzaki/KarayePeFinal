import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import mainIcons from "../../assets/data/mainIcons";
import images from "../../assets/data/images";
import { ApiLink } from "../api/ApiLink";

const OwnerDetailScreen = ({ route, navigation }) => {
  const { userId, name, adPicturePath, userPicturePath } = route.params;

  const [resultAds, setResultAds] = useState([]);
  //console.log(searchTerm);

  const getAds = () => {
    fetch(`${ApiLink}/ads/adsByUserId/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setResultAds(data))
      .catch((err) => alert(err.message));
  };

  useEffect(() => getAds(), [resultAds]);
  //console.log(resultAds);
  return (
    <ScrollView>
      <View>
        <View className="h-72 rounded-b-[48] bg-[#432344]">
          <View>
            {/* <Image
              source={{ uri: adPicturePath }}
              className="rounded-full h-20 w-20 mx-auto mt-20"
            /> */}
            {!userPicturePath ? (
              <Image
                source={images.profileImage}
                className="h-20 w-20 rounded-full mx-auto mt-20"
              />
            ) : (
              <Image
                source={{ uri: userPicturePath }}
                className="h-20 w-20 rounded-full mx-auto mt-20"
              />
            )}
            <Text className="mt-2 text-2xl text-white font-[NordecoBold] text-center">
              {name}
            </Text>
          </View>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-[#E7EEFB] absolute left-6 top-10 flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image source={mainIcons.backIcon} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text></Text>
      </View>

      <View>
        <View className="mt-52 rounded-t-[48] bg-[#FFC03D]">
          <Text className="text-center font-[NordecoBold] text-[#432344] text-2xl mt-8">
            Listings
          </Text>
          <View className="flex flex-row flex-wrap mt-12 mb-48">
            {resultAds.length == 0 ? (
              <Text className="text-lg font-[NordecoBold] mx-auto">
                Loading...
              </Text>
            ) : (
              resultAds
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
      </View>
    </ScrollView>
  );
};

export default OwnerDetailScreen;
