import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions'

class DeckView extends React.Component {
  componentWillMount () {
    this.props.fetchData()
  }
  handleNavigation = (view, deck) => {
    this.props.navigation.navigate(view, { deck: deck })
  }
  noQuestions = () => {
    // TODO: Give user feedback that cards need to be added before taking a quiz.
    console.log('add a question first')
  }
  render () {
    const deckTitle = this.props.navigation.state.params.deckTitle
    const deck = this.props.decks[deckTitle]
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.number}>{`${deck.questions.length} Cards`}</Text>
        <TouchableNativeFeedback
          onPress={() => this.handleNavigation('NewQuestion', deck)}
        >
          <View style={[styles.btn, styles.invertedBtn]}>
            <Text style={styles.btnText}>Add Card</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={
            deck.questions.length > 0
              ? () => this.handleNavigation('Quiz', deck)
              : this.noQuestions
          }
        >
          <View style={[styles.btn, styles.invertedBtn]}>
            <Text style={styles.btnText}>Start Quiz</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40
  },
  number: {
    color: 'rgba(0,0,0,0.54)'
  },
  btn: {
    padding: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
    borderRadius: 2,
    borderWidth: 2
  },
  invertedBtn: {
    borderColor: purple
  },
  btnText: {
    fontSize: 20
  }
})

const mapStateToProps = state => ({
  decks: state
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: () => dispatch(fetchDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
