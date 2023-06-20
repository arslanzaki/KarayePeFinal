import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMessage }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    //console.log("event", event);
    e.preventDefault();
    if (msg.length > 0) {
        //console.log(msg)
      handleSendMessage(msg);
      setMsg("");
    }
  };
 // console.log(msg);
  return (
    <View>
      <Text>ChatInput</Text>

      <View>
        <TextInput
          type="text"
          placeholder="type your message here"
          onChangeText={(text) => setMsg(text)}
          value={msg}
          onSubmitEditing={(e) => sendChat(e)}
        />

        {/* <Text>{msg}</Text> */}
      </View>
    </View>
  );
};

export default ChatInput;
