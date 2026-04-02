import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: This key must match the 'name' property in your Zustand persist config
const STORAGE_KEY = 'todo-storage';

export const storage = {
  /**
   * Manual Save: Wraps the data in the format Zustand expect 
   */
  save: async (todos) => {
    try {
      // We mimic the Zustand persistence format
      const dataToPersist = {
        state: { todos },
        version: 0,
      };
      const jsonValue = JSON.stringify(dataToPersist);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("AsyncStorage Save Error:", e);
    }
  },

  /**
   * Manual Load: Extracts the todos from the Zustand object.
   */
  load: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue == null) return [];

      const parsed = JSON.parse(jsonValue);
      // Return the nested todos array from the persisted state
      return parsed?.state?.todos || [];
    } catch (e) {
      console.error("AsyncStorage Load Error:", e);
      return [];
    }
  },

  /**
   * Helper: Completely wipes the storage for this key.
   */
  clearAll: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("AsyncStorage Clear Error:", e);
    }
  }
};