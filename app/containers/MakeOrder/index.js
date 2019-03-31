import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as placeActions from './PlaceDetails/actions'
import * as productActions from './Products/actions'
import ProductsList from './Products/ProductsList'

type Props = {
  dispatch: PropTypes.func.isRequired,
  placeDetails: PropTypes.object,
  isFetchingPlaceDetails: PropTypes.bool.isRequired,
  products: PropTypes.object,
}

class MakeOrder extends React.Component<Props> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(placeActions.fetchPlaceDetails())
    dispatch(productActions.fetchProducts())
  }

  render() {
    const { placeDetails, isFetchingPlaceDetails, products } = this.props
    return (
      <View style={styles.container}>
        <ProductsList
          placeDetails={placeDetails}
          isFetchingPlaceDetails={isFetchingPlaceDetails}
          products={products}
          isFetching={false}
          moveToLocation={null}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  placeDetails: state.places.details,
  isFetchingPlaceDetails: state.places.isFetching,
  products: state.products.items,
})
export default connect(mapStateToProps)(MakeOrder)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 8,
    paddingTop: 58,
  },
})
