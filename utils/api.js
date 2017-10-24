import { AsyncStorage } from 'react-native'

export const fetchDecks = () =>
  AsyncStorage.getItem('decks').then(data => JSON.parse(data))

export const addDeck = newDeck =>
  AsyncStorage.mergeItem('decks', JSON.stringify(newDeck)).then(data => newDeck)

export const addCard = deck =>
  AsyncStorage.mergeItem('decks', JSON.stringify(deck)).then(data => deck)
