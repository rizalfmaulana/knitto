import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ImageGrid from "@/components/imageGrid";
import { logout } from "@/features/auth/authSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/constants/theme";

const Bookmark = () => {
  const bookmark = useAppSelector((state) => state.bookmark.bookmark);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(logout())}
          >
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Your Images Bookmark</Text>
        </View>
        <View>
          {bookmark.length > 0 ? (
            <ImageGrid images={bookmark} />
          ) : (
            <Text style={styles.subtitle}>No Bookmark, add some images</Text>
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "medium",
  },
  button: {
    padding: 10,
    backgroundColor: theme.colors.grayBG,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
