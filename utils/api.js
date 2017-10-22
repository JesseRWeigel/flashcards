import { AsyncStorage } from 'react-native'

export const fetchDecks = () =>
  AsyncStorage.getItem('decks')
  .then(data => JSON.parse(data))

export const  addDeck = (newDeck) =>
  AsyncStorage.mergeItem(
    'decks',
    JSON.stringify(newDeck)
  ).then(data => JSON.parse(data))

export const  addCard = () => {
  console.log('addCard')
}
