import constants from '../constants'

const initialState = {
  items: null,
  isFetching: false,
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case constants.PRODUCTS_FETCH_START:
      return {
        ...state,
        isFetching: true,
      }
    case constants.PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.data,
      }
    case constants.PRODUCTS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
