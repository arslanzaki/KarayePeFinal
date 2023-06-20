import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import * as Location from "expo-location";
import { useState } from "react";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const FavouriteScreen = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });
      setLocation(location);
    })();
  }, []);
  console.log(location);

  const mapRef = React.createRef();
  const goToMyLocation = async () => {
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      zoom: 16,
    });
  };
  return (
    <View>
      <Text>FavouriteScreen</Text>

      <MapView ref={mapRef} className="h-60 w-60 mx-auto">
        {location ? (
          <Marker
            draggable
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        ) : null}
      </MapView>

      <TouchableOpacity className="mt-6" onPress={() => goToMyLocation()}>
        <Text className="text-center font-[NordecoBold] bg-[#432344] w-32 px-1 py-4 mx-auto text-yellow-500 rounded-xl">
          Go To My Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavouriteScreen;
