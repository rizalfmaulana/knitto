import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { bg } from "@/constants/icons";

// const bg = {
//   bookmark: require("../../assets/images/bookmark.png"),
//   home: require("../../assets/images/home.png"),
// };
const TabIcon = ({ icon, color, name, focused }: any) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: 96,
        marginTop: 28,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
        tintColor={color}
      />
      <Text style={{ color: color, fontWeight: focused ? "bold" : "normal" }}>
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#8AFF80",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          borderColor: "#232533",
          height: 74,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={bg.home}
              color={color}
              focused={focused}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          headerShown: false,
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={bg.bookmark}
              color={color}
              focused={focused}
              name="Bookmark"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
