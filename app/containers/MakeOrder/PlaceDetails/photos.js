import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { widthPercentageToDP } from '../../../libs/utils'
import ImageWithSpinner from '../../../components/ImageWithSpinner'

const CARD_WIDTH = widthPercentageToDP(100)

const Photos = ({ uri }) => (
  <View>
    <ImageWithSpinner source={uri} style={styles.cardImage} resizeMode="contain" />
  </View>
)
export default Photos

Photos.propTypes = {
  uri: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH / 2,
    zIndex: 11,
  },
})
