import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator,
} from 'react-native'
import colors from '../../colors'

const Button = props => (
  <TouchableOpacity
    style={[
      styles.button,
      props.btnStyle,
      props.sm ? styles.sm : null,
      props.default ? styles.defaultStyle : null,
      props.danger ? styles.dangerStyle : null,
    ]}
    onPress={props.onPress}
    disabled={props.disabled}
  >
    {props.isFetching ? (
      <ActivityIndicator color={colors.mainDark} />
    ) : (
      <Text
        style={[
          props.disabled ? styles.textDisabled : styles.text,
          props.sm ? styles.textSm : null,
          props.default ? styles.textDefault : null,
          props.textStyle,
        ]}
      >
        {props.text.toUpperCase()}
      </Text>
    )}
    {props.children}
  </TouchableOpacity>
)

Button.defaultProps = {
  disabled: false,
  isFetching: false,
  btnStyle: null,
  textStyle: null,
  default: false,
  danger: false,
  sm: false,
}
Button.propTypes = {
  disabled: PropTypes.bool,
  isFetching: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  btnStyle: PropTypes.array,
  textStyle: PropTypes.array,
  default: PropTypes.bool,
  danger: PropTypes.bool,
  sm: PropTypes.bool,
}
export default Button

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.active,
    zIndex: -1,
  },
  defaultStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: -1,
  },
  dangerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    zIndex: -1,
  },
  sm: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  textDisabled: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.secondary,
  },
  textDefault: {
    color: colors.active,
  },
  textSm: {
    fontSize: 14,
  },
})
