// Deals Screen Component
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing } from '../theme'

export default function DealsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deals Screen - Coming Soon</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  text: {
    ...typography.body,
    color: colors.text,
  },
})
