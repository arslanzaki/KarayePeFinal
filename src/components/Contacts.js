import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import images from "../../assets/data/images";

const Contacts = ({ contacts }) => {
  const { picturePath } = useSelector((state) => state.user);
  // //const [currentUserName, setCurrentUserName] = useState(user.name);
  // const [currentUserImage, setCurrentUserImage] = useState(picturePath);
  // //console.log(currentUserImage);
  // const [currentSelected, setCurrentSelected] = useState(undefined);
  // //console.log(contacts);
  // const changeCurrentChat = (index, contact) => {
  //   setCurrentSelected(index);
  //   changeChat(contact);
  // };
  //console.log(contacts)
  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
        showsHorizontalScrollIndicator={false}
        className="space-y-1"
      >
        {contacts.map((contact, index) => {
          return (
            <TouchableOpacity
              key={contact._id}
              className="flex flex-row items-center"
            >
              <View>
                <View className="flex flex-row items-center space-x-4 border w-80 py-6 px-4 rounded-3xl">
                  {!contact.picturePath ? (
                    <Image
                      source={images.profileImage}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <Image
                      source={{ uri: contact.picturePath }}
                      className="h-12 w-12 rounded-full"
                    />
                  )}

                  <Text className="text-xl font-[NordecoBold] ml-6">
                    {contact.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Contacts;
