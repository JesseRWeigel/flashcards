import * as API from '../utils/api'
export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const getDecks = (decks, actionType) => ({
  type: actionType,
  decks
})

export const fetchDecks = () => dispatch =>
  API.fetchDecks()
    .then(decks => dispatch(getDecks(decks, GET_DECKS)))

export const addDeck = data => dispatch =>
  API.addDeck(data)
    .then(decks => dispatch(getDecks(decks, ADD_DECK)))

export const addCard = (data, id) => dispatch =>
  API.addCard(data, id)
    .then(decks => dispatch(getDecks(decks, ADD_CARD)))
