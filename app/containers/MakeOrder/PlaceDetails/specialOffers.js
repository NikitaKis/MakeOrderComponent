import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../../colors'

const SpecialOffers = () => (
  <View style={{ height: '100%' }}>
    <Text numberOfLines={2} style={styles.text}>
      Special offers list:
    </Text>
  </View>
)
export default SpecialOffers

const styles = StyleSheet.create({
  text: {
    color: colors.tiles,
    alignSelf: 'center',
  },
})
