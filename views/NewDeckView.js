import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class NewDeckView extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>New Deck</Text>
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
  }
})
