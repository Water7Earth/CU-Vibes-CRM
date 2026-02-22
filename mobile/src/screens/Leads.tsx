// Leads Screen Component

import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import MaterialCommunityIcons from '@react-native-vector-icons/MaterialCommunityIcons'
import { useLeadsStore } from '../stores'
import { colors, typography, spacing, shadows } from '../theme'

export default function LeadsScreen() {
  const { leads, isLoading, fetchLeads } = useLeadsStore()

  useEffect(() => {
    fetchLeads()
  }, [])

  const renderLead = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.leadName}>{item.name}</Text>
        <View
          style={[
            styles.badge,
            item.status === 'open' && styles.badgeOpen,
            item.status === 'converted' && styles.badgeConverted,
            item.status === 'lost' && styles.badgeLost,
          ]}
        >
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.leadEmail}>{item.email}</Text>
      {item.phone && <Text style={styles.leadPhone}>{item.phone}</Text>}
      {item.company && <Text style={styles.leadCompany}>{item.company}</Text>}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={leads}
            renderItem={renderLead}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons
                  name="inbox-fill"
                  size={48}
                  color={colors.gray}
                />
                <Text style={styles.emptyText}>No leads yet</Text>
              </View>
            }
          />
          <TouchableOpacity style={styles.fab}>
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  leadName: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  badgeOpen: {
    backgroundColor: '#dbeafe',
  },
  badgeConverted: {
    backgroundColor: '#dcfce7',
  },
  badgeLost: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    ...typography.small,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  leadEmail: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  leadPhone: {
    ...typography.small,
    color: colors.textLight,
  },
  leadCompany: {
    ...typography.small,
    color: colors.textLight,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...typography.body,
    color: colors.textLight,
    marginTop: spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
})
