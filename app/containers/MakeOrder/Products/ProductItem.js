import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import colors from '../../../colors'
import { ITEM_HEIGHT } from './ProductsList'

export default class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.inCartCount !== this.props.inCartCount
  }

  render() {
    const {
      index,
      userEnv,
      hasProperties,
      inCartCount,
      productDescription,
      productName,
      productIcon,
      uri,
      priceText,
      imageSize,
      handleAddToCart,
      handleIncrItemCountInCart,
      handleDecrItemCountInCart,
      handleImagePress,
    } = this.props
    const addToCartBtn = (
      <TouchableOpacity
        style={styles.orderBtn}
        onPress={hasProperties ? handleImagePress : handleAddToCart}
      >
        <Text style={styles.orderBtnText}>Заказать</Text>
      </TouchableOpacity>
    )
    const incrItemCountsInCartEl = (
      <TouchableOpacity
        style={styles.btn}
        onPress={hasProperties ? handleImagePress : handleIncrItemCountInCart}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    )
    const decrItemCountsInCartEl = (
      <TouchableOpacity style={styles.btn} onPress={handleDecrItemCountInCart}>
        <Text style={styles.btnText}>-</Text>
      </TouchableOpacity>
    )
    const alreadyInCartEl = (
      <View style={styles.incDecrContainer}>
        {decrItemCountsInCartEl}
        <View>
          <Text style={styles.countText}>{inCartCount}</Text>
        </View>
        {incrItemCountsInCartEl}
      </View>
    )
    const actionBtn = inCartCount > 0 ? alreadyInCartEl : addToCartBtn
    return (
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: index % 2 ? colors.main : colors.mainLightOne,
            height: ITEM_HEIGHT,
          },
        ]}
      >
        <TouchableOpacity onPress={handleImagePress}>
          <FastImage style={[styles.image, { width: imageSize, height: imageSize }]} source={uri} />
        </TouchableOpacity>
        <View style={styles.itemContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{productName}</Text>
          </View>
          <View style={styles.contentDetails}>
            <Text style={styles.name}>{productDescription}</Text>
          </View>
          <View style={styles.priceContainer}>
            {actionBtn}
            <View style={styles.text}>
              <Text style={styles.price}>{priceText}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingBottom: 24,
    paddingTop: 8,
  },
  itemContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 16,
    flex: 2,
  },
  contentHeader: {
    marginBottom: 8,
  },
  contentDetails: {
    flex: 3,
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
  },
  orderBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.mainLightOne,
    borderWidth: 1,
    borderColor: colors.neonBlue,
    padding: 8,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    alignItems: 'center',
    color: colors.tiles,
  },
  orderBtnText: {
    fontSize: 16,
    color: colors.tiles,
  },
  image: {},
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  btnText: {
    color: colors.tiles,
    fontSize: 20,
    textAlign: 'center',
    padding: 4,
    paddingHorizontal: 10,
  },
  countText: {
    color: colors.tiles,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: colors.mainLightOne,
    borderWidth: 1,
    borderColor: colors.neonBlue,
    borderRadius: 8,
  },
  incDecrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
