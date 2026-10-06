import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StudentAvatar from '../components/StudentAvatar';
import { colors } from '../constants/theme';

function InfoRow({ label, value, last }) {
  return (
    <View style={[styles.infoRow, last && styles.infoRowLast]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );
}

export default function StudentDetailScreen({ student, t, onBack, onEdit, onDelete }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>{t.detail}</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.decorOne} />
          <View style={styles.decorTwo} />
          <StudentAvatar uri={student.avatar} name={student.fullName} size={104} />
          <Text style={styles.name}>{student.fullName}</Text>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{student.studentCode}</Text>
          </View>
          <Text style={styles.email}>{student.email}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t.profile}</Text>
        <View style={styles.infoCard}>
          <InfoRow label={t.fullName} value={student.fullName} />
          <InfoRow label={t.studentCode} value={student.studentCode} />
          <InfoRow label={t.email} value={student.email} last />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editText}>✎  {t.edit}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>⌫  {t.delete}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.owner}>{t.owner}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 36 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  backButtonPlaceholder: { width: 42, height: 42 },
  backIcon: { fontSize: 31, lineHeight: 32, color: colors.text },
  topTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  profileCard: {
    overflow: 'hidden', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 28, paddingHorizontal: 20,
    paddingTop: 28, paddingBottom: 26, borderWidth: 1, borderColor: colors.border,
  },
  decorOne: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: colors.primarySoft, top: -70, right: -40 },
  decorTwo: { position: 'absolute', width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFF2CF', bottom: -38, left: -22 },
  name: { marginTop: 16, color: colors.text, fontSize: 23, fontWeight: '900', textAlign: 'center' },
  codeBadge: { marginTop: 10, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6, backgroundColor: colors.primarySoft },
  codeText: { color: colors.primaryDark, fontSize: 13, fontWeight: '900', letterSpacing: 0.7 },
  email: { marginTop: 10, color: colors.muted, fontSize: 13 },
  sectionTitle: { marginTop: 26, marginBottom: 10, color: colors.text, fontSize: 16, fontWeight: '900' },
  infoCard: { backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16 },
  infoRow: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEF1F5' },
  infoRowLast: { borderBottomWidth: 0 },
  infoLabel: { color: colors.muted, fontSize: 11, textTransform: 'uppercase', fontWeight: '800', letterSpacing: 0.7 },
  infoValue: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 5 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 18 },
  editButton: { flex: 1, alignItems: 'center', borderRadius: 16, backgroundColor: colors.primary, paddingVertical: 14 },
  editText: { color: colors.white, fontWeight: '900' },
  deleteButton: { flex: 1, alignItems: 'center', borderRadius: 16, backgroundColor: colors.dangerSoft, paddingVertical: 14 },
  deleteText: { color: colors.danger, fontWeight: '900' },
  owner: { marginTop: 24, textAlign: 'center', color: '#8E97A6', fontSize: 11 },
});
