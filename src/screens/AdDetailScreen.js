import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";

// import { ScrollView } from "react-native-virtualized-view";
import mainIcons from "./../../assets/data/mainIcons";
import images from "./../../assets/data/images";
import FloatingButton from "../components/FloatingButton";
import { useEffect, useState } from "react";
import { ApiLink } from "../api/ApiLink";
import Ionicons from "@expo/vector-icons/Ionicons";
//import { removeFavourites, setFavourites } from "../state";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment/moment";
import Lightbox from "react-native-lightbox";
import ImageView from "react-native-image-viewing";

const AdDetailScreen = ({ route, navigation }) => {
  const {
    _id,
    userId,
    name,
    location,
    title,
    description,
    adPicturePath,
    category,
    itemRent,
    rentDuration,
    securityRequirement,
    createdAt,
  } = route.params;

  const [userPicturePath, setUserPicturePath] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [addToFavourite, setAdToFavourite] = useState(false);
  // let date = new Date(createdAt);
  // date = new Date(date.getTime() + (date.getTimezoneOffset()*6000))
  // console.log(createdAt);
  // console.log(date);
  const dateFinal = moment(createdAt).format("LLL");
  console.log(dateFinal);
  //const { favouriteAds } = useSelector((state) => state.user);
  // console.log("fav", favouriteAds);
  //const [filled, setFilled] = useState(addToFavourite);

  // const [name, setName] = useState("");

  const user = useSelector((state) => state.user);
  console.log("userid", user._id);
  console.log("adid", _id);

  // if (addToFavourite) {
  //   fetch(`${ApiLink}/ads/addFavouriteAds`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       userId: user._id,
  //       adId: _id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // } else {
  //   fetch(`${ApiLink}/ads/removeFavouriteAds`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: {
  //       userId: user._id,
  //       adId: _id,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       //console.log(data);
  //       //removeFavourites(data);
  //     });
  // }
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${ApiLink}/auth/user/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserPicturePath(data.picturePath);
        setPhoneNumber(data.phoneNumber);
        setLoading(false);
      });
  }, [userPicturePath]);

  return (
    <>
      <FloatingButton phoneNumber={phoneNumber} userId={userId} />
      <ScrollView>
        <SafeAreaView>
          <View>
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={{ color: "#432344" }}
              animation="fade"
              overlayColor="#FFC03D"
            />
          </View>
          <View>
            {/* <Lightbox className="flex-1">
            </Lightbox> */}
            <Image
              source={{ uri: adPicturePath }}
              className="h-80 w-screen"
              resizeMethod="resize"
              resizeMode="cover"
            />

            <TouchableOpacity
              className="h-10 w-10 rounded-full bg-[#E7EEFB] absolute left-6 top-10 flex items-center justify-center"
              onPress={() => navigation.goBack()}
            >
              <Image source={mainIcons.backIcon} className="h-6 w-6" />
            </TouchableOpacity>
            {/* <TouchableOpacity className="h-10 w-10 rounded-full bg-[#E7EEFB] absolute right-6 top-10 flex items-center justify-center">
              <Image source={mainIcons.shareIcon} className="h-6 w-6" />
            </TouchableOpacity> */}
          </View>
          {/* //////////////////////////////////////////////////////////////////////////// */}

          <View className="bg-[#432344] h-48 relative bottom-12 rounded-t-[48]">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-2xl text-white font-[NordecoBold] mt-6 ml-6">
                {title}
              </Text>

              <TouchableOpacity
                onPress={() => setAdToFavourite(!addToFavourite)}
              >
                {addToFavourite ? (
                  <Ionicons
                    name="heart"
                    size={30}
                    style={{
                      marginTop: 24,
                      marginRight: 24,
                    }}
                    color={"red"}
                  />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    size={30}
                    style={{
                      marginTop: 24,
                      marginRight: 24,
                    }}
                    color={"red"}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text className="ml-6 font-[NordecoRegular] text-gray-500">
                {dateFinal}
              </Text>
            </View>

            <TouchableOpacity
              className="mt-4 ml-6 flex flex-row space-x-2 items-center"
              onPress={() =>
                navigation.navigate("OwnerDetails", {
                  userId,
                  name,
                  adPicturePath,
                  userPicturePath,
                })
              }
            >
              <View>
                {!userPicturePath ? (
                  <Image
                    source={images.profileImage}
                    className="h-14 w-14 rounded-full"
                  />
                ) : (
                  <Image
                    source={{ uri: userPicturePath }}
                    className="h-14 w-14 rounded-full"
                  />
                )}
              </View>
              <View>
                <Text className="text-sm font-[NordecoBold] text-[#FFC03D]">
                  Owned By
                </Text>
                <Text className="font-[NordecoBold] text-white text-lg">
                  {name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* ///////////////////////////////////////////////////////////////////////////////////// */}

          <View className="bg-[#E7EEFB] h-screen relative bottom-20 rounded-t-[48]">
            <View>
              <Text className="font-[NordecoBold] text-red-500 text-3xl ml-6 mt-6">
                Rs. {itemRent}
              </Text>
              <Text className="font-[NordecoBold] text-gray-500 text-sm ml-24">
                per {rentDuration}
              </Text>
            </View>
            <View className="border-b-4 border-gray-500 w-32 mx-auto mt-6 rounded-full"></View>

            {/* /////////////////////////////////////////////////// */}
            <View className="mx-6 mt-6">
              <Text className="font-[NordecoBold] text-2xl">
                Listing Details
              </Text>
              <Text className="font-[NordecoRegular] text-lg mt-4">
                {description}
              </Text>
            </View>
          </View>

          {/* ///////////////////////////////////////////////////// */}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default AdDetailScreen;
