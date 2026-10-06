import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import StudentListScreen from './src/screens/StudentListScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import StudentFormScreen from './src/screens/StudentFormScreen';
import { getText } from './src/services/i18n';
import { readStudents, writeStudents } from './src/services/studentStorage';

const EMPTY_FORM = {
  fullName: '',
  studentCode: '',
  email: '',
  avatar: '',
};

export default function App() {
  const t = useMemo(() => getText(), []);
  const [students, setStudents] = useState([]);
  const [screen, setScreen] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState('add');
  const [form, setForm] = useState(EMPTY_FORM);

  const selectedStudent = students.find((item) => item.id === selectedId) || null;

  useEffect(() => {
    (async () => {
      const storedStudents = await readStudents();
      setStudents(storedStudents);
    })();
  }, []);

  const persist = async (nextStudents) => {
    setStudents(nextStudents);
    await writeStudents(nextStudents);
  };

  const openDetail = (student) => {
    setSelectedId(student.id);
    setScreen('detail');
  };

  const openAdd = () => {
    setSelectedId(null);
    setMode('add');
    setForm(EMPTY_FORM);
    setScreen('form');
  };

  const openEdit = () => {
    if (!selectedStudent) return;
    setMode('edit');
    setForm({
      fullName: selectedStudent.fullName,
      studentCode: selectedStudent.studentCode,
      email: selectedStudent.email,
      avatar: selectedStudent.avatar || '',
    });
    setScreen('form');
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t.imagePermission);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setForm((current) => ({ ...current, avatar: result.assets[0].uri }));
    }
  };

  const validate = () => {
    const fullName = form.fullName.trim();
    const studentCode = form.studentCode.trim().toUpperCase();
    const email = form.email.trim();

    if (!fullName || !studentCode || !email) {
      Alert.alert(t.required);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert(t.badEmail);
      return false;
    }

    const duplicated = students.some(
      (item) => item.studentCode.toUpperCase() === studentCode && item.id !== selectedId
    );
    if (duplicated) {
      Alert.alert(t.duplicateCode);
      return false;
    }

    return true;
  };

  const saveStudent = () => {
    if (!validate()) return;

    const normalized = {
      fullName: form.fullName.trim(),
      studentCode: form.studentCode.trim().toUpperCase(),
      email: form.email.trim(),
      avatar: form.avatar.trim(),
    };

    if (mode === 'add') {
      const newStudent = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ...normalized,
      };
      persist([newStudent, ...students]);
      setScreen('list');
      return;
    }

    if (!selectedStudent) return;

    Alert.alert(t.confirmEditTitle, t.confirmEdit, [
      { text: t.no, style: 'cancel' },
      {
        text: t.yes,
        onPress: async () => {
          const updated = { ...selectedStudent, ...normalized };
          const nextStudents = students.map((item) => item.id === selectedId ? updated : item);
          await persist(nextStudents);
          setScreen('detail');
        },
      },
    ]);
  };

  const deleteStudent = () => {
    if (!selectedStudent) return;

    Alert.alert(t.confirmDeleteTitle, t.confirmDelete, [
      { text: t.no, style: 'cancel' },
      {
        text: t.yes,
        style: 'destructive',
        onPress: async () => {
          const nextStudents = students.filter((item) => item.id !== selectedId);
          await persist(nextStudents);
          setSelectedId(null);
          setScreen('list');
        },
      },
    ]);
  };

  if (screen === 'detail' && selectedStudent) {
    return (
      <StudentDetailScreen
        student={selectedStudent}
        t={t}
        onBack={() => setScreen('list')}
        onEdit={openEdit}
        onDelete={deleteStudent}
      />
    );
  }

  if (screen === 'form') {
    return (
      <StudentFormScreen
        form={form}
        setForm={setForm}
        mode={mode}
        t={t}
        onPickImage={pickImage}
        onSave={saveStudent}
        onBack={() => setScreen(mode === 'edit' ? 'detail' : 'list')}
      />
    );
  }

  return <StudentListScreen students={students} t={t} onAdd={openAdd} onOpen={openDetail} />;
}
