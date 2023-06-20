import { StyleSheet, Text, View } from "react-native";

// import authReducer from "./src/state";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { Provider, useSelector } from "react-redux";

// // import storage from "redux-persist/lib/storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/state/store";
import { Navigation } from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          NordecoRegular: require("./assets/fonts/Nordeco-Regular.ttf"),
          NordecoBold: require("./assets/fonts/Nordeco-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    }

    prepare();
  }, []);

  if (!fontLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
