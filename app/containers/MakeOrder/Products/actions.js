import products from '../../../assets/data/products.json'
import constants from '../../../constants'

const fakeFetch = () => new Promise(resolve => resolve(products))
const fetchProductsStart = () => ({
  type: constants.PRODUCTS_FETCH_START,
})
const fetchProductsSuccess = data => ({
  type: constants.PRODUCTS_FETCH_SUCCESS,
  data,
})
const fetchProductsFailed = error => ({
  type: constants.PRODUCTS_FETCH_FAILED,
  error,
})

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsStart())
  return fakeFetch()
    .then((result) => {
      dispatch(fetchProductsSuccess(result))
    })
    .catch((error) => {
      dispatch(fetchProductsFailed(error))
    })
}
