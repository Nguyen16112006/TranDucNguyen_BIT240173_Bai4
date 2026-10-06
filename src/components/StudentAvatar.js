import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function StudentAvatar({ uri, name, size = 64 }) {
  const shape = { width: size, height: size, borderRadius: size / 3.2 };

  if (uri) {
    return <Image source={{ uri }} style={[styles.image, shape]} />;
  }

  return (
    <View style={[styles.fallback, shape]}>
      <Text style={[styles.initials, { fontSize: size * 0.32 }]}>{initials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.primarySoft,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: '#BDE6DF',
  },
  initials: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
});
