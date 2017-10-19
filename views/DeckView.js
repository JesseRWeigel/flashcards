import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { purple, white, yellow } from '../utils/colors'

export default class DeckView extends React.Component {
  render () {
    const { deck } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.number}>{`${deck.questions.length} Cards`}</Text>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('NewQuestion', { deck: deck })} >
          <View style={[styles.btn, styles.invertedBtn]}>
            <Text>Add Card</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('Quiz', { deck: deck })} >
          <View style={[styles.btn, styles.invertedBtn]}>
            <Text>Start Quiz</Text>
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
