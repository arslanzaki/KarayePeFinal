import { ScrollView, Text } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/";
import CategoryCard from "./CategoryCard";

import categories from "./../../assets/data/categories";

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          iconName={category.iconName}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;