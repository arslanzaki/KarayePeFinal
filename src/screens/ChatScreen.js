import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { ApiLink } from "./../api/ApiLink";
import ChatCard from "../components/ChatCard";
import Spinner from "react-native-loading-spinner-overlay";

const ChatScreen = ({ navigation }) => {
  // let chats = [
  //     {
  //         roomid: "6353f0c6a52cde6dafae64d2634c1d60f09a4f3ff40be517",
  //         fuserid: "634c224bc4fbf37da83c5efa",
  //         lastmessage: "This is the third message",
  //         ouruserid: "634c1d60f09a4f3ff40be517"
  //     }
  // ]
  const [loading, setLoading] = useState(true);
  const { _id } = useSelector((state) => state.user);

  //console.log("us",_id);
  const [chats, setChats] = useState(null);
  //console.log(chats)
  const [keyword, setKeyword] = useState("");

  // console.log(keyword)

  //const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    loadchats();
  }, [chats]);
  const loadchats = () => {
    fetch(`${ApiLink}/messages/getUserMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        data.sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          }
        });
        setChats(data);
        setLoading(false);
      })
      .catch((err) => {
        alert("No Chats Found!");
        setChats([]);
      });
  };

  return (
    <ScrollView className="bg-[#FFC03D]">
      <View>
        <Spinner
          visible={loading}
          textContent={"Loading Chats..."}
          textStyle={{ color: "#432344" }}
          animation="fade"
          overlayColor="#FFC03D"
        />
      </View>
      <View className="bg-[#432344] pt-12 pb-8">
        <View className="pr-4">
          <Text className="font-[NordecoBold] text-center text-3xl ml-4 text-[#FFC03D]">
            Chat Section
          </Text>
        </View>

        <View>
          <View className="flex-row items-center space-x-2 px-4">
            <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3 rounded-xl mt-4">
              <Ionicons name="search-outline" size={20} />
              <KeyboardAvoidingView>
                <TextInput
                  keyboardType="default"
                  placeholder="Search"
                  onChangeText={(text) => setKeyword(text)}
                  className="w-64"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </View>

      <View className="w-full p-3">
        {chats !== null &&
          chats
            .filter((chat) => {
              if (keyword == "") {
                return chat;
              } else if (
                // chat.name.toLowerCase().includes(keyword.toLowerCase()) ||
                chat.message.toLowerCase().includes(keyword.toLowerCase())
              ) {
                return chat;
              }
            })
            .map((chat) => {
              return (
                <ChatCard
                  key={chat.roomid}
                  chat={chat}
                  navigation={navigation}
                />
              );
            })}
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  gohomeicon: {
    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 10,
    color: "white",
    fontSize: 30,
  },
  c1: {
    width: "95%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    backgroundColor: "#111111",
    alignSelf: "center",
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  searchbar: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 18,
  },
  c2: {
    width: "100%",
    padding: 10,
  },
});
