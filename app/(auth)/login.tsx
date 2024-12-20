import { View, Text, Image, Alert, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButon from "@/components/CustomButton";
import FormField from "@/components/FormField";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { authReset, login } from "@/features/auth/authSlice";
import { Redirect, router } from "expo-router";
import { loginUser } from "@/services/authApi";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { isAuthenticated, error, authLoading } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!form.username || !form.password) {
      Alert.alert("Please fill in all the fields");
      return;
    }

    dispatch(loginUser(form));
    // dispatch(signin(form));
    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: form.username,
    //       password: form.password,
    //     }),
    //   });
    //   console.log(response);

    //   dispatch(login());
    // } catch (error: any) {
    //   Alert.alert(error.message, "eror");
    //   console.log(error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
    if (error) {
      Alert.alert(error);
      setForm({ username: "", password: "" });
      dispatch(authReset());
    }
  }, [error, isAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.title}>Log in to Pixabay</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder="Enter your username"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <CustomButon
            title="Sign In"
            handlePress={handleSubmit}
            isLoading={authLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191E31",
    height: "100%",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#191E31",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  image: {
    width: 50,
    height: 35,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
    marginTop: 10,
  },
});
