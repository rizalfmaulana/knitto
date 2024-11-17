import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

type Props = {
  handlePress: () => void;
  title: string;
  isLoading?: boolean;
};

const CustomButon = ({ handlePress, title, isLoading }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
      style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButon;
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    minHeight: 62,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textButton: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
