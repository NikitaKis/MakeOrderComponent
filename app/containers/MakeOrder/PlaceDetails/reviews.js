import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../../colors'
import ReviewStars from '../../../components/ReviewStars'

class Reviews extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }

  handleReviewPrev = () => {
    const { index } = this.state
    const { reviews } = this.props
    if (reviews.length < index) {
      this.setState({
        index: index + 1,
      })
    }
  }

  handleReviewNext = () => {
    const { index } = this.state
    if (index > 0) {
      this.setState({
        index: index - 1,
      })
    }
  }

  render() {
    const { reviews } = this.props
    const { index } = this.state
    const review = reviews[index]
    // TODO write review component
    return (
      <View style={styles.reviewsContainer}>
        <View>
          <View style={{ flexDirection: 'row', marginTop: 5, width: '100%' }}>
            <Text style={[styles.text, styles.header, { flex: 1 }]}>Reviews</Text>
            <ReviewStars rating={5} />
          </View>
        </View>
        {reviews.length === 0 && <Text style={styles.noReviews}>There are no reviews yet</Text>}
        <View>
          <TouchableOpacity style={styles.leftChevron} onPress={this.handleReviewPrev}>
            <Icon style={{ padding: 15 }} size={30} color={colors.tiles} name="chevron-thin-left" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightChevron} onPress={this.handleReviewNext}>
            <Icon
              style={{ padding: 15 }}
              size={30}
              color={colors.tiles}
              name="chevron-thin-right"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default Reviews

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  text: {
    color: colors.tiles,
  },
  header: {
    fontSize: 18,
    marginBottom: 6,
    width: '90%',
  },
  reviewsContainer: {
    flex: 1,
    width: '100%',
  },
  leftChevron: {
    position: 'absolute',
    opacity: 0.3,
    backgroundColor: 'transparent',
    left: -10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    height: 50,
  },
  rightChevron: {
    position: 'absolute',
    opacity: 0.3,
    backgroundColor: 'transparent',
    right: -10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    height: 50,
  },
  noReviews: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: colors.tiles,
  },
})
