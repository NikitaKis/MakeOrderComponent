import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../../colors'

const addressNice = (address) => {
  const txt = address ? address.split(',').slice(0, 3) : []
  return txt.join(', ')
}

const Description = ({ placeDetails }) => (
  <View style={{ height: '100%' }}>
    <Text style={[styles.text, styles.address]}>
      <Text style={{ fontWeight: 'bold' }}>Address: </Text>
      {addressNice(placeDetails.place_address)}
    </Text>
    <Text style={[styles.text, styles.addressNotes]}>{placeDetails.place_address_notes}</Text>
    <View style={{ marginTop: 8 }}>
      <Text style={[styles.text, styles.placeDescription]}>
        <Text style={{ fontWeight: 'bold' }}>Description: </Text>
        {placeDetails.place_description}
      </Text>
      {placeDetails.price_short_description && (
        <Text style={[styles.text, styles.placeDescription]}>
          {placeDetails.price_short_description}
        </Text>
      )}
    </View>
  </View>
)
export default Description

Description.propTypes = {
  placeDetails: PropTypes.shape({
    place_address_notes: PropTypes.string,
    place_address: PropTypes.string,
    place_description: PropTypes.string,
    price_short_description: PropTypes.string,
  }).isRequired,
}

const styles = StyleSheet.create({
  text: {
    color: colors.tiles,
  },

  address: {
    fontSize: 14,
  },
  addressNotes: {
    fontSize: 13,
  },
  placeDescription: {
    marginTop: 5,
  },
})
