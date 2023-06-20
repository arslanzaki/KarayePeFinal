import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import mainIcons from "../../assets/data/mainIcons";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { ApiLink } from "../api/ApiLink";
import { Switch } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import CurrentLocationMap from "../components/CurrentLocationMap";

const AdCreationS1 = ({ navigation }) => {
  console.log("s1");
  const [adPicturePath, setAdPicturePath] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const titleInputRef = useRef();
  const [description, setDescription] = useState("");
  const descriptionInputRef = useRef();

  const userId = useSelector((state) => state.user._id);

  const [itemRent, setItemRent] = useState(0);
  const [rentDuration, setRentDuration] = useState("");
  const [securityRequirement, setSecurityRequirement] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const addressInputRef = useRef();

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleTitleChange = useCallback((newText) => {
    setTitle(newText);
  }, []);

  const handleDescriptionChange = useCallback((newText) => {
    setDescription(newText);
  }, []);

  const handleAddressChange = useCallback((newText) => {
    setAddress(newText);
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    //console.log(result);
    if (!result.canceled) {
      setAdPicturePath(result.assets[0].uri);
    }
    // console.log(image);
  };

  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: 30.799115,
    longitude: 73.43148,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  if (errorMessage) {
    alert(errorMessage);
  }

  const adData = {
    userId: userId,
    title: title,
    description: description,
    category: category,
    adPicturePath: adPicturePath,
    itemRent: itemRent,
    rentDuration: rentDuration,
    securityRequirement: securityRequirement,
    city: city,

    // latitude: latitude,
    // longitude: longitude
  };

  //console.log(JSON.stringify(adData))
  const sendToBackend = () => {
    try {
      if (
        adData.title == "" ||
        adData.description == "" ||
        adData.adPicturePath == "" ||
        adData.category == "" ||
        adData.itemRent == 0 ||
        adData.rentDuration == "" ||
        adData.securityRequirement == ""
        // adData.latitude == "" ||
        // adData.longitude == ""
      ) {
        setErrorMessage("All Fields Are Required!");
        return;
      } else {
        fetch(`${ApiLink}/ads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(adData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("test", data);
            alert("Ad Created Successfully!");
            navigation.navigate("Home");
          })
          .catch((err) => {
            alert(err.message);
            console.log(err);
          });
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <ScrollView className="bg-[#E7EEFB]">
      <View className="bg-[#432344] pt-10 pb-6">
        <View className="flex flex-row-reverse items-center justify-end pr-4">
          <Text className="font-[NordecoBold] text-3xl ml-4 text-[#FFC03D]">
            Create Ad
          </Text>
          <TouchableOpacity
            className="h-10 w-10 rounded-full bg-[#FFC03D] flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Image source={mainIcons.backIcon} className="h-6 w-6" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="flex items-center mt-6">
          {!adPicturePath ? (
            <>
              <TouchableOpacity
                onPress={pickImage}
                className=" h-24 w-36 border border-dashed"
              >
                <Image
                  source={require("./../../assets/plus.png")}
                  className="object-contain h-10 w-10 mx-auto my-auto"
                  style={{ tintColor: "#432344" }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Image
              source={{ uri: adPicturePath }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        {adPicturePath && (
          <View className="flex flex-row items-center justify-center space-x-2">
            <TouchableOpacity onPress={pickImage} className="mt-4">
              <Text className="text-center font-[NordecoBold] bg-green-500 text-white px-6 py-2 w-36 mx-auto rounded-lg">
                Change Image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAdPicturePath("")}
              className="mt-2"
            >
              <Text className="text-center font-[NordecoBold] bg-red-500 text-white px-6 py-2 w-36 mx-auto rounded-lg">
                Remove Image
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="mt-8">
          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg">
            Category
          </Text>
          <View className="border bg-[#FFC03D] mx-4">
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              mode="dialog"
              dropdownIconColor={"#432344"}
              dropdownIconRippleColor={"#432344"}
            >
              <Picker.Item label="Clothing" value="clothing" color="#432344" />
              <Picker.Item label="Sports" value="sports" color="#432344" />
              <Picker.Item
                label="Household Items"
                value="household"
                color="#432344"
              />
              <Picker.Item label="Property" value="property" color="#432344" />
              <Picker.Item label="Catering" value="catering" color="#432344" />
              <Picker.Item label="Tenting" value="tenting" color="#432344" />
              <Picker.Item label="Vehicles" value="vehicles" color="#432344" />
              <Picker.Item label="Books" value="books" color="#432344" />
              <Picker.Item
                label="Accessories"
                value="accessories"
                color="#432344"
              />
              <Picker.Item label="Other" value="other" color="#432344" />
            </Picker>
          </View>
        </View>

        <View>
          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            Title
          </Text>
          <TextInput
            ref={titleInputRef}
            placeholder="Enter Ad Title"
            value={title}
            onChangeText={handleTitleChange}
            className="mx-4 border h-12 px-4 bg-gray-100"
          />

          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            Description
          </Text>
          <TextInput
            ref={descriptionInputRef}
            placeholder="Enter Ad Description"
            multiline
            editable
            maxLength={500}
            numberOfLines={8}
            onChangeText={handleDescriptionChange}
            className="mx-4 border bg-gray-100 h-24 px-4"
            value={description}
          />
        </View>

        {/* ################################################## */}

        <View>
          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            Set Rent
          </Text>
          <TextInput
            placeholder="Rent"
            keyboardType="number-pad"
            onChangeText={(text) => setItemRent(text)}
            className="border mx-4 h-12 px-4 bg-gray-100"
          />

          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            Rent Duration
          </Text>
          <View className="border bg-[#FFC03D] mx-4">
            <Picker
              selectedValue={adData.rentDuration}
              onValueChange={(itemValue, itemIndex) =>
                setRentDuration(itemValue)
              }
              mode="dialog"
              dropdownIconColor={"#432344"}
              dropdownIconRippleColor={"#432344"}
            >
              <Picker.Item label="Per Month" value="Month" color="#432344" />
              <Picker.Item label="Per Week" value="Week" color="#432344" />
              <Picker.Item label="Per Day" value="Day" color="#432344" />
              <Picker.Item label="Per Hour" value="Hour" color="#432344" />
            </Picker>
          </View>
          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            Security Requirement
          </Text>
          <View className="border bg-[#FFC03D] mx-4">
            <Picker
              selectedValue={adData.securityRequirement}
              onValueChange={(itemValue, itemIndex) =>
                setSecurityRequirement(itemValue)
              }
            >
              <Picker.Item label="CNIC" value="cnic" color="#432344" />
              <Picker.Item label="Bank Cheque" value="cheque" color="#432344" />
              <Picker.Item label="Other" value="other" color="#432344" />
            </Picker>
          </View>

          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            City
          </Text>
          <View className="border bg-[#FFC03D] mx-4">
            <Picker
              selectedValue={adData.city}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            >
              <Picker.Item
                label="Abbottabad"
                color="#432344"
                value="Abbottabad"
              />
              <Picker.Item label="Adezai" color="#432344" value="Adezai" />
              <Picker.Item
                label="Ali Bandar"
                color="#432344"
                value="Ali Bandar"
              />
              <Picker.Item
                label="Amir Chah"
                color="#432344"
                value="Amir Chah"
              />
              <Picker.Item label="Attock" color="#432344" value="Attock" />
              <Picker.Item label="Ayubia" color="#432344" value="Ayubia" />
              <Picker.Item
                label="Bahawalpur"
                color="#432344"
                value="Bahawalpur"
              />
              <Picker.Item label="Baden" color="#432344" value="Baden" />
              <Picker.Item label="Bagh" color="#432344" value="Bagh" />
              <Picker.Item
                label="Bahawalnagar"
                color="#432344"
                value="Bahawalnagar"
              />
              <Picker.Item label="Burewala" color="#432344" value="Burewala" />
              <Picker.Item
                label="Banda Daud Shah"
                color="#432344"
                value="Banda Daud Shah"
              />
              <Picker.Item label="Bannu" color="#432344" value="Bannu" />
              <Picker.Item label="Batagram" color="#432344" value="Batagram" />
              <Picker.Item label="Bazdar" color="#432344" value="Bazdar" />
              <Picker.Item label="Bela" color="#432344" value="Bela" />
              <Picker.Item label="Bellpat" color="#432344" value="Bellpat" />
              <Picker.Item label="Bhag" color="#432344" value="Bhag" />
              <Picker.Item label="Bhakkar" color="#432344" value="Bhakkar" />
              <Picker.Item label="Bhalwal" color="#432344" value="Bhalwal" />
              <Picker.Item label="Bhimber" color="#432344" value="Bhimber" />
              <Picker.Item label="Birote" color="#432344" value="Birote" />
              <Picker.Item label="Buner" color="#432344" value="Buner" />
              <Picker.Item label="Burj" color="#432344" value="Burj" />
              <Picker.Item label="Chiniot" color="#432344" value="Chiniot" />
              <Picker.Item label="Chachro" color="#432344" value="Chachro" />
              <Picker.Item label="Chagai" color="#432344" value="Chagai" />
              <Picker.Item
                label="Chah Sandan"
                color="#432344"
                value="Chah Sandan"
              />
              <Picker.Item
                label="Chailianwala"
                color="#432344"
                value="Chailianwala"
              />
              <Picker.Item label="Chakdara" color="#432344" value="Chakdara" />
              <Picker.Item label="Chakku" color="#432344" value="Chakku" />
              <Picker.Item label="Chakwal" color="#432344" value="Chakwal" />
              <Picker.Item label="Chaman" color="#432344" value="Chaman" />
              <Picker.Item
                label="Charsadda"
                color="#432344"
                value="Charsadda"
              />
              <Picker.Item label="Chhatr" color="#432344" value="Chhatr" />
              <Picker.Item
                label="Chichawatni"
                color="#432344"
                value="Chichawatni"
              />
              <Picker.Item label="Chitral" color="#432344" value="Chitral" />

              <Picker.Item color="#432344" value="Dadu">
                Dadu
              </Picker.Item>
              <Picker.Item color="#432344" value="Dera Ghazi Khan">
                Dera Ghazi Khan
              </Picker.Item>
              <Picker.Item color="#432344" value="Dera Ismail Khan">
                Dera Ismail Khan
              </Picker.Item>
              <Picker.Item color="#432344" value="Dalbandin">
                Dalbandin
              </Picker.Item>
              <Picker.Item color="#432344" value="Dargai">
                Dargai
              </Picker.Item>
              <Picker.Item color="#432344" value="Darya Khan">
                Darya Khan
              </Picker.Item>
              <Picker.Item color="#432344" value="Daska">
                Daska
              </Picker.Item>
              <Picker.Item color="#432344" value="Dera Bugti">
                Dera Bugti
              </Picker.Item>
              <Picker.Item color="#432344" value="Dhana Sar">
                Dhana Sar
              </Picker.Item>
              <Picker.Item color="#432344" value="Digri">
                Digri
              </Picker.Item>
              <Picker.Item color="#432344" value="Dina City|Dina">
                Dina
              </Picker.Item>
              <Picker.Item color="#432344" value="Dinga">
                Dinga
              </Picker.Item>
              <Picker.Item color="#432344" value="Diplo, Pakistan|Diplo">
                Diplo
              </Picker.Item>
              <Picker.Item color="#432344" value="Diwana">
                Diwana
              </Picker.Item>
              <Picker.Item color="#432344" value="Dokri">
                Dokri
              </Picker.Item>
              <Picker.Item color="#432344" value="Drosh">
                Drosh
              </Picker.Item>
              <Picker.Item color="#432344" value="Duki">
                Duki
              </Picker.Item>
              <Picker.Item color="#432344" value="Dushi">
                Dushi
              </Picker.Item>
              <Picker.Item color="#432344" value="Duzab">
                Duzab
              </Picker.Item>
              <Picker.Item color="#432344" value="Faisalabad">
                Faisalabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Fateh Jang">
                Fateh Jang
              </Picker.Item>
              <Picker.Item color="#432344" value="Ghotki">
                Ghotki
              </Picker.Item>
              <Picker.Item color="#432344" value="Gwadar">
                Gwadar
              </Picker.Item>
              <Picker.Item color="#432344" value="Gujranwala">
                Gujranwala
              </Picker.Item>
              <Picker.Item color="#432344" value="Gujrat">
                Gujrat
              </Picker.Item>
              <Picker.Item color="#432344" value="Gadra">
                Gadra
              </Picker.Item>
              <Picker.Item color="#432344" value="Gajar">
                Gajar
              </Picker.Item>
              <Picker.Item color="#432344" value="Gandava">
                Gandava
              </Picker.Item>
              <Picker.Item color="#432344" value="Garhi Khairo">
                Garhi Khairo
              </Picker.Item>
              <Picker.Item color="#432344" value="Garruck">
                Garruck
              </Picker.Item>
              <Picker.Item color="#432344" value="Ghakhar Mandi">
                Ghakhar Mandi
              </Picker.Item>
              <Picker.Item color="#432344" value="Ghanian">
                Ghanian
              </Picker.Item>
              <Picker.Item color="#432344" value="Ghauspur">
                Ghauspur
              </Picker.Item>
              <Picker.Item color="#432344" value="Ghazluna">
                Ghazluna
              </Picker.Item>
              <Picker.Item color="#432344" value="Girdan">
                Girdan
              </Picker.Item>
              <Picker.Item color="#432344" value="Gulistan">
                Gulistan
              </Picker.Item>
              <Picker.Item color="#432344" value="Gwash">
                Gwash
              </Picker.Item>
              <Picker.Item color="#432344" value="Hyderabad">
                Hyderabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Hala">
                Hala
              </Picker.Item>
              <Picker.Item color="#432344" value="Haripur">
                Haripur
              </Picker.Item>
              <Picker.Item color="#432344" value="Hab Chauki">
                Hab Chauki
              </Picker.Item>
              <Picker.Item color="#432344" value="Hafizabad">
                Hafizabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Hameedabad">
                Hameedabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Hangu">
                Hangu
              </Picker.Item>
              <Picker.Item color="#432344" value="Harnai">
                Harnai
              </Picker.Item>
              <Picker.Item color="#432344" value="Hasilpur">
                Hasilpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Haveli Lakha">
                Haveli Lakha
              </Picker.Item>
              <Picker.Item color="#432344" value="Hinglaj">
                Hinglaj
              </Picker.Item>
              <Picker.Item color="#432344" value="Hoshab">
                Hoshab
              </Picker.Item>
              <Picker.Item color="#432344" value="Islamabad">
                Islamabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Islamkot">
                Islamkot
              </Picker.Item>
              <Picker.Item color="#432344" value="Ispikan">
                Ispikan
              </Picker.Item>
              <Picker.Item color="#432344" value="Jacobabad">
                Jacobabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Jamshoro">
                Jamshoro
              </Picker.Item>
              <Picker.Item color="#432344" value="Jhang">
                Jhang
              </Picker.Item>
              <Picker.Item color="#432344" value="Jhelum">
                Jhelum
              </Picker.Item>
              <Picker.Item color="#432344" value="Jamesabad">
                Jamesabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Jampur">
                Jampur
              </Picker.Item>
              <Picker.Item color="#432344" value="Janghar">
                Janghar
              </Picker.Item>
              <Picker.Item color="#432344" value="Jati, Jati(Mughalbhin)">
                Jati
              </Picker.Item>
              <Picker.Item color="#432344" value="Jauharabad">
                Jauharabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Jhal">
                Jhal
              </Picker.Item>
              <Picker.Item color="#432344" value="Jhal Jhao">
                Jhal Jhao
              </Picker.Item>
              <Picker.Item color="#432344" value="Jhatpat">
                Jhatpat
              </Picker.Item>
              <Picker.Item color="#432344" value="Jhudo">
                Jhudo
              </Picker.Item>
              <Picker.Item color="#432344" value="Jiwani">
                Jiwani
              </Picker.Item>
              <Picker.Item color="#432344" value="Jungshahi">
                Jungshahi
              </Picker.Item>
              <Picker.Item color="#432344" value="Karachi">
                Karachi
              </Picker.Item>
              <Picker.Item color="#432344" value="Kotri">
                Kotri
              </Picker.Item>
              <Picker.Item color="#432344" value="Kalam">
                Kalam
              </Picker.Item>
              <Picker.Item color="#432344" value="Kalandi">
                Kalandi
              </Picker.Item>
              <Picker.Item color="#432344" value="Kalat">
                Kalat
              </Picker.Item>
              <Picker.Item color="#432344" value="Kamalia">
                Kamalia
              </Picker.Item>
              <Picker.Item color="#432344" value="Kamararod">
                Kamararod
              </Picker.Item>
              <Picker.Item color="#432344" value="Kamber">
                Kamber
              </Picker.Item>
              <Picker.Item color="#432344" value="Kamokey">
                Kamokey
              </Picker.Item>
              <Picker.Item color="#432344" value="Kanak">
                Kanak
              </Picker.Item>
              <Picker.Item color="#432344" value="Kandi">
                Kandi
              </Picker.Item>
              <Picker.Item color="#432344" value="Kandiaro">
                Kandiaro
              </Picker.Item>
              <Picker.Item color="#432344" value="Kanpur">
                Kanpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Kapip">
                Kapip
              </Picker.Item>
              <Picker.Item color="#432344" value="Kappar">
                Kappar
              </Picker.Item>
              <Picker.Item color="#432344" value="Karak City">
                Karak City
              </Picker.Item>
              <Picker.Item color="#432344" value="Karodi">
                Karodi
              </Picker.Item>
              <Picker.Item color="#432344" value="Kashmor">
                Kashmor
              </Picker.Item>
              <Picker.Item color="#432344" value="Kasur">
                Kasur
              </Picker.Item>
              <Picker.Item color="#432344" value="Katuri">
                Katuri
              </Picker.Item>
              <Picker.Item color="#432344" value="Keti Bandar">
                Keti Bandar
              </Picker.Item>
              <Picker.Item color="#432344" value="Khairpur">
                Khairpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Khanaspur">
                Khanaspur
              </Picker.Item>
              <Picker.Item color="#432344" value="Khanewal">
                Khanewal
              </Picker.Item>
              <Picker.Item color="#432344" value="Kharan">
                Kharan
              </Picker.Item>
              <Picker.Item color="#432344" value="kharian">
                kharian
              </Picker.Item>
              <Picker.Item color="#432344" value="Khokhropur">
                Khokhropur
              </Picker.Item>
              <Picker.Item color="#432344" value="Khora">
                Khora
              </Picker.Item>
              <Picker.Item color="#432344" value="Khushab">
                Khushab
              </Picker.Item>
              <Picker.Item color="#432344" value="Khuzdar">
                Khuzdar
              </Picker.Item>
              <Picker.Item color="#432344" value="Kikki">
                Kikki
              </Picker.Item>
              <Picker.Item color="#432344" value="Klupro">
                Klupro
              </Picker.Item>
              <Picker.Item color="#432344" value="Kohan">
                Kohan
              </Picker.Item>
              <Picker.Item color="#432344" value="Kohat">
                Kohat
              </Picker.Item>
              <Picker.Item color="#432344" value="Kohistan">
                Kohistan
              </Picker.Item>
              <Picker.Item color="#432344" value="Kohlu">
                Kohlu
              </Picker.Item>
              <Picker.Item color="#432344" value="Korak">
                Korak
              </Picker.Item>
              <Picker.Item color="#432344" value="Korangi">
                Korangi
              </Picker.Item>
              <Picker.Item color="#432344" value="Kot Sarae">
                Kot Sarae
              </Picker.Item>
              <Picker.Item color="#432344" value="Kotli">
                Kotli
              </Picker.Item>
              <Picker.Item color="#432344" value="Lahore">
                Lahore
              </Picker.Item>
              <Picker.Item color="#432344" value="Larkana">
                Larkana
              </Picker.Item>
              <Picker.Item color="#432344" value="Lahri">
                Lahri
              </Picker.Item>
              <Picker.Item color="#432344" value="Lakki Marwat">
                Lakki Marwat
              </Picker.Item>
              <Picker.Item color="#432344" value="Lasbela">
                Lasbela
              </Picker.Item>
              <Picker.Item color="#432344" value="Latamber">
                Latamber
              </Picker.Item>
              <Picker.Item color="#432344" value="Layyah">
                Layyah
              </Picker.Item>
              <Picker.Item color="#432344" value="Leiah">
                Leiah
              </Picker.Item>
              <Picker.Item color="#432344" value="Liari">
                Liari
              </Picker.Item>
              <Picker.Item color="#432344" value="Lodhran">
                Lodhran
              </Picker.Item>
              <Picker.Item color="#432344" value="Loralai">
                Loralai
              </Picker.Item>
              <Picker.Item color="#432344" value="Lower Dir">
                Lower Dir
              </Picker.Item>
              <Picker.Item color="#432344" value="Shadan Lund">
                Shadan Lund
              </Picker.Item>
              <Picker.Item color="#432344" value="Multan">
                Multan
              </Picker.Item>
              <Picker.Item color="#432344" value="Mandi Bahauddin">
                Mandi Bahauddin
              </Picker.Item>
              <Picker.Item color="#432344" value="Mansehra">
                Mansehra
              </Picker.Item>
              <Picker.Item color="#432344" value="Mian Chanu">
                Mian Chanu
              </Picker.Item>
              <Picker.Item color="#432344" value="Mirpur">
                Mirpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Moro, Pakistan|Moro">
                Moro
              </Picker.Item>
              <Picker.Item color="#432344" value="Mardan">
                Mardan
              </Picker.Item>
              <Picker.Item color="#432344" value="Mach">
                Mach
              </Picker.Item>
              <Picker.Item color="#432344" value="Madyan">
                Madyan
              </Picker.Item>
              <Picker.Item color="#432344" value="Malakand">
                Malakand
              </Picker.Item>
              <Picker.Item color="#432344" value="Mand">
                Mand
              </Picker.Item>
              <Picker.Item color="#432344" value="Manguchar">
                Manguchar
              </Picker.Item>
              <Picker.Item color="#432344" value="Mashki Chah">
                Mashki Chah
              </Picker.Item>
              <Picker.Item color="#432344" value="Maslti">
                Maslti
              </Picker.Item>
              <Picker.Item color="#432344" value="Mastuj">
                Mastuj
              </Picker.Item>
              <Picker.Item color="#432344" value="Mastung">
                Mastung
              </Picker.Item>
              <Picker.Item color="#432344" value="Mathi">
                Mathi
              </Picker.Item>
              <Picker.Item color="#432344" value="Matiari">
                Matiari
              </Picker.Item>
              <Picker.Item color="#432344" value="Mehar">
                Mehar
              </Picker.Item>
              <Picker.Item color="#432344" value="Mekhtar">
                Mekhtar
              </Picker.Item>
              <Picker.Item color="#432344" value="Merui">
                Merui
              </Picker.Item>
              <Picker.Item color="#432344" value="Mianwali">
                Mianwali
              </Picker.Item>
              <Picker.Item color="#432344" value="Mianez">
                Mianez
              </Picker.Item>
              <Picker.Item color="#432344" value="Mirpur Batoro">
                Mirpur Batoro
              </Picker.Item>
              <Picker.Item color="#432344" value="Mirpur Khas">
                Mirpur Khas
              </Picker.Item>
              <Picker.Item color="#432344" value="Mirpur Sakro">
                Mirpur Sakro
              </Picker.Item>
              <Picker.Item color="#432344" value="Mithi">
                Mithi
              </Picker.Item>
              <Picker.Item color="#432344" value="Mongora">
                Mongora
              </Picker.Item>
              <Picker.Item color="#432344" value="Murgha Kibzai">
                Murgha Kibzai
              </Picker.Item>
              <Picker.Item color="#432344" value="Muridke">
                Muridke
              </Picker.Item>
              <Picker.Item color="#432344" value="Musa Khel Bazar">
                Musa Khel Bazar
              </Picker.Item>
              <Picker.Item color="#432344" value="Muzaffar Garh">
                Muzaffar Garh
              </Picker.Item>
              <Picker.Item color="#432344" value="Muzaffarabad">
                Muzaffarabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Nawabshah">
                Nawabshah
              </Picker.Item>
              <Picker.Item color="#432344" value="Nazimabad">
                Nazimabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Nowshera">
                Nowshera
              </Picker.Item>
              <Picker.Item color="#432344" value="Nagar Parkar">
                Nagar Parkar
              </Picker.Item>
              <Picker.Item color="#432344" value="Nagha Kalat">
                Nagha Kalat
              </Picker.Item>
              <Picker.Item color="#432344" value="Nal">
                Nal
              </Picker.Item>
              <Picker.Item color="#432344" value="Naokot">
                Naokot
              </Picker.Item>
              <Picker.Item color="#432344" value="Nasirabad">
                Nasirabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Nauroz Kalat">
                Nauroz Kalat
              </Picker.Item>
              <Picker.Item color="#432344" value="Naushara">
                Naushara
              </Picker.Item>
              <Picker.Item color="#432344" value="Nur Gamma">
                Nur Gamma
              </Picker.Item>
              <Picker.Item color="#432344" value="Nushki">
                Nushki
              </Picker.Item>
              <Picker.Item color="#432344" value="Nuttal">
                Nuttal
              </Picker.Item>
              <Picker.Item color="#432344" value="Okara">
                Okara
              </Picker.Item>
              <Picker.Item color="#432344" value="Ormara">
                Ormara
              </Picker.Item>
              <Picker.Item color="#432344" value="Peshawar">
                Peshawar
              </Picker.Item>
              <Picker.Item color="#432344" value="Panjgur">
                Panjgur
              </Picker.Item>
              <Picker.Item color="#432344" value="Pasni City">
                Pasni City
              </Picker.Item>
              <Picker.Item color="#432344" value="Paharpur">
                Paharpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Palantuk">
                Palantuk
              </Picker.Item>
              <Picker.Item color="#432344" value="Pendoo">
                Pendoo
              </Picker.Item>
              <Picker.Item color="#432344" value="Piharak">
                Piharak
              </Picker.Item>
              <Picker.Item color="#432344" value="Pirmahal">
                Pirmahal
              </Picker.Item>
              <Picker.Item color="#432344" value="Pishin">
                Pishin
              </Picker.Item>
              <Picker.Item color="#432344" value="Plandri">
                Plandri
              </Picker.Item>
              <Picker.Item color="#432344" value="Pokran">
                Pokran
              </Picker.Item>
              <Picker.Item color="#432344" value="Pounch">
                Pounch
              </Picker.Item>
              <Picker.Item color="#432344" value="Quetta">
                Quetta
              </Picker.Item>
              <Picker.Item color="#432344" value="Qambar">
                Qambar
              </Picker.Item>
              <Picker.Item color="#432344" value="Qamruddin Karez">
                Qamruddin Karez
              </Picker.Item>
              <Picker.Item color="#432344" value="Qazi Ahmad">
                Qazi Ahmad
              </Picker.Item>
              <Picker.Item color="#432344" value="Qila Abdullah">
                Qila Abdullah
              </Picker.Item>
              <Picker.Item color="#432344" value="Qila Ladgasht">
                Qila Ladgasht
              </Picker.Item>
              <Picker.Item color="#432344" value="Qila Safed">
                Qila Safed
              </Picker.Item>
              <Picker.Item color="#432344" value="Qila Saifullah">
                Qila Saifullah
              </Picker.Item>
              <Picker.Item color="#432344" value="Rawalpindi">
                Rawalpindi
              </Picker.Item>
              <Picker.Item color="#432344" value="Rabwah">
                Rabwah
              </Picker.Item>
              <Picker.Item color="#432344" value="Rahim Yar Khan">
                Rahim Yar Khan
              </Picker.Item>
              <Picker.Item color="#432344" value="Rajan Pur">
                Rajan Pur
              </Picker.Item>
              <Picker.Item color="#432344" value="Rakhni">
                Rakhni
              </Picker.Item>
              <Picker.Item color="#432344" value="Ranipur">
                Ranipur
              </Picker.Item>
              <Picker.Item color="#432344" value="Ratodero">
                Ratodero
              </Picker.Item>
              <Picker.Item color="#432344" value="Rawalakot">
                Rawalakot
              </Picker.Item>
              <Picker.Item color="#432344" value="Renala Khurd">
                Renala Khurd
              </Picker.Item>
              <Picker.Item color="#432344" value="Robat Thana">
                Robat Thana
              </Picker.Item>
              <Picker.Item color="#432344" value="Rodkhan">
                Rodkhan
              </Picker.Item>
              <Picker.Item color="#432344" value="Rohri">
                Rohri
              </Picker.Item>
              <Picker.Item color="#432344" value="Sialkot">
                Sialkot
              </Picker.Item>
              <Picker.Item color="#432344" value="Sadiqabad">
                Sadiqabad
              </Picker.Item>
              <Picker.Item color="#432344" value="Safdar Abad- (Dhaban Singh)">
                Safdar Abad
              </Picker.Item>
              <Picker.Item color="#432344" value="Sahiwal">
                Sahiwal
              </Picker.Item>
              <Picker.Item color="#432344" value="Saidu Sharif">
                Saidu Sharif
              </Picker.Item>
              <Picker.Item color="#432344" value="Saindak">
                Saindak
              </Picker.Item>
              <Picker.Item color="#432344" value="Sakrand">
                Sakrand
              </Picker.Item>
              <Picker.Item color="#432344" value="Sanjawi">
                Sanjawi
              </Picker.Item>
              <Picker.Item color="#432344" value="Sargodha">
                Sargodha
              </Picker.Item>
              <Picker.Item color="#432344" value="Saruna">
                Saruna
              </Picker.Item>
              <Picker.Item color="#432344" value="Shabaz Kalat">
                Shabaz Kalat
              </Picker.Item>
              <Picker.Item color="#432344" value="Shadadkhot">
                Shadadkhot
              </Picker.Item>
              <Picker.Item color="#432344" value="Shahbandar">
                Shahbandar
              </Picker.Item>
              <Picker.Item color="#432344" value="Shahpur">
                Shahpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Shahpur Chakar">
                Shahpur Chakar
              </Picker.Item>
              <Picker.Item color="#432344" value="Shakargarh">
                Shakargarh
              </Picker.Item>
              <Picker.Item color="#432344" value="Shangla">
                Shangla
              </Picker.Item>
              <Picker.Item color="#432344" value="Sharam Jogizai">
                Sharam Jogizai
              </Picker.Item>
              <Picker.Item color="#432344" value="Sheikhupura">
                Sheikhupura
              </Picker.Item>
              <Picker.Item color="#432344" value="Shikarpur">
                Shikarpur
              </Picker.Item>
              <Picker.Item color="#432344" value="Shingar">
                Shingar
              </Picker.Item>
              <Picker.Item color="#432344" value="Shorap">
                Shorap
              </Picker.Item>
              <Picker.Item color="#432344" value="Sibi">
                Sibi
              </Picker.Item>
              <Picker.Item color="#432344" value="Sohawa">
                Sohawa
              </Picker.Item>
              <Picker.Item color="#432344" value="Sonmiani">
                Sonmiani
              </Picker.Item>
              <Picker.Item color="#432344" value="Sooianwala">
                Sooianwala
              </Picker.Item>
              <Picker.Item color="#432344" value="Spezand">
                Spezand
              </Picker.Item>
              <Picker.Item color="#432344" value="Spintangi">
                Spintangi
              </Picker.Item>
              <Picker.Item color="#432344" value="Sui">
                Sui
              </Picker.Item>
              <Picker.Item color="#432344" value="Sujawal">
                Sujawal
              </Picker.Item>
              <Picker.Item color="#432344" value="Sukkur">
                Sukkur
              </Picker.Item>
              <Picker.Item color="#432344" value="Suntsar">
                Suntsar
              </Picker.Item>
              <Picker.Item color="#432344" value="Surab">
                Surab
              </Picker.Item>
              <Picker.Item color="#432344" value="Swabi">
                Swabi
              </Picker.Item>
              <Picker.Item color="#432344" value="Swat">
                Swat
              </Picker.Item>
              <Picker.Item color="#432344" value="Tando Adam">
                Tando Adam
              </Picker.Item>
              <Picker.Item color="#432344" value="Tando Bago">
                Tando Bago
              </Picker.Item>
              <Picker.Item color="#432344" value="Tangi">
                Tangi
              </Picker.Item>
              <Picker.Item color="#432344" value="Tank City">
                Tank City
              </Picker.Item>
              <Picker.Item color="#432344" value="Tar Ahamd Rind">
                Tar Ahamd Rind
              </Picker.Item>
              <Picker.Item color="#432344" value="Thalo">
                Thalo
              </Picker.Item>
              <Picker.Item color="#432344" value="Thatta">
                Thatta
              </Picker.Item>
              <Picker.Item color="#432344" value="Toba Tek Singh">
                Toba Tek Singh
              </Picker.Item>
              <Picker.Item color="#432344" value="Tordher">
                Tordher
              </Picker.Item>
              <Picker.Item color="#432344" value="Tujal">
                Tujal
              </Picker.Item>
              <Picker.Item color="#432344" value="Tump">
                Tump
              </Picker.Item>
              <Picker.Item color="#432344" value="Turbat">
                Turbat
              </Picker.Item>
              <Picker.Item color="#432344" value="Umarao">
                Umarao
              </Picker.Item>
              <Picker.Item color="#432344" value="Umarkot">
                Umarkot
              </Picker.Item>
              <Picker.Item color="#432344" value="Upper Dir">
                Upper Dir
              </Picker.Item>
              <Picker.Item color="#432344" value="Uthal">
                Uthal
              </Picker.Item>
              <Picker.Item color="#432344" value="Vehari">
                Vehari
              </Picker.Item>
              <Picker.Item color="#432344" value="Veirwaro">
                Veirwaro
              </Picker.Item>
              <Picker.Item color="#432344" value="Vitakri">
                Vitakri
              </Picker.Item>
              <Picker.Item color="#432344" value="Wadh">
                Wadh
              </Picker.Item>
              <Picker.Item color="#432344" value="Wah Cantt">
                Wah Cantt
              </Picker.Item>
              <Picker.Item color="#432344" value="Warah">
                Warah
              </Picker.Item>
              <Picker.Item color="#432344" value="Washap">
                Washap
              </Picker.Item>
              <Picker.Item color="#432344" value="Wasjuk">
                Wasjuk
              </Picker.Item>
              <Picker.Item color="#432344" value="Wazirabad">
                Wazirabad
              </Picker.Item>
              <Picker.Item label="Yakmach" color="#432344" value="Yakmach">
                Yakmach
              </Picker.Item>
              <Picker.Item label="Zhob" color="#432344" value="Zhob">
                Zhob
              </Picker.Item>
              <Picker.Item label="Other" color="#432344" value="Other">
                Other
              </Picker.Item>
            </Picker>
          </View>

          <Text className="ml-4 text-gray-500 font-[NordecoBold] text-lg mt-4">
            Address
          </Text>
          <TextInput
            ref={addressInputRef}
            placeholder="Enter Address"
            multiline
            editable
            maxLength={500}
            numberOfLines={6}
            onChangeText={handleAddressChange}
            className="mx-4 border bg-gray-100 h-24 px-4"
            value={address}
          />
        </View>

        <View className="flex flex-row items-center justify-center mt-4 border mx-4">
          <Text className="font-[NordecoBold] text-red-500 text-xl">
            Add Current Location?
          </Text>
          <Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="#432344"
            />
          </Text>
        </View>
        {isSwitchOn && <CurrentLocationMap />}
      </View>

      <TouchableOpacity
        onPress={() => {
          sendToBackend();
        }}
        className="mb-12"
      >
        <Text className="text-center bg-[#432344] py-2 w-48 mx-auto mt-8 text-[#FFC03D] rounded-full font-[NordecoBold] text-lg">
          Create
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdCreationS1;
