import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native'
import { purple } from '../utils/colors'
import { connect } from 'react-redux'
import { addCard } from '../actions'

class NewQuestionView extends React.Component {
  state = {
    question: 'Enter Question',
    answer: 'Enter Answer'
  }

  handleQuestionChange = input => {
    this.setState(() => ({
      question: input
    }))
  }

  handleAnswerChange = input => {
    this.setState(() => ({
      answer: input
    }))
  }

  handleSubmit = () => {
    const { deck } = this.props.navigation.state.params

    if (this.state.question !== '' || this.state.answer !== '') {
      const theseQuestions = deck.questions.length > 0 ? deck.questions : {}

      const updatedDeck = {
        [deck.title]: {
          title: deck.title,
          questions: [
            {
              question: this.state.question,
              answer: this.state.answer
            },
            ...theseQuestions
          ]
        }
      }
      // console.log(updatedDeck)
      this.props.dispatch(addCard(updatedDeck))

    }
  }

  render () {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Add a new card!</Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={this.handleQuestionChange}
        />
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={this.handleAnswerChange}
        />
        <TouchableNativeFeedback onPress={() => this.handleSubmit()}>
          <View style={[styles.btn, styles.invertedBtn]}>
            <Text>Add to Deck</Text>
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
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
    fontSize: 24
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    margin: 50
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
  }
})

export default connect()(NewQuestionView)
