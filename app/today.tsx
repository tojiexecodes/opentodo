import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { useTodoStore } from "../store/todoStore";

const { width } = Dimensions.get("window");

export default function TodayScreen() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const theme = {
    background: "#F9FAFB",
    text: "#101828",
    subtext: "#667085",
    primary: "#0D9488",
    card: "#FFFFFF",
    border: "#E4E7EC",
    danger: "#F04438",
  };

  // --- PROFESSIONAL ACTIONS ---

  const handleToggle = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTodo(id);
  };

  const confirmDelete = (id: string, title: string) => {
    // Subtle warning vibration before the alert pops up
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    const truncatedTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${truncatedTitle}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTodo(id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return "#F04438"; // High
      case 2: return "#F79009"; // Medium
      default: return "#12B76A"; // Low
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { borderColor: theme.border, backgroundColor: theme.card }]}
        >
          <Ionicons name="chevron-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>Today</Text>
          <Text style={[styles.subtitle, { color: theme.subtext }]}>
            {todos.length} {todos.length === 1 ? "task" : "tasks"} scheduled
          </Text>
        </View>
      </View>

      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../assets/images/todo-list-pana.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>All caught up!</Text>
          <Text style={[styles.emptySub, { color: theme.subtext }]}>
            Enjoy your day or start a new task by tapping the plus button.
          </Text>
          <TouchableOpacity
            style={[styles.addFirstButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push("/modal")}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" style={{marginRight: 8}} />
            <Text style={styles.addFirstText}>Create First Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.todoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <TouchableOpacity
                style={styles.todoMain}
                onPress={() => handleToggle(item.id)}
                activeOpacity={0.7}
              >
                {/* Custom Checkbox */}
                <View style={[
                  styles.checkbox,
                  { borderColor: theme.border },
                  item.completed && { backgroundColor: theme.primary, borderColor: theme.primary }
                ]}>
                  {item.completed && <Ionicons name="checkmark" size={14} color="white" />}
                </View>

                <View style={styles.textColumn}>
                  <Text style={[
                    styles.todoText,
                    { color: theme.text },
                    item.completed && styles.completedText
                  ]} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <View style={styles.metaRow}>
                    {item.time && (
                      <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={14} color={theme.subtext} />
                        <Text style={styles.metaText}>{item.time}</Text>
                      </View>
                    )}
                    <View style={styles.metaItem}>
                      <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority ?? 3) }]} />
                      <Text style={[styles.metaText, { textTransform: 'capitalize' }]}>{item.tag || 'Inbox'}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => confirmDelete(item.id, item.title)}
                style={styles.deleteButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="trash-outline" size={18} color="#98A2B3" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* --- FAB --- */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push("/modal")}
        activeOpacity={0.9}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 45 : 10,
    paddingBottom: 20,
    gap: 16
  },
  headerTitleContainer: { flex: 1 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: { fontSize: 32, fontWeight: "800", letterSpacing: -0.8 },
  subtitle: { fontSize: 15, fontWeight: "500", marginTop: -2 },

  // List Items
  listContent: { paddingHorizontal: 24, paddingBottom: 130, paddingTop: 10 },
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 14,
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  todoMain: { flexDirection: "row", alignItems: "center", flex: 1 },
  textColumn: { flex: 1 },
  todoText: { fontSize: 17, fontWeight: '600', letterSpacing: -0.2 },
  completedText: { textDecorationLine: "line-through", color: "#98A2B3", opacity: 0.6 },

  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontSize: 13, color: '#667085', fontWeight: '500' },
  priorityDot: { width: 7, height: 7, borderRadius: 4 },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 9,
    borderWidth: 2,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: { 
    padding: 10, 
    marginLeft: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },

  // Empty State
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40 },
  emptyImage: { width: width * 0.65, height: 220, marginBottom: 20, opacity: 0.9 },
  emptyTitle: { fontSize: 22, fontWeight: "800", marginBottom: 10, letterSpacing: -0.4 },
  emptySub: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  addFirstButton: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: "#0D9488",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  addFirstText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  fab: {
    position: "absolute",
    right: 24,
    bottom: 30,
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0D9488",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});