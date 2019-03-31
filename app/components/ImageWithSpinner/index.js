import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import colors from '../../colors'

export default class ImageWithSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  render() {
    const { loading } = this.state
    return (
      <FastImage
        originalWidth={600}
        originalHeight={250}
        source={{ uri: this.props.source.uri }}
        {...this.props}
        onLoadEnd={() => {
          this.setState({ loading: false })
        }}
        style={[styles.indicator, this.props.style]}
      >
        {loading && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.neonPink} />
          </View>
        )}
      </FastImage>
    )
  }
}

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
