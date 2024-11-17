import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { bg } from "@/constants/icons";
import { theme } from "@/constants/theme";

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (e: any) => void;
  placeholder?: string;
};
const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? bg.eye : bg.eyeHide}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    color: theme.colors.grayBG,
    fontWeight: "500",
  },
  containerInput: {
    borderWidth: 2,
    borderColor: theme.colors.black,
    width: "100%",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    flex: 1,
    color: theme.colors.white,
    fontWeight: "500",
    fontSize: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
});
