import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {City} from 'country-state-city';

const CityPicker = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const pakistanCities = City.getCitiesOfCountry('PK');
  

  return (
    <Picker
      selectedValue={selectedCity}
      onValueChange={handleCityChange}
    >
      {pakistanCities.map((city) => (
        <Picker.Item
          key={city.id}
          label={city.name}
          value={city.name}
        />
      ))}
    </Picker>
  );
};

export default CityPicker;
