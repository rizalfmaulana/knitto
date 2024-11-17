import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/lib/utils";
import { theme } from "@/constants/theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bg.png")}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <Animated.View entering={FadeInDown.duration(600)}>
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            Pixabay
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.subtitle}
          >
            Find Wallpapers of Your Choice
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  contentContainer: {
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 40,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: theme.colors.subtitle,
    marginTop: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.Xl,
  },
  buttonText: {
    color: theme.colors.black,
    fontWeight: "bold",
    fontSize: 18,
  },
});
