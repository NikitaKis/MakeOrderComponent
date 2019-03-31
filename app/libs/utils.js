import { Dimensions, PixelRatio } from 'react-native'

const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel(screenWidth * (elemWidth / 100))
}
const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get('window').height
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel(screenHeight * (elemHeight / 100))
}
const imageUri = name => ({ uri: `https://dq0wunqhhu0yr.cloudfront.net/${name}` })
export { widthPercentageToDP, heightPercentageToDP, imageUri }
