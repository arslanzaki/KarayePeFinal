import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import images from "./../../assets/data/images";
import mainIcons from "../../assets/data/mainIcons";
import { setProfilePicture } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { ApiLink } from "../api/ApiLink";

const ProfileDetails = ({ route, navigation }) => {
  const { _id, name, email, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    //console.log(result);
    if (!result.canceled) {
      //setPicture(result.assets[0].uri);
      finalPath = result.assets[0].uri;
      // console.log(finalPath)
      // console.log(_id)

      dispatch(setProfilePicture(finalPath));
      fetch(`${ApiLink}/auth/profilePicture`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: _id,
          profilePicture: finalPath,
        }),
      })
        .then((data) => {
          //console.log(data)
        })
        .catch((err) => console.log(err.message));
    }
    // console.log(image);
  };

  // const [formData, setFormData] = useState({
  //   name: name,
  //   email: email,
  //   password: "",
  //   cpassword: "",
  // });

  return (
    <View>
      <View>
        <View className="h-72 rounded-b-[48] bg-[#432344]">
          <View>
            {!picturePath ? (
              <Image
                source={images.profileImage}
                className="h-32 w-32 rounded-full mx-auto mt-20"
              />
            ) : (
              <Image
                source={{ uri: picturePath }}
                className="h-32 w-32 rounded-full mx-auto mt-20"
              />
            )}

            <View>
              <View>
                <TouchableOpacity onPress={pickImage} className="mt-2">
                  <Text className="text-center font-[NordecoBold] bg-red-500 text-white px-6 py-2 w-42 mx-auto rounded-lg">
                    Update Profile Picture
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-[#E7EEFB] absolute left-6 top-10 flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image source={mainIcons.backIcon} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mx-6">
        <View className="mt-6">
          <Text className="font-[NordecoBold] text-[#432344] text-xl">
            Name
          </Text>
          <TextInput
            className="border-b-2 p-2 text-lg"
            // onPressIn={() => setErrorMessage(null)}
            // onChangeText={(text) => setFormData({ ...formData, name: text })}
            value={name}
            editable={false}
          />
        </View>
        <View className="mt-6">
          <Text className="font-[NordecoBold] text-[#432344] text-xl">
            Email
          </Text>
          <TextInput
            className="border-[#432344] border-b-2 p-2 text-lg"
            //onPressIn={() => setErrorMessage(null)}
            //onChangeText={(text) => setFormData({ ...formData, email: text })}
            value={email}
            editable={false}
          />
        </View>

        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Text className="font-[NordecoBold] text-xl px-16 py-2 mx-auto bg-[#432344] text-[#FFC03D] mt-12 rounded-3xl">
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileDetails;
