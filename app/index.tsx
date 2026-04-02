import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.topSection}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.mainLogo}
            resizeMode="contain"
          />
        </View>

        {/* Illustration */}
        <Image
          source={require("../assets/images/todo-list-pana.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            todo<Text style={{ color: "#0D9488" }}>!</Text>
          </Text>
          <Text style={styles.subtitle}>
            Organize your work and life{"\n"}with clarity and focus.
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}
        >        
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          All data is stored locally on your device.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  topSection: {
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4E7EC",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  mainLogo: {
    width: 44,
    height: 44,
  },
  illustration: {
    width: width * 0.85,
    height: 260,
    marginBottom: 30,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#101828",
    letterSpacing: -1,
  },
  subtitle: {
    textAlign: "center",
    color: "#667085",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    fontWeight: "500",
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
  },
  startButton: {
    flexDirection: "row",
    backgroundColor: "#0D9488",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0D9488",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.3,
  },
  leadingIcon: {
    marginRight: 12,
  },
  trailingIcon: {
    marginLeft: 10,
  },
  footerText: {
    marginTop: 24,
    fontSize: 13,
    color: "#98A2B3",
    textAlign: "center",
    fontWeight: "500",
  },
});