import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { purple, white } from '../utils/colors'
import ListView from './ListView'

export default class NewDeckView extends React.Component {
  state = {
    input: '',
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  handleSubmit = () => {
    if (this.state.input !== '') {
      AsyncStorage.mergeItem('decks', JSON.stringify({
        [this.state.input]: {title: this.state.input, questions: []}
      }))
      this.props.navigation.navigate('ListView')
    }
  }



  render () {
    const { input } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          value={input}
          style={styles.input}
          defaultValue='New Deck'
          onChangeText={this.handleTextChange}
        />
        <TouchableNativeFeedback
          onPress={() => this.handleSubmit()} >
          <View style={[styles.btn, styles.invertedBtn]}>
            <Text>Submit</Text>
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
    fontSize: 24,
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
    borderWidth: 2,
  },
  invertedBtn: {
    borderColor: purple,
  }
})
