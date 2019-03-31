import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  Text,
  PixelRatio,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import PlaceDetails from '../PlaceDetails'
import SearchBar from '../../../components/SearchBar'
import colors from '../../../colors'
import PatternItem from './PatternItem'
import SectionListItem from './SectionListItem'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const IMAGE_SIZE = screenWidth / 3
const PLACE_INFO_HEIGHT = screenHeight * 0.3
const COLLAPSED_HEADER_HEIGHT = screenHeight * 0
export const ITEM_HEIGHT = IMAGE_SIZE * 1.4
const SECTION_HEIGHT = 40
const PATTERNS_LIST_MARGIN_BOTTOM = 8
const SECTION_VIEW_OFFSET = 40 + PATTERNS_LIST_MARGIN_BOTTOM

const formatProduct = product => ({ key: product.productUuid, ...product })
const formatSection = item => ({
  key: item.productPatternDetails.productPatternName,
  title: item.productPatternDetails.productPatternName,
  data: item.products.map(product => formatProduct(product)),
})

const calcProductsCountInState = (dataProducts) => {
  let res = 0
  dataProducts.forEach(section => (res += section.data.length))
  return res
}
const calcProductsCountInProps = (productsByPattern) => {
  let res = 0
  productsByPattern.forEach(section => (res += section.products.length))
  return res
}

type Props = {
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  moveToLocation: PropTypes.object.isRequired,
  placeDetails: PropTypes.object.isRequired,
  isFetchingPlaceDetails: PropTypes.bool.isRequired,
}

class ProductsList extends PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
    this.scrollOffset = new Animated.Value(0)
    this.getItemLayout = sectionListGetItemLayout({
      getItemHeight: () => ITEM_HEIGHT,
      getSeparatorHeight: () => 1 / PixelRatio.get(),
      getSectionHeaderHeight: () => SECTION_HEIGHT,
      getSectionFooterHeight: () => 0,
      listHeaderHeight: 0,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.state
    if (nextProps.products && (!data || data.length === 0)) {
      this.setProducts(nextProps.products)
    }
    if (nextProps.moveToLocation) {
      setTimeout(() => {
        this.moveToLocation(nextProps.moveToLocation)
      }, 1000)
    }
  }

  setProducts(products) {
    this.setState({
      data: products.map(item => formatSection(item)),
    })
  }

  moveToLocation = ({ sectionTitle, productIndex }) => {
    const { dataProducts } = this.state
    let sectionIndex
    try {
      sectionIndex = dataProducts.findIndex(item => item.title === sectionTitle)
    } catch (e) {
      sectionIndex = null
    }
    if (sectionIndex && this.productsList) {
      this.productsList.getNode().scrollToLocation({
        itemIndex: productIndex,
        sectionIndex,
        viewOffset: SECTION_VIEW_OFFSET,
      })
    }
  }

  handleAddToCart = () => {

  }

  handleIncrItemCountInCart = () => {

  }

  handleDecrItemCountInCart = () => {

  }

  handleImagePress = () => {

  }

  renderSectionListItem = props => (
    <SectionListItem
      {...props}
      addToCart={this.handleAddToCart}
      incrItemCountInCart={this.handleIncrItemCountInCart}
      decrItemCountInCart={this.handleDecrItemCountInCart}
      imagePress={this.handleImagePress}
      cartItems={[]}
    />
  )

  keyExtractor = item => item.productUuid

  handleSearchInput = (inputText) => {
    const { products } = this.props
    const stringToFind = inputText.toUpperCase()
    const newData = []
    products.forEach((item) => {
      const copySection = { ...item }
      const sectionTitle = copySection.productPatternDetails.productPatternName.toUpperCase()
      if (sectionTitle.indexOf(stringToFind) > -1) {
        newData.push(formatSection(copySection))
      } else {
        const copyItemData = []
        copySection.products.forEach((product) => {
          const productName = product.productName.toUpperCase()
          const productDescription = product.productDescription.toUpperCase()
          if (
            productName.indexOf(stringToFind) > -1
            || productDescription.indexOf(stringToFind) > -1
          ) {
            copyItemData.push(formatProduct(product))
          }
        })
        if (copyItemData.length > 0) {
          copySection.products = copyItemData
          newData.push(formatSection(copySection))
        }
      }
    })
    this.setState({ data: newData })
  }

  clearSearch = () => {
    const { products } = this.props
    this.setProducts(products)
  }

  navigateToPatternGroup = (sectionIndex) => {
    if (this.productsList) {
      setTimeout(() => {
        this.productsList.getNode().scrollToLocation({
          itemIndex: 0,
          sectionIndex,
          viewOffset: SECTION_VIEW_OFFSET,
        })
      }, 100)
    }
  }

  renderPatternItem = ({ item, index }) => (
    <PatternItem item={item} index={index} navigateToPatternGroup={this.navigateToPatternGroup} />
  )

  render() {
    const {
      isFetching, placeDetails, isFetchingPlaceDetails, products,
    } = this.props
    const { data } = this.state
    return (
      <View>
        <Animated.View
          style={{
            height: '100%',
            transform: [
              {
                translateY: this.scrollOffset.interpolate({
                  inputRange: [0, 200],
                  outputRange: [PLACE_INFO_HEIGHT, COLLAPSED_HEADER_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: PATTERNS_LIST_MARGIN_BOTTOM,
            }}
          >
            <SearchBar handleSearchInput={this.handleSearchInput} clearSearch={this.clearSearch} />
            {!isFetching && data && data.length > 0 && (
              <FlatList
                contentContainerStyle={{ maxHeight: 40 }}
                data={data}
                horizontal
                renderItem={this.renderPatternItem}
                extraData={this.state}
                keyExtractor={this.keyExtractorPatterns}
              />
            )}
          </View>
          {!isFetching && data && data.length > 0 && (
            <View>
              <Text style={styles.countText}>
                {`Найдено товаров ${calcProductsCountInState(data)} из ${calcProductsCountInProps(
                  products,
                )}`}
              </Text>
            </View>
          )}
          {!isFetching && data && data.length > 0 && (
            <Animated.SectionList
              ref={list => (this.productsList = list)} // new this.productsList = React.CreatRef() - doesn't work with this.productsList.getNode().scrollToLocation
              contentContainerStyle={{ paddingBottom: 100 }}
              scrollEventThrottle={16}
              extraData={this.state}
              sections={data}
              getItemLayout={this.getItemLayout}
              renderSectionHeader={({ section }) => (
                <View style={styles.sectionHeaderContainer}>
                  <Text style={styles.sectionName}>{section.title.toUpperCase()}</Text>
                </View>
              )}
              stickySectionHeadersEnabled={false}
              SectionSeparatorComponent={null}
              renderItem={this.renderSectionListItem}
              keyExtractor={this.keyExtractor}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.scrollOffset,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
            />
          )}
          {isFetching && <ActivityIndicator color={colors.neonPink} size="large" />}
        </Animated.View>

        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            overflow: 'hidden',
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            transform: [
              {
                translateY: this.scrollOffset.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, -PLACE_INFO_HEIGHT + COLLAPSED_HEADER_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
            height: PLACE_INFO_HEIGHT,
          }}
        >
          <PlaceDetails placeDetails={placeDetails} isFetching={isFetchingPlaceDetails} />
        </Animated.View>
      </View>
    )
  }
}

export default ProductsList

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    padding: 8,
    height: SECTION_HEIGHT,
    maxHeight: SECTION_HEIGHT,
    backgroundColor: colors.main,
  },
  sectionName: {
    fontSize: 14,
    color: colors.neonBlue,
    fontWeight: 'bold',
  },
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
  countText: {
    fontSize: 10,
    marginLeft: 8,
    marginBottom: 8,
    color: colors.tiles,
  },
  cartOrderBtnContainer: {
    flex: 1,
    height: 58,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    // maxHeight: MAX_ORDER_BTN_HEIGHT,
    zIndex: 30,
  },
  upperBtn: {
    position: 'absolute',
    bottom: parseInt(58 * 2, 10),
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
})
