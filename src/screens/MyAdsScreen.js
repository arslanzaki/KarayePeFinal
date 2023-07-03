// import React, { useEffect, useState } from "react";
// import { StyleSheet } from "react-native";
// import { Layout, Tab, TabView, Text } from "@ui-kitten/components";
// import MyAds from "../components/MyAds";
// import FavouriteAds from "../components/FavouriteAds";
// import { ApiLink } from "../api/ApiLink";
// import { useSelector } from "react-redux";

// const FavScreen = () => {
//   const [selectedIndex, setSelectedIndex] = React.useState(0);

//   return (
//     <TabView
//       selectedIndex={selectedIndex}
//       onSelect={(index) => setSelectedIndex(index)}
//       tabBarStyle={{ marginTop: 32, height: 72 }}
//       indicatorStyle={{ backgroundColor: "#432344" }}
//     >
//       <Tab title="My Ads">
//         <Layout style={styles.tabContainer}>
//           <MyAds />
//         </Layout>
//       </Tab>
//       <Tab title="Favourites">
//         <Layout style={styles.tabContainer}>
//           <FavouriteAds />
//         </Layout>
//       </Tab>
//     </TabView>
//   );
// };

// export default FavScreen;
// const styles = StyleSheet.create({
//   tabContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ApiLink } from "../api/ApiLink";
import Spinner from "react-native-loading-spinner-overlay";

const MyAdsScreen = () => {
  
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { _id } = useSelector((state) => state.user);
  const [myAds, setMyAds] = useState([]);
  useEffect(() => {
    fetch(`${ApiLink}/ads/adsByUserId/${_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMyAds(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [myAds]);

 
  return (
    <>
      <Spinner
        visible={loading}
        textContent={"Loading Ads..."}
        textStyle={{ color: "#432344" }}
        animation="fade"
        overlayColor="#FFC03D"
      />

      <View className="bg-[#432344] pt-12 pb-10">
        <Text className="font-[NordecoBold] text-3xl text-center text-[#FFC03D]">
          My Ads
        </Text>
      </View>
      <ScrollView className="pt-4 mb-8">
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
                  city,
                  address,
                  title,
                  description,
                  adPicturePath,
                  userPicturePath,
                  category,
                  itemRent,
                  rentDuration,
                  securityRequirement,
                }) => (
                  <View
                    key={_id}
                    className="h-72 bg-[#E7EEFB] my-2 mx-[10] border border-gray-400 rounded-lg"
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

                    <View className="flex flex-row items-center justify-around mt-4">
                    <TouchableOpacity
                        onPress={() => {
                          setLoading(true);
                          fetch(`${ApiLink}/ads/deleteAd`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },

                            body: JSON.stringify({
                              id: _id,
                            }),
                          });
                          setLoading(false)
                        }}
                      >
                        <Text className="text-center font-[NordecoBold] bg-red-500 text-white px-6 py-2 w-24 mx-auto rounded-lg">
                          Delete
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("AdDetails", {
                            _id,
                            userId,
                            name,
                            location,
                            city,
                            address,
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
                        <Text className="text-center font-[NordecoBold] bg-green-500 text-white px-6 py-2 w-20 mx-auto rounded-lg">
                          View
                        </Text>
                      </TouchableOpacity>

                      

                      {/* <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Edit", {
                            _id,
                            userId,
                            name,
                            location,
                            city,
                            address,
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
                        <Text className="text-center font-[NordecoBold] bg-purple-500 text-white px-6 py-2 w-20 mx-auto rounded-lg">
                          Edit
                        </Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                )
              )
          : null}
      </ScrollView>
    </>
  );
};

export default MyAdsScreen;
