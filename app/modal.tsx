import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTodoStore } from "../store/todoStore";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');
const scaleFont = (size: number) => (width < 380 ? size * 0.9 : size);

export default function TaskModal() {
  const { addTodo } = useTodoStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  
  // --- DATE & TIME STATES ---
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const [priority, setPriority] = useState(3); 
  const [tag, setTag] = useState("Work");

  const theme = {
    background: "#FFFFFF",
    text: "#101828",
    subtext: "#667085",
    border: "#F2F4F7",
    primary: "#0D9488",
    danger: "#F04438",
  };

  // --- IMAGE PICKER ---
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required to attach photos.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.6,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // --- PICKER LOGIC ---
  const showMode = (currentMode: 'date' | 'time') => {
    setPickerMode(currentMode);
    setShowPicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // Keep open for iOS styling, close for Android
    setDate(currentDate);
  };

  // 12-Hour Format (New for 2026)
  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  // Smart Date Formatting
  const formatDate = (d: Date) => {
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    
    if (isToday) return "Today";
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getPriorityData = () => {
    switch (priority) {
      case 1: return { color: "#F04438", label: "High", bg: "#FEF3F2" };
      case 2: return { color: "#F79009", label: "Medium", bg: "#FFFAEB" };
      default: return { color: "#12B76A", label: "Low", bg: "#ECFDF3" };
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Required", "Please enter a task title.");
      return;
    }
    addTodo({
      title: title.trim(),
      description: description.trim(),
      time: formatTime(date),
      date: date.toISOString(), // Useful for sorting later
      priority,
      tag,
      image,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.pullIndicator} />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={[styles.cancelText, { color: theme.subtext }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.saveBtnText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollInner}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          style={[styles.titleInput, { color: theme.text }]}
          placeholder="Task Title"
          placeholderTextColor="#D0D5DD"
          value={title}
          onChangeText={(text) => text.length <= 50 && setTitle(text)}
          autoFocus
        />

        <TextInput
          style={[styles.descInput, { color: theme.text }]}
          placeholder="Add some notes..."
          placeholderTextColor="#98A2B3"
          value={description}
          onChangeText={setDescription}
          multiline
          scrollEnabled={false}
        />

        <View style={styles.chipGrid}>
          {/* DATE CHIP */}
          <TouchableOpacity style={styles.chip} onPress={() => showMode('date')}>
            <Ionicons name="calendar-outline" size={16} color={theme.primary} />
            <Text style={styles.chipText}>{formatDate(date)}</Text>
          </TouchableOpacity>

          {/* TIME CHIP */}
          <TouchableOpacity style={styles.chip} onPress={() => showMode('time')}>
            <Ionicons name="time-outline" size={16} color={theme.primary} />
            <Text style={styles.chipText}>{formatTime(date)}</Text>
          </TouchableOpacity>

          {/* PRIORITY CHIP */}
          <TouchableOpacity 
            style={[styles.chip, { backgroundColor: getPriorityData().bg }]} 
            onPress={() => setPriority(priority === 1 ? 3 : priority - 1)}
          >
            <View style={[styles.dot, { backgroundColor: getPriorityData().color }]} />
            <Text style={[styles.chipText, { color: getPriorityData().color }]}>
                {getPriorityData().label}
            </Text>
          </TouchableOpacity>

          {/* TAG CHIP */}
          <TouchableOpacity style={styles.chip} onPress={() => {
             const tags = ["Work", "Personal", "Study", "Life"];
             setTag(tags[(tags.indexOf(tag) + 1) % tags.length]);
          }}>
            <Text style={styles.chipText}>#{tag}</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={date}
              mode={pickerMode}
              is24Hour={false} // Force 12-hour selection
              display={Platform.OS === 'ios' ? 'inline' : 'default'} // Inline is the stylish 2026 look
              onChange={onDateChange}
              accentColor={theme.primary}
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity 
                style={styles.pickerDone} 
                onPress={() => setShowPicker(false)}
              >
                <Text style={{color: theme.primary, fontWeight: '700'}}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {image && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.attachedImage} />
            <TouchableOpacity style={styles.removeImage} onPress={() => setImage(null)}>
              <Ionicons name="close-circle" size={24} color="#101828" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* --- FOOTER --- */}
      <View style={[styles.actionBar, { borderTopColor: theme.border }]}>
        <View style={styles.actionGroup}>
          <TouchableOpacity style={styles.actionIcon} onPress={pickImage}>
            <Ionicons name="images-outline" size={22} color={theme.subtext} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionIcon} 
            onPress={() => {
              setTitle("");
              setDescription("");
              setImage(null);
              setDate(new Date());
            }}
          >
            <Ionicons name="refresh-outline" size={22} color={theme.subtext} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.rightGroup}>
           <Text style={[
             styles.charCount, 
             { color: title.length >= 45 ? theme.danger : theme.subtext }
           ]}>
             {title.length}/50
           </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  pullIndicator: {
    width: 36,
    height: 4,
    backgroundColor: '#EAECF0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 10,
  },
  closeBtn: { paddingVertical: 8, paddingRight: 16 },
  cancelText: { fontSize: 16, fontWeight: "600" },
  saveBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 18 },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  
  content: { flex: 1 },
  scrollInner: { paddingHorizontal: 28, paddingTop: 15, paddingBottom: 40 },
  
  titleInput: { fontSize: scaleFont(30), fontWeight: "800", letterSpacing: -1, paddingVertical: 10 },
  descInput: { fontSize: scaleFont(17), lineHeight: 24, color: "#667085", marginTop: 4, marginBottom: 24 },
  
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 12, 
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F2F4F7'
  },
  chipText: { fontSize: 13, fontWeight: "600", color: "#475467" },
  dot: { width: 6, height: 6, borderRadius: 3 },

  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E4E7EC'
  },
  pickerDone: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E4E7EC',
    marginTop: 5
  },

  imageWrapper: { marginTop: 20, borderRadius: 20, overflow: 'hidden', height: height * 0.22, width: '100%', backgroundColor: '#F9FAFB' },
  attachedImage: { width: '100%', height: '100%', borderRadius: 20 },
  removeImage: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 2 },

  actionBar: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    borderTopWidth: 1, 
    paddingBottom: Platform.OS === 'ios' ? 35 : 15 
  },
  actionGroup: { flexDirection: 'row', gap: 20 },
  actionIcon: { padding: 4 },
  rightGroup: { alignItems: 'flex-end' },
  charCount: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5 }
});