import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import mainIcons from "../../assets/data/mainIcons";

const AboutKP = ({ navigation }) => {
  return (
    <>
      <View className="bg-[#432344] py-10">
        <View className="flex flex-row-reverse items-center justify-end pr-4">
          <Text className="font-[NordecoBold] text-3xl ml-4 text-[#FFC03D]">
            About KarayePe!
          </Text>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-[#FFC03D] flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image source={mainIcons.backIcon} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Text className="font-[NordecoRegular] text-center px-2 mt-6 text-lg">
          <Text className="font-[NordecoBold] text-[#432344]">KarayePe!</Text>{" "}
          is a rental service app that provides a platform for rental business
          owners and customers to connect and conduct business in a seamless and
          user-friendly manner. This app is designed to benefit both rental
          business owners and normal buyers, providing a one-stop-shop where
          both parties can find what they need.
        </Text>
        <Text className="font-[NordecoRegular] text-center px-2 mt-6 text-lg">
          For rental business owners,{" "}
          <Text className="font-[NordecoBold] text-[#432344]">KarayePe!</Text>{" "}
          offers a way to easily and efficiently list their rental items, manage
          their inventory, and connect with potential customers. By listing
          their rental items on the app, rental business owners can reach a
          wider audience and increase their sales, while also benefiting from
          the app's user-friendly interface and intuitive functionality.
        </Text>
        <Text className="font-[NordecoRegular] text-center px-2 mt-6 text-lg">
          For normal users,{" "}
          <Text className="font-[NordecoBold] text-[#432344]">KarayePe!</Text>{" "}
          provides a convenient and efficient way to browse rental items, check
          prices, and book items for rental. With a wide range of rental items
          available on the app, customers can easily find what they need, and
          the app's in-built chat and search mechanism ensures that they can
          make informed decisions about the items they are interested in.
        </Text>
        <Text className="font-[NordecoRegular] text-center px-2 mt-6 text-lg mb-6">
          Overall,{" "}
          <Text className="font-[NordecoBold] text-[#432344]">KarayePe!</Text>{" "}
          is an app that benefits both rental business owners and normal users,
          providing a seamless and efficient platform for conducting rental
          transactions. Whether you are a rental business owner looking for a
          way to increase your sales and reach a wider audience, or a customer
          looking for an easy and convenient way to rent items, "KarayePe!" is
          the perfect solution for all your rental needs.
        </Text>
      </ScrollView>
    </>
  );
};

export default AboutKP;
