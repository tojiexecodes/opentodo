import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Platform } from "react-native";
import { useTodoStore } from "../store/todoStore";

function InitialLayout() {
  const [hasHydrated, setHasHydrated] = useState(false);

  // Handle Zustand Persist Hydration
  useEffect(() => {
    const checkHydration = () => {
      if (useTodoStore.persist.hasHydrated()) setHasHydrated(true);
    };
    checkHydration();
    
    const unsubHydrate = useTodoStore.persist.onFinishHydration(() => setHasHydrated(true));
    return () => unsubHydrate();
  }, []);

  // Show loading screen while store is loading from storage
  if (!hasHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D9488" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="today" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: Platform.OS === 'ios' ? 'modal' : 'fullScreenModal',
          animation: 'slide_from_bottom',
          statusBarStyle: 'dark',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialLayout />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
});