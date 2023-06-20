import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApiLink } from "../api/ApiLink";
import { useNavigation } from "@react-navigation/native";

const MyAds = () => {
  const navigation = useNavigation();
  const { _id } = useSelector((state) => state.user);
  const [myAds, setMyAds] = useState([]);
  useEffect(() => {
    fetch(`${ApiLink}/ads/adsByUserId/${_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setMyAds(data))
      .catch((err) => console.log(err));
  }, [myAds]);
 // console.log(myAds);
  return (
    <ScrollView className="pt-4 mb-64">
      {myAds
        ? myAds
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
                  className="h-60 bg-[#E7EEFB] w-72 my-2 mx-[10] border border-gray-400 rounded-lg"
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
                  //onPress={() => navigation.navigate("AdDetails")}
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
            )
        : null}
    </ScrollView>
  );
};

export default MyAds;
