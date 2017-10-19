import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'flashcards'

export function getDecks () {
  const data = await AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return result
    }
  })
}

export function getDeck ( id ) {
  const data =  await AsyncStorage.getItem(STORAGE_KEY.id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return result
    }
  })
}

export function saveDeckTitle ( title ) {
  let newDeck = {title: {'title': title}}
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDeck))
  } catch (error) {
    // Error saving data
  }
}

export function addCardToDeck ( title, card ) {
  let newCard = {questions: [card]}
  try {
    await AsyncStorage.mergeItem(STORAGE_KEY.title, JSON.stringify(newCard))
  } catch (error) {
    // Error saving data
  }
}
