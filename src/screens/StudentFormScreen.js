import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StudentAvatar from '../components/StudentAvatar';
import { colors } from '../constants/theme';

function Field({ label, value, onChangeText, placeholder, keyboardType, autoCapitalize = 'sentences' }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A2AAB7"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

export default function StudentFormScreen({ form, setForm, mode, t, onBack, onPickImage, onSave }) {
  const set = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <View style={styles.headingWrap}>
              <Text style={styles.eyebrow}>{mode === 'add' ? t.add : t.edit}</Text>
              <Text style={styles.heading}>{mode === 'add' ? t.addStudent : t.editStudent}</Text>
            </View>
          </View>

          <View style={styles.avatarPanel}>
            <StudentAvatar uri={form.avatar} name={form.fullName} size={88} />
            <View style={styles.avatarTextWrap}>
              <Text style={styles.avatarTitle}>{t.avatar}</Text>
              <Text style={styles.avatarHint}>{t.avatarHint}</Text>
            </View>
            <TouchableOpacity style={styles.photoButton} onPress={onPickImage}>
              <Text style={styles.photoButtonText}>▧</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            <Field label={t.fullName} value={form.fullName} onChangeText={set('fullName')} placeholder={t.fullNameHint} />
            <Field label={t.studentCode} value={form.studentCode} onChangeText={set('studentCode')} placeholder={t.studentCodeHint} autoCapitalize="characters" />
            <Field label={t.email} value={form.email} onChangeText={set('email')} placeholder={t.emailHint} keyboardType="email-address" autoCapitalize="none" />
            <Field label={`${t.avatar} (URL)`} value={form.avatar} onChangeText={set('avatar')} placeholder={t.avatarHint} autoCapitalize="none" />

            <TouchableOpacity style={styles.chooseButton} onPress={onPickImage}>
              <Text style={styles.chooseButtonText}>▧  {t.choosePhoto}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={onSave} activeOpacity={0.85}>
            <Text style={styles.saveButtonText}>✓  {mode === 'add' ? t.save : t.update}</Text>
          </TouchableOpacity>

          <Text style={styles.owner}>{t.owner}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 36 },
  topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  backIcon: { fontSize: 31, lineHeight: 32, color: colors.text },
  headingWrap: { marginLeft: 13 },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  heading: { marginTop: 2, color: colors.text, fontSize: 22, fontWeight: '900' },
  avatarPanel: {
    flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: colors.primaryDark, borderRadius: 22,
  },
  avatarTextWrap: { flex: 1, marginLeft: 14, marginRight: 8 },
  avatarTitle: { color: colors.white, fontWeight: '900', fontSize: 15 },
  avatarHint: { marginTop: 4, color: '#C7E4E0', fontSize: 11, lineHeight: 16 },
  photoButton: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  photoButtonText: { color: '#3C2A00', fontSize: 20, fontWeight: '900' },
  formCard: { marginTop: 16, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 16 },
  field: { marginBottom: 16 },
  label: { color: colors.text, fontSize: 12, fontWeight: '900', marginBottom: 7 },
  input: { borderWidth: 1, borderColor: colors.border, backgroundColor: '#FAFBFC', borderRadius: 14, paddingHorizontal: 13, paddingVertical: Platform.OS === 'ios' ? 13 : 10, color: colors.text, fontSize: 14 },
  chooseButton: { borderWidth: 1, borderColor: '#B7DDD7', backgroundColor: colors.primarySoft, borderRadius: 14, alignItems: 'center', paddingVertical: 13 },
  chooseButtonText: { color: colors.primaryDark, fontWeight: '900', fontSize: 13 },
  saveButton: { marginTop: 18, backgroundColor: colors.primary, borderRadius: 17, alignItems: 'center', paddingVertical: 15 },
  saveButtonText: { color: colors.white, fontWeight: '900', fontSize: 15 },
  owner: { textAlign: 'center', marginTop: 22, color: '#8E97A6', fontSize: 11 },
});
