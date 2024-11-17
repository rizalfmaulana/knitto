import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/hooks/hooks";
import ImageGrid from "@/components/imageGrid";

const Bookmark = () => {
  const bookmark = useAppSelector((state) => state.bookmark.bookmark);

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Your Images Bookmark</Text>
        </View>
        <View>
          {bookmark.length > 0 ? (
            <ImageGrid images={bookmark} />
          ) : (
            <Text>No Bookmark, add some images</Text>
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
});
