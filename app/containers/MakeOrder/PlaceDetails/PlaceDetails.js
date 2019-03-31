import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabView, TabBar, PagerScroll } from 'react-native-tab-view'
import colors from '../../../colors'

import Description from './description'
import SpecialOffers from './specialOffers'
import Reviews from './reviews'
import Photos from './photos'
import tabRoutes from './tabRoutes'

const initialLayout = {
  height: 0,
  width: 300,
}
type Props = {
  placeDetails: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
}
class PlaceDetails extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: tabRoutes,
      show: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      })
    }, 600) // this is a react-native-tab-view bag
  }

  handleIndexChange = (index) => {
    const { index: stateIndex } = this.state
    if (index !== stateIndex) {
      this.setState({
        index,
      })
    }
  }

  renderScene = ({ route, jumpTo }) => {
    const { placeDetails } = this.props
    if (!placeDetails) return null
    const uri = placeDetails && placeDetails.place_image_name ? { uri: placeDetails.place_image_name } : null
    switch (route.key) {
      case 'description':
        return <Description jumpTo={jumpTo} placeDetails={placeDetails} />
      case 'offers':
        return <SpecialOffers jumpTo={jumpTo} />
      case 'photo':
        return <Photos jumpTo={jumpTo} uri={uri} />
      case 'reviews':
        return <Reviews jumpTo={jumpTo} reviews={[]} />
      default:
        return null
    }
  }

  renderIcon = ({ route }) => {
    const { routes, index } = this.state
    const active = routes.findIndex(item => item.key === route.key) === index
    return (
      <Ionicons name={route.icon} size={24} color={active ? colors.active : colors.secondary} />
    )
  }

  renderPager = props => <PagerScroll {...props} />

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.active }}
      style={styles.tabBar}
      labelStyle={{ color: 'white', textAlign: 'center' }}
      renderIcon={this.renderIcon}
      useNativeDriver
    />
  )

  render() {
    const { show } = this.state
    return (
      <View style={{ height: 200 }}>
        {show && (
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderPager={this.renderPager}
            renderTabBar={this.renderTabBar}
            onIndexChange={this.handleIndexChange}
            initialLayout={initialLayout}
            useNativeDriver
          />
        )}
      </View>
    )
  }
}

export default PlaceDetails

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.darkMain,
    height: 50,
    marginBottom: 8,
  },
})
