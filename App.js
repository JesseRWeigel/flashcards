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
    screen: Tabs,
  },
  Deck: { screen: DeckView },
  NewQuestion: { screen: NewQuestionView },
  Quiz: { screen: QuizView }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render () {
    return (
      <View style={styles.container}>
        <FlashcardsStatusBar
          backgroundColor={purple}
          barStyle='light-content'
        />
        <MainNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
