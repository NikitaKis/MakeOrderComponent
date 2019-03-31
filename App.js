/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
import rootReducer from './app/reducers'
import MakeOrder from './app/containers/MakeOrder'
import colors from './app/colors'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer)

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <MakeOrder />
    </View>
  </Provider>
)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 58,
    alignItems: 'center',
    backgroundColor: colors.main,
  },
})
