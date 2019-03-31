/* @flow weak */

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import PropTypes from 'prop-types'
import colors from '../../colors'

const ReviewStars = ({ rating, small }) => {
  const starsEl = [...Array(rating)].map((_, i) => (
    <Icon key={i} size={small ? 14 : 18} color={colors.star} name="star" />
  ))
  return (
    <View style={[styles.starsContainer, small ? styles.small : null]}>
      {starsEl}
      <Text style={[styles.reviewsCount, small ? styles.smallCount : null]}>(0)</Text>
    </View>
  )
}
ReviewStars.defaultProps = {
  rating: 5,
  small: false,
}
ReviewStars.propTypes = {
  rating: PropTypes.number,
  small: PropTypes.bool,
}

export default ReviewStars

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsCount: {
    marginLeft: 3,
  },
  small: {
    marginBottom: -4,
  },
  smallCount: {
    color: 'white',
    fontSize: 12,
    marginTop: 0,
  },
})
