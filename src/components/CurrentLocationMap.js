import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import * as Location from "expo-location";
import { useState } from "react";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const CurrentLocationMap = () => {
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
    <View className="mt-4">
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

      <TouchableOpacity className="mt-2" onPress={() => goToMyLocation()}>
        <Text className="text-center font-[NordecoBold] bg-green-500 w-32 px-1 py-2 mx-auto text-white rounded-xl">
          Go To My Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentLocationMap;
