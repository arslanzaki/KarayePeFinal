import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
//import nopic from "../../assets/nopic.png";
import { ApiLink } from "../api/ApiLink";
import images from "./../../assets/data/images";
const ChatCard = ({ chat, navigation }) => {
  //console.log(chat.fuserid);
  let [fuserdata, setFuserdata] = React.useState(null);
  useEffect(() => {
    fetch(`${ApiLink}/auth/user/${chat.recieverid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFuserdata(data);
      })
      .catch((err) => {
        alert("Something went wrong");
        setFuserdata(null);
      });
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MainChatScreen", {
          fuserid: fuserdata._id,
        });
      }}
    >
      <View className="bg-violet-50 w-full mt-3 rounded-lg p-3 flex flex-row items-center">
        {fuserdata?.picturePath ? (
          <Image
            source={{ uri: fuserdata?.picturePath }}
            style={styles.image}
          />
        ) : (
          <Image source={images.profileImage} style={styles.image} />
        )}

        <View className="ml-5">
          <Text className="text-[#432344] font-[NordecoBold] text-xl">
            {fuserdata?.name}
          </Text>
          <Text style={styles.lastmessage}>{chat.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  ChatCard: {
    backgroundColor: "#111111",
    width: "100%",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  username: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  c1: {
    marginLeft: 20,
  },
  lastmessage: {
    color: "gray",
    fontSize: 19,
  },
});
