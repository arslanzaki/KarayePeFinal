import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ name, iconName }) => {
  //const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-col items-center mr-2"
      onPress={() => navigation.navigate("CategorySearch", {name})}
    >
      <View className="bg-[#E7EEFB] h-20 w-20 rounded-full flex-1 items-center justify-center ">
        <Image source={iconName} className="h-12 w-12" />
      </View>
      <Text className="text-gray-500 font-[NordecoBold] text-sm mt-2">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
