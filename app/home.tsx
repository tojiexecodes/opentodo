import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar
} from "react-native";
import { useTodoStore } from "../store/todoStore";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const todos = useTodoStore((state) => state.todos);

  const theme = {
    background: "#F2F4F7",
    text: "#101828",
    subtext: "#667085",
    primary: "#0D9488",
    card: "#FFFFFF",
    border: "#E4E7EC",
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) : 0;

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={[styles.profilePic, { backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center' }]}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View>
              <Text style={[styles.dateText, { color: theme.subtext }]}>{today}</Text>
              <Text style={[styles.greeting, { color: theme.text }]}>
                My Tasks
              </Text>
            </View>
          </View>
        </View>

        {/* --- PROGRESS CARD --- */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>Productivity</Text>
              <Text style={styles.cardTitle}>Daily Tasks</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{Math.round(progress * 100)}%</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: '#E4E7EC' }]}>
              <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: theme.primary }]} />
            </View>
            <Text style={styles.progressStats}>
               {completedCount} <Text style={{ color: '#98A2B3' }}>/ {totalCount} completed</Text>
            </Text>
          </View>
        </View>

        {/* --- QUICK ACTION SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.wideCard}
            onPress={() => router.push("/today")}
            activeOpacity={0.7}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#F0FDFA' }]}>
                 <Ionicons name="list" size={24} color={theme.primary} />
              </View>
              <View>
                <Text style={styles.wideCardTitle}>View Full List</Text>
                <Text style={styles.wideCardSub}>You have {totalCount} total tasks</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D0D5DD" />
          </TouchableOpacity>
        </View>

        {/* --- ILLUSTRATION --- */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("../assets/images/todo-list-cuate.png")}
            style={styles.mainIllustration}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* --- FAB --- */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push("/modal")}
        activeOpacity={0.9}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  profilePic: { width: 48, height: 48, borderRadius: 14 },
  dateText: { fontSize: 12, fontWeight: "600", textTransform: 'uppercase', letterSpacing: 0.5 },
  greeting: { fontSize: 22, fontWeight: "700", marginTop: -2 },
  
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  cardLabel: { fontSize: 12, color: '#667085', fontWeight: '600', textTransform: 'uppercase' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#101828' },
  badge: { backgroundColor: '#F0FDFA', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#0D9488', fontWeight: '700', fontSize: 12 },
  progressContainer: { width: '100%' },
  progressBar: { height: 10, width: '100%', borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  progressStats: { marginTop: 12, fontSize: 14, fontWeight: '600', color: '#101828' },
  
  sectionHeader: { marginTop: 32, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#101828' },
  
  actionContainer: { gap: 12 },
  wideCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconCircle: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  wideCardTitle: { fontSize: 16, fontWeight: '700', color: '#101828' },
  wideCardSub: { fontSize: 14, color: '#667085', marginTop: 2 },
  
  illustrationContainer: { alignItems: "center", marginTop: 40, opacity: 0.8 },
  mainIllustration: { width: width * 0.75, height: 220 },
  
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0D9488",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});