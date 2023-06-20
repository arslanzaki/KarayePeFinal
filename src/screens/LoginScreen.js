import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

// import { useFonts } from "expo-font";
// import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { ApiLink } from "../api/ApiLink";

const LoginScreen = ({ navigation }) => {
  // const [fontsLoaded] = useFonts({
  //   NordecoRegular: require("../../assets/fonts/Nordeco-Regular.ttf"),
  //   NordecoBold: require("../../assets/fonts/Nordeco-Bold.ttf"),
  // });

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const sendToBackend = () => {
    try {
      if (formData.email == "" || formData.password == "") {
        setErrorMessage("All Fields Are Required");
        return;
      } else {
        fetch(`${ApiLink}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            dispatch(
              setLogin({
                user: data.user,
                token: data.token,
              })
            );
            //navigation.navigate("TabNavigation", { screen: "Home" });
          });

        // const loggedIn = await loggedInResponse.json();
        // console.log(loggedIn)
        // if (loggedIn) {
        //   dispatch(
        //     setLogin({
        //       user: loggedIn.user,
        //       token: loggedIn.token,
        //     })
        //   );
        //   navigation.navigate("Home");
        // }
      }
    } catch (err) {
      alert(err.message);
      //console.log(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {/* <View>
        <View>
          <Text>Email</Text>
          <TextInput
            placeholder="Enter your email"
            onPressIn={() => setErrorMessage(null)}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            onPressIn={() => setErrorMessage(null)}
          />
        </View>
        <TouchableOpacity onPress={() => sendToBackend()}>
          <Text className="text-3xl bg-red-500 text-center text-white w-20 mx-auto">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-16 mx-auto"
          onPress={() => navigation.navigate("Register")}
        >
          <Text>Go To Register Page</Text>
        </TouchableOpacity>
      </View> */}

      <View>
        <LinearGradient colors={["#432344", "#FFC03D"]} className="h-full">
          <View>
            <View className="mt-12 ml-10">
              <Text className="text-[#E7EEFB] text-3xl font-[NordecoBold]">
                Welcome
              </Text>
              <Text className="text-[#E7EEFB] text-lg font-[NordecoRegular]">
                Login to access your account
              </Text>
            </View>
            <View className="bg-[#E7EEFB] h-[54vh] w-72 rounded-3xl mx-auto mt-6">
              {/* FORM */}
              <View className="mx-6">
                <View className="mt-6">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Email
                  </Text>
                  <TextInput
                    className="border-[#432344] border-b-2 p-2 text-lg"
                    onPressIn={() => setErrorMessage(null)}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    autoCapitalize="none"
                  />
                </View>
                <View className="mt-6">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Password
                  </Text>
                  <TextInput
                    className="border-[#432344] border-b-2 p-2 text-lg"
                    secureTextEntry={true}
                    onChangeText={(text) =>
                      setFormData({ ...formData, password: text })
                    }
                    onPressIn={() => setErrorMessage(null)}
                  />
                </View>

                <Text className="text-sm text-red-500 mt-2">
                  {errorMessage}
                </Text>

                <TouchableOpacity onPress={() => sendToBackend()}>
                  <Text className="font-[NordecoBold] text-xl px-16 py-2 mx-auto bg-[#432344] text-[#FFC03D] mt-12 rounded-3xl">
                    Login
                  </Text>
                </TouchableOpacity>

                <View className="mx-auto mt-6 flex-column items-center">
                  <Text className="font-[NordecoBold] text-[#432344]">
                    Don't have an account?
                  </Text>
                  <Text
                    className="mt-2 text-red-500 font-[NordecoBold] text-lg"
                    onPress={() => navigation.navigate("Register")}
                  >
                    Register
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default LoginScreen;
