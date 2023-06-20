import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./../screens/HomeScreen";
import CreateAdScreen from "./../screens/CreateAdScreen";
import ChatScreen from "./../screens/ChatScreen";
import AccountScreen from "./../screens/AccountScreen";
import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen";

import AdCreationS1 from "../screens/AdCreationS1";

import { useSelector } from "react-redux";
import AdCreationS2 from "../screens/AdCreationS2";
import CustomTabBar from "../components/CustomTabBar";
import CustomTabBarButton from "../components/CustomTabBarButton";
import { Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AdDetailScreen from "../screens/AdDetailScreen";
import OwnerDetailScreen from "../screens/OwnerDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import CategorySearchScreen from "../screens/CategorySearchScreen";
import MainChatScreen from "../screens/MainChatScreen";
import ProfileDetails from "../screens/ProfileDetails";
import MyAdsScreen from "../screens/MyAdsScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import ModeSwitchingScreen from "../screens/ModeSwitchingScreen";
import { useEffect } from "react";
import AboutKP from "../screens/AboutKP";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const renderScene = (route, navigator) => {
  const Component = route.component;

  return <Component navigator={navigator} route={route} {...route.passProps} />;
};

function MyTabs() {
  const { _id, accountType } = useSelector((state) => state.user);
  console.log("acc", accountType);
  useEffect(() => {}, []);
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
    //   <Tab.Screen name="Favourite" component={FavScreen} />
    //   <Tab.Screen name="Create" component={CreateAdScreen} />
    //   <Tab.Screen name="Chat" component={ChatScreen} />
    //   <Tab.Screen name="Account" component={AccountScreen} />
    // </Tab.Navigator>
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFC03D",
        tabBarInactiveTintColor: "#E7EEFB",
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "FavouritesScreen") {
            iconName = focused ? "heart" : "heart";
          } else if (route.name === "MyAds") {
            iconName = focused ? "library" : "library";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbox" : "chatbox";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {accountType?.Seller ? (
        <Tab.Screen name="MyAds" component={MyAdsScreen} />
      ) : (
        <Tab.Screen name="FavouritesScreen" component={FavouriteScreen} />
      )}

      {accountType?.Seller ? (
        <Tab.Screen
          name="Create"
          component={CreateAdScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("./../../assets/plus.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              ></Image>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      ) : null}

      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategorySearch"
        component={CategorySearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdDetails"
        component={AdDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OwnerDetails"
        component={OwnerDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdCreationS1"
        component={AdCreationS1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdCreationS2"
        component={AdCreationS2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainChatScreen"
        component={MainChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModeSwitching"
        component={ModeSwitchingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutKP}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export const Navigation = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  // console.log(isAuth);
  return (
    <NavigationContainer>
      {isAuth ? <MyStack /> : <AuthScreens />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#432344",
    height: 70,
  },
});
