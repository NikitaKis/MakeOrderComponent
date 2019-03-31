import placeDetails from '../../../assets/data/placeDetails.json'
import constants from '../../../constants'

const fakeFetch = () => new Promise(resolve => resolve(placeDetails))
const fetchPlaceDetailsStart = () => ({
  type: constants.PLACE_DETAILS_FETCH_START,
})
const fetchPlaceDetailsSuccess = data => ({
  type: constants.PLACE_DETAILS_FETCH_SUCCESS,
  data,
})
const fetchPlaceDetailsFailed = error => ({
  type: constants.PLACE_DETAILS_FETCH_FAILED,
  error,
})

export const fetchPlaceDetails = () => (dispatch) => {
  dispatch(fetchPlaceDetailsStart())
  return fakeFetch()
    .then((result) => {
      dispatch(fetchPlaceDetailsSuccess(result))
    })
    .catch((error) => {
      dispatch(fetchPlaceDetailsFailed(error))
    })
}
