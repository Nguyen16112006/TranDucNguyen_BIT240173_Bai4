import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import StudentAvatar from '../components/StudentAvatar';
import { colors } from '../constants/theme';

export default function StudentListScreen({ students, t, onAdd, onOpen }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>SR</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAdd} activeOpacity={0.85}>
            <Text style={styles.addButtonText}>＋ {t.add}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{t.appName}</Text>
        <Text style={styles.caption}>{t.appCaption}</Text>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>{t.studentList}</Text>
            <Text style={styles.summaryMeta}>{t.localDatabase}</Text>
          </View>
          <View style={styles.countPill}>
            <Text style={styles.countNumber}>{students.length}</Text>
            <Text style={styles.countLabel}>{t.total}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, students.length === 0 && styles.emptyList]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>◫</Text>
            <Text style={styles.emptyTitle}>{t.emptyTitle}</Text>
            <Text style={styles.emptyText}>{t.emptyText}</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={onAdd}>
              <Text style={styles.primaryButtonText}>＋ {t.addStudent}</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.rowCard} onPress={() => onOpen(item)} activeOpacity={0.8}>
            <View style={styles.indexBadge}>
              <Text style={styles.indexText}>{String(index + 1).padStart(2, '0')}</Text>
            </View>

            <StudentAvatar uri={item.avatar} name={item.fullName} size={58} />

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.fullName}</Text>
              <Text style={styles.code}>{item.studentCode}</Text>
              <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
            </View>

            <View style={styles.chevronBox}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={<Text style={styles.owner}>{t.owner}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandMark: {
    width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
  },
  brandMarkText: { color: colors.white, fontWeight: '900', letterSpacing: 1 },
  addButton: { backgroundColor: colors.accent, borderRadius: 14, paddingHorizontal: 15, paddingVertical: 11 },
  addButtonText: { color: '#382500', fontWeight: '800', fontSize: 14 },
  title: { marginTop: 24, color: colors.white, fontSize: 29, fontWeight: '900' },
  caption: { marginTop: 6, color: '#CDEAE5', fontSize: 14, lineHeight: 20 },
  summaryCard: {
    marginTop: 22, padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.10)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)',
  },
  summaryLabel: { color: colors.white, fontSize: 16, fontWeight: '800' },
  summaryMeta: { color: '#B8DED8', marginTop: 4, fontSize: 12 },
  countPill: { minWidth: 72, backgroundColor: colors.white, borderRadius: 16, paddingVertical: 8, alignItems: 'center' },
  countNumber: { color: colors.primaryDark, fontSize: 20, fontWeight: '900' },
  countLabel: { color: colors.muted, fontSize: 10, marginTop: 1 },
  list: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 32 },
  emptyList: { flexGrow: 1 },
  emptyCard: {
    flex: 1, minHeight: 330, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface,
    borderRadius: 24, padding: 28, borderWidth: 1, borderColor: colors.border,
  },
  emptyIcon: { fontSize: 50, color: colors.primary, fontWeight: '300' },
  emptyTitle: { marginTop: 16, fontSize: 19, fontWeight: '800', color: colors.text },
  emptyText: { marginTop: 8, textAlign: 'center', color: colors.muted, lineHeight: 20 },
  primaryButton: { marginTop: 22, borderRadius: 15, backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 13 },
  primaryButtonText: { color: colors.white, fontWeight: '800' },
  rowCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 20, padding: 12,
    marginBottom: 12, borderWidth: 1, borderColor: colors.border,
  },
  indexBadge: { width: 28, alignItems: 'center', marginRight: 8 },
  indexText: { fontSize: 11, color: '#98A1B2', fontWeight: '800' },
  info: { flex: 1, marginLeft: 12, minWidth: 0 },
  name: { color: colors.text, fontSize: 16, fontWeight: '800' },
  code: { color: colors.primary, fontSize: 13, fontWeight: '800', marginTop: 4 },
  email: { color: colors.muted, fontSize: 12, marginTop: 3 },
  chevronBox: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F5F8' },
  chevron: { color: colors.text, fontSize: 25, lineHeight: 27 },
  owner: { textAlign: 'center', color: '#8993A4', fontSize: 11, marginTop: 12, marginBottom: 4 },
});
