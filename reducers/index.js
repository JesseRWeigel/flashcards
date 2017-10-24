import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function getDecks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
    case ADD_DECK:
    case ADD_CARD:
      return { ...state, ...action.decks }

    default:
      return state
  }
}

export default getDecks
