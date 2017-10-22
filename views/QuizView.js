import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { purple, white, yellow } from '../utils/colors'

export default class QuizView extends React.Component {
  state = {
    showAnswer: false,
    displayQuestion: 0,
    numberCorrect: 0,
  }

  handleClick = () => {
    this.setState({showAnswer: !this.state.showAnswer})
  }

  correctAnswer = () => {
    this.setState({numberCorrect: this.state.numberCorrect + 1})
    this.nextQuestion()
  }

  nextQuestion = () => {
    this.setState({displayQuestion: this.state.displayQuestion + 1})
  }

  render () {
    const { deck } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        {this.state.displayQuestion + 1 <= deck.questions.length &&
          <View style={styles.questionCount}>
            <Text>{this.state.displayQuestion + 1}/{deck.questions.length}</Text>
          </View>
        }


        <View style={styles.container}>

          { deck.questions.length <= this.state.displayQuestion ?
            <View>
              <Text style={styles.title}>Your Score:</Text>
              <Text style={styles.title}>{`${(this.state.numberCorrect / deck.questions.length) * 100}%`}</Text>

            </View>
            :

            deck.questions.filter((question, i) => i === this.state.displayQuestion)
            .map(question =>
              <View key={question.question}>
                {!this.state.showAnswer ?
                  <View>
                    <Text style={styles.title}>{question.question}</Text>
                    <TouchableNativeFeedback
                      onPress={() => this.handleClick()} >
                      <View>
                        <Text>Answer</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>

                            :
                  <View>
                    <Text style={styles.title}>{question.answer}</Text>
                    <TouchableNativeFeedback
                      onPress={() => this.handleClick()} >
                      <View>
                        <Text>Question</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                }



                <TouchableNativeFeedback
                  onPress={() => this.correctAnswer()}>
                  <View style={[styles.btn, styles.invertedBtn]}>
                    <Text>Correct</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => this.nextQuestion()}>
                  <View style={[styles.btn, styles.invertedBtn]}>
                    <Text>Incorrect</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            )
          }

        </View>
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
  questionCount: {
    flex: -1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 20,
  },
  number: {
    color: 'rgba(0,0,0,0.54)',
  },
  btn: {
    padding: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 16,
    borderRadius: 2,
    borderWidth: 2,
  },
  invertedBtn: {
    borderColor: purple,
  }
})
