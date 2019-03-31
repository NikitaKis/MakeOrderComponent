import React, { PureComponent } from 'react'
import {
  Animated, TextInput, TouchableOpacity, Easing, StyleSheet,
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import colors from '../../colors'

const COLLAPSED_WIDTH = 50
const FULL_WIDTH = 180

type Props = {
  clearSearch: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
}
export default class SearchBar extends PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
    this.scrollOffset = new Animated.Value(0)
  }

  toggle = () => {
    const { collapsed } = this.state
    const { clearSearch } = this.props
    this.setState(
      {
        collapsed: !collapsed,
      },
      () => {
        if (!this.state.collapsed) {
          clearSearch()
        }
        Animated.timing(this.scrollOffset, {
          toValue: !!this.state.collapsed,
          duration: 50,
          easing: Easing.ease,
        }).start()
      },
    )
  }

  render() {
    const { collapsed } = this.state
    const { handleSearchInput } = this.props
    return (
      <Animated.View
        style={{
          height: 40,
          width: this.scrollOffset.interpolate({
            inputRange: [0, 1],
            outputRange: [COLLAPSED_WIDTH, FULL_WIDTH],
            extrapolate: 'clamp',
          }),
          flexDirection: 'row',
        }}
      >
        <Animated.View
          style={[
            {
              width: this.scrollOffset.interpolate({
                inputRange: [0, 1],
                outputRange: [0, FULL_WIDTH - COLLAPSED_WIDTH],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <TextInput
            underlineColorAndroid="transparent"
            onChangeText={handleSearchInput}
            style={[styles.inputSmall, { paddingHorizontal: !collapsed ? 0 : 8 }]}
            placeholder="Search"
            placeholderTextColor={colors.placeHolder}
          />
        </Animated.View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            flex: 1,
            alignSelf: 'flex-end',
          }}
          onPress={this.toggle}
        >
          {collapsed ? (
            <IonIcons
              style={{ alignSelf: 'flex-end', marginRight: 16, opacity: 0.8 }}
              name="ios-close-circle"
              color={colors.tiles}
              size={40}
            />
          ) : (
            <IonIcons
              style={{ alignSelf: 'flex-end', marginRight: 16, opacity: 0.8 }}
              name="ios-search"
              color={colors.tiles}
              size={40}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  inputSmall: {
    height: 40,
    marginHorizontal: 8,
    backgroundColor: colors.mainLightTwo,
    overflow: 'hidden',
    color: colors.tiles,
    borderRadius: 16,
  },
})
