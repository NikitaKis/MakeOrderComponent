import constants from '../constants'

const initialState = {
  details: null,
  isFetching: false,
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case constants.PLACE_DETAILS_FETCH_START:
      return {
        ...state,
        isFetching: true,
      }
    case constants.PLACE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        details: action.data,
      }
    case constants.PLACE_DETAILS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
