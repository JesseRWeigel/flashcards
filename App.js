import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import ListView from './views/ListView'
import NewDeckView from './views/NewDeckView'
import DeckView from './views/DeckView'
import NewQuestionView from './views/NewQuestionView'
import QuizView from './views/QuizView'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, thunk))
)

function FlashcardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator(
  {
    ListView: {
      screen: ListView,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    NewDeckView: {
      screen: NewDeckView,
      navigationOptions: {
        tabBarLabel: 'New Deck'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 56,
        backgroundColor: purple,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: { screen: DeckView },
  NewQuestion: { screen: NewQuestionView },
  Quiz: { screen: QuizView }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render () {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardsStatusBar
            backgroundColor={purple}
            barStyle='light-content'
          />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
