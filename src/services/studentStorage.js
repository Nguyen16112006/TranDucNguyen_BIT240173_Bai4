import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@bit240173_student_records_v1';

export async function readStudents() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Unable to read student database:', error);
    return [];
  }
}

export async function writeStudents(students) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return true;
  } catch (error) {
    console.warn('Unable to save student database:', error);
    return false;
  }
}
