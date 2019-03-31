import React from 'react'
import PropTypes from 'prop-types'
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'
import colors from '../../../colors'

const PatternItem = ({ item, index, navigateToPatternGroup }) => {
  const handleClick = () => {
    navigateToPatternGroup(index)
  }
  return (
    <TouchableOpacity style={styles.patternContainer} onPress={handleClick}>
      <View style={styles.patternHeader}>
        <Text style={styles.patternName}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default PatternItem

PatternItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  navigateToPatternGroup: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  patternContainer: {
    backgroundColor: colors.mainLightTwo,
    borderRadius: 18,
    marginRight: 16,
  },
  patternHeader: {},
  patternName: {
    padding: 12,
    fontSize: 14,
    color: colors.tiles,
  },
})
