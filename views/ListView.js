import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableNativeFeedback } from 'react-native'
import { purple, white } from '../utils/colors'
import DeckView from './DeckView'

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const decksData = Object.values(decks)

export default class ListView extends React.Component {
  renderItem = ({ item }) => {
    return (
     <TouchableNativeFeedback
       onPress={() => this.props.navigation.navigate('Deck', { deck: item })}>
       <View style={styles.item}>
         <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.number}>{`${item.questions.length} Cards`}</Text>
       </View>
     </TouchableNativeFeedback>
   )
 }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={decksData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
  },
  item: {
    backgroundColor: white,
    borderBottomColor: purple,
    borderBottomWidth: 2,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  number: {
    color: 'rgba(0,0,0,0.54)',
  },
})
