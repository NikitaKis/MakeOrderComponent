import { combineReducers } from 'redux'
import places from './places'
import products from './products'

const rootReducer = combineReducers({
  places,
  products,
})

export default rootReducer
