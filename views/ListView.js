import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions'

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
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const decksData = Object.values(decks)

class ListView extends React.Component {
  componentWillMount = () => {
    this.props.fetchData()
    // AsyncStorage.getItem('decks', (err, result) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     this.setState({ decks: JSON.parse(result) })
    //   }
    // })
  }
  renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        key={item.title}
        onPress={() => this.props.navigation.navigate('Deck', { deck: item })}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.number}>{`${item.questions &&
            item.questions.length} Cards`}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decks ? Object.values(this.props.decks) : decksData}
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

    flexDirection: 'row'
  },
  item: {
    backgroundColor: white,
    borderBottomColor: purple,
    borderBottomWidth: 2,
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  },
  number: {
    color: 'rgba(0,0,0,0.54)'
  }
})

const mapStateToProps = state => ({
  decks: state.decks,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: () => dispatch(fetchDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
