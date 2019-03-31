import React from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'
import { imageUri } from '../../../libs/utils'

const { width: screenWidth } = Dimensions.get('window')

const IMAGE_SIZE = screenWidth / 3
const formatFloatToPrice = (floatNumber, minimumFractionDigits = 2) => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits,
  })
  return formatter.format(floatNumber)
}
const SectionListItem = (props) => {
  const {
    item,
    index: productIndex,
    section,
    addToCart,
    incrItemCountInCart,
    decrItemCountInCart,
    imagePress,
    cartItems,
  } = props
  const { title: sectionTitle } = section

  const {
    hasProperties, minPrice, productDescription, productName, image,
  } = item
  const uri = imageUri(image)
  const priceText = hasProperties
    ? `от ${formatFloatToPrice(minPrice)}`
    : formatFloatToPrice(minPrice)
  let inCartCount = 0
  try {
    inCartCount = cartItems.filter(cartItem => cartItem.productUuid === item.productUuid).length
  } catch (e) {
    inCartCount = 0
  }
  const handleAddToCart = () => {
    addToCart(item, productIndex, sectionTitle)
  }
  const handleIncrItemCountInCart = () => {
    incrItemCountInCart(item, productIndex)
  }
  const handleDecrItemCountInCart = () => {
    decrItemCountInCart(item, productIndex)
  }
  const handleImagePress = () => {
    imagePress(item, productIndex, sectionTitle)
  }
  return (
    <ProductItem
      index={productIndex}
      hasProperties={hasProperties}
      productDescription={productDescription}
      productName={productName}
      uri={uri}
      priceText={priceText}
      handleAddToCart={handleAddToCart}
      handleIncrItemCountInCart={handleIncrItemCountInCart}
      handleDecrItemCountInCart={handleDecrItemCountInCart}
      handleImagePress={handleImagePress}
      imageSize={IMAGE_SIZE}
      inCartCount={inCartCount}
    />
  )
}
SectionListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  section: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  incrItemCountInCart: PropTypes.func.isRequired,
  decrItemCountInCart: PropTypes.func.isRequired,
  imagePress: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
}
export default SectionListItem
