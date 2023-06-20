import { View, Text, Alert, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

// import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { ApiLink } from "../api/ApiLink";
const RegisterScreen = ({ navigation }) => {
  // const [fontsLoaded] = useFonts({
  //   NordecoRegular: require("../../assets/fonts/Nordeco-Regular.ttf"),
  //   NordecoBold: require("../../assets/fonts/Nordeco-Bold.ttf"),
  // });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const sendToBackend = () => {
    try {
      if (
        formData.name == "" ||
        formData.email == "" ||
        formData.phoneNumber == "" ||
        formData.password == "" ||
        formData.cpassword == ""
      ) {
        setErrorMessage("All Fields Are Required!");
        return;
      } else {
        if (formData.password !== formData.cpassword) {
          setErrorMessage("Password & Confirm Password Must Be Same");
          return;
        } else {
          fetch(`${ApiLink}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((res) => res.json())
            .then((data) => {
              alert("Account Created Successfully!");
              navigation.navigate("Login");
            })
            .catch((err) => alert(err.message));
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      {/* <View>
        <View>
          <Text>Name</Text>
          <TextInput
            placeholder="Enter your Name"
            onPressIn={() => setErrorMessage(null)}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            placeholder="Enter your Email"
            onPressIn={() => setErrorMessage(null)}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <View>
          <Text>Password</Text>
          <TextInput
            placeholder="Enter your Password"
            secureTextEntry={true}
            onPressIn={() => setErrorMessage(null)}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
        </View>
        <View>
          <Text>Confirm Password</Text>
          <TextInput
            placeholder="Enter your Password"
            secureTextEntry={true}
            onPressIn={() => setErrorMessage(null)}
            onChangeText={(text) =>
              setFormData({ ...formData, cpassword: text })
            }
          />
          {errorMessage && (
            <Text className="text-red-500 text-sm">{errorMessage}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            sendToBackend();
          }}
        >
          <Text className="text-center text-red-500">Register</Text>
        </TouchableOpacity>
      </View> */}

      <View>
        <LinearGradient colors={["#432344", "#FFC03D"]} className="h-full">
          <View>
            <View className="mt-12 ml-10">
              <Text className="text-[#E7EEFB] text-3xl font-[NordecoBold]">
                Register
              </Text>
              <Text className="text-[#E7EEFB] text-lg font-[NordecoRegular]">
                Create a new account
              </Text>
            </View>
            <View className="bg-[#E7EEFB] h-[76vh] w-72 rounded-3xl mx-auto mt-6">
              {/* FORM */}
              <View className="mx-6">
                <View className="mt-6">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Name
                  </Text>
                  <TextInput
                    className="border-b-2 p-2 text-lg"
                    onPressIn={() => setErrorMessage(null)}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                  />
                </View>
                <View className="mt-3">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Email
                  </Text>
                  <TextInput
                    className="border-[#432344] border-b-2 p-2 text-lg"
                    onPressIn={() => setErrorMessage(null)}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                  />
                </View>
                <View className="mt-3">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Phone Number
                  </Text>
                  <TextInput
                    className="border-[#432344] border-b-2 p-2 text-lg"
                    onPressIn={() => setErrorMessage(null)}
                    onChangeText={(text) =>
                      setFormData({ ...formData, phoneNumber: text })
                    }
                    keyboardType="number-pad"
                  />
                </View>
                <View className="mt-3">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Password
                  </Text>
                  <TextInput
                    className="border-[#432344] border-b-2 p-2 text-lg"
                    secureTextEntry={true}
                    onPressIn={() => setErrorMessage(null)}
                    onChangeText={(text) =>
                      setFormData({ ...formData, password: text })
                    }
                  />
                </View>
                <View className="mt-3">
                  <Text className="font-[NordecoBold] text-[#432344] text-xl">
                    Confirm Password
                  </Text>
                  <TextInput
                    className="border-[#432344] border-b-2 p-2 text-lg"
                    secureTextEntry={true}
                    onPressIn={() => setErrorMessage(null)}
                    onChangeText={(text) =>
                      setFormData({ ...formData, cpassword: text })
                    }
                  />
                  {errorMessage && (
                    <Text className="text-red-500 text-sm">{errorMessage}</Text>
                  )}
                </View>

                <TouchableOpacity onPress={() => sendToBackend()}>
                  <Text className="font-[NordecoBold] text-xl px-16 py-2 mx-auto bg-[#432344] text-[#FFC03D] mt-6 rounded-3xl">
                    Register
                  </Text>
                </TouchableOpacity>

                <View className="mx-auto mt-4 flex-column items-center">
                  <Text className="font-[NordecoBold] text-[#432344]">
                    Already have an account?
                  </Text>
                  <Text
                    className="mt-1 text-red-500 font-[NordecoBold] text-lg"
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
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

export default RegisterScreen;
