import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React, { useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
//import nopic from "../../../assets/nopic.png";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiLink } from "../api/ApiLink";
import { useSelector } from "react-redux";
import images from "../../assets/data/images";
import mainIcons from "../../assets/data/mainIcons";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";

const socket = io("http://192.168.0.102:3001");

const MainChatScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { fuserid } = route.params;
  //console.log("MainId", fuserid);
  const { _id } = useSelector((state) => state.user);
  //console.log(_id);

  const [ouruserdata, setOuruserdata] = React.useState(null);
  const [fuserdata, setFuserdata] = React.useState(null);

  //const [userid, setUserid] = React.useState(null);
  const [roomid, setRoomid] = React.useState(null);
  const [chat, setChat] = React.useState([""]);
  //console.log(chat)

  // OUR ID & ROOM ID FOR SOCKET.IO

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("recieved message - ", data);
      loadMessages(roomid);
    });
  }, [socket]);

  const sortroomid = (id1, id2) => {
    if (id1 > id2) {
      return id1 + id2;
    } else {
      return id2 + id1;
    }
  };

  const loadData = () => {
    fetch(`${ApiLink}/auth/user/${fuserid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFuserdata(data);
        let temproomid = sortroomid(fuserid, _id);
        setRoomid(temproomid);

        console.log("room id ", temproomid);
        socket.emit("join_room", { roomid: temproomid });
        loadMessages(temproomid);
        setLoading(false)
      })
      .catch((err) => {
        alert("Something Went Wrong!");
      });
  };

  const sendMessage = async () => {
    const messagedata = {
      message: currentmessage,
      roomid: roomid,
      senderid: _id,
      recieverid: fuserdata._id,
    };
    fetch(`${ApiLink}/messages/saveMessageToDB`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagedata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Message saved successfully") {
          socket.emit("send_message", messagedata);
          loadMessages(roomid);
          console.log("message sent");

          setCurrentmessage("");
        } else {
          alert("Network Error");
          setCurrentmessage("");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${ApiLink}/messages/setUserMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagedata),
    });
  };

  useEffect(() => {
    loadMessages(roomid);
  }, [chat]);

  const [currentmessage, setCurrentmessage] = React.useState(null);

  const loadMessages = (temproomid) => {
    fetch(`${ApiLink}/messages/getMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomid: temproomid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChat(data);
      });
  };

  const scrollViewRef = useRef();
  return (
    <>
      <View>
        <Spinner
          visible={loading}
          textContent={"Fetching Chat Data..."}
          textStyle={{ color: "#432344" }}
          animation="fade"
          overlayColor="#FFC03D"
        />
      </View>
      <View className="bg-violet-50 flex-1">
        <View className="bg-[#432344] pt-10 pb-4">
          <View className="flex flex-row items-center pl-4">
            <TouchableOpacity
              className="h-10 w-10 rounded-full bg-[#FFC03D] flex items-center justify-center"
              onPress={() => navigation.navigate("Chat")}
            >
              <Image source={mainIcons.backIcon} className="h-6 w-6" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row pl-4 mt-4 items-center space-x-3">
            {fuserdata?.picturePath ? (
              <Image
                source={{ uri: fuserdata?.picturePath }}
                className="h-16 w-16 rounded-full"
              />
            ) : (
              <Image source={images.profileImage} style={styles.profilepic} />
            )}
            <Text className="font-[NordecoBold] text-xl text-white">
              {fuserdata?.name}
            </Text>
          </View>
        </View>

        <ScrollView
          className="w-full mb-16"
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {chat.map((item, index) => {
            return (
              <View className="w-full rounded-xl" key={index}>
                {item.senderid === _id && (
                  <View className="w-full items-end">
                    <Text
                      className="font-[NordecoBold] text-white bg-blue-500 p-3 text-xl
    rounded-3xl m-2 min-w-[100]"
                    >
                      {item.message}
                    </Text>
                  </View>
                )}
                {item.senderid !== _id && item != "" && (
                  <View className="w-full items-start">
                    <Text className="font-[NordecoBold] text-white bg-gray-800 min-w-[100] text-lg p-3 rounded-3xl m-2">
                      {item.message}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View className="w-[90%] h-12 bg-[#432344] flex flex-row items-center justify-between p-3 absolute bottom-0 rounded-full mb-4 self-center">
          <TextInput
            className="w-[80%] h-4 font-lg text-white"
            placeholder="Type a message"
            placeholderTextColor={"grey"}
            onChangeText={(text) => setCurrentmessage(text)}
            value={currentmessage}
          />
          <TouchableOpacity>
            {currentmessage ? (
              <MaterialIcons
                name="send"
                size={24}
                color="#FFC03D"
                onPress={() => sendMessage()}
              />
            ) : (
              <MaterialIcons name="send" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainChatScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  profilepic: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  username: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  s1: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#111111",
    padding: 10,
  },
  sbottom: {
    width: "100%",
    height: 50,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 0,
    borderRadius: 30,
  },
  sbottominput: {
    width: "80%",
    height: 40,
    fontSize: 17,
    color: "white",
  },

  message: {
    width: "100%",
    // padding:10,
    borderRadius: 10,
    // marginVertical:5,
    // backgroundColor:'red',
  },
  messageView: {
    width: "100%",
    marginBottom: 50,
  },
  messageRight: {
    width: "100%",
    alignItems: "flex-end",
    // backgroundColor:'red'
  },
  messageTextRight: {
    color: "white",
    backgroundColor: "#1e90ff",
    // width:'min-content',
    minWidth: 100,
    padding: 10,
    fontSize: 17,
    borderRadius: 20,
    margin: 10,
  },
  messageLeft: {
    width: "100%",
    alignItems: "flex-start",
    // backgroundColor:'red'
  },
  messageTextLeft: {
    color: "white",
    backgroundColor: "#222222",
    color: "white",
    fontSize: 17,
    minWidth: 100,
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
});
