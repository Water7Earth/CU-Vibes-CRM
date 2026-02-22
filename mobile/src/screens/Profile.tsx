// Profile Screen Component
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import MaterialCommunityIcons from '@react-native-vector-icons/MaterialCommunityIcons'
import { useAuthStore } from '../stores'
import { colors, typography, spacing, shadows } from '../theme'

export default function ProfileScreen() {
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons
            name="account-circle"
            size={80}
            color={colors.primary}
          />
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="cog" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons
            name="help-circle"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.dangerItem]}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={colors.error}
          />
          <Text style={[styles.menuText, { color: colors.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  avatar: {
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.textLight,
  },
  menu: {
    marginTop: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: '#fff',
    marginBottom: spacing.sm,
    borderRadius: 8,
  },
  dangerItem: {
    marginTop: spacing.lg,
  },
  menuText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.lg,
  },
})
