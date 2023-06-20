import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CreateAdScreen = ({ navigation }) => {
  return (
    <View>
       <View className="bg-[#432344] pt-12 pb-8">
        <Text className="font-[NordecoBold] text-3xl text-center text-[#FFC03D]">
          Ad Creation
        </Text>
      </View>
      <Text className="font-[NordecoBold] text-center text-3xl mt-12">
        No Listing Yet?
      </Text>
      <Text className="font-[NordecoBold] text-center mt-2">
        Create your first listing today! It only takes a minute
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("AdCreationS1")}>
        <Text className="text-center bg-[#432344] py-2 w-48 mx-auto mt-32 text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
        Create
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAdScreen;
