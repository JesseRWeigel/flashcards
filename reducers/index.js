import {
  GET_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions'

// function makeObj (items) {
//   const newObj = {}
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i]
//     const itemId = item.id
//     newObj[itemId] = item
//   }
//   return newObj
// }

function fetchDecks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
    case ADD_DECK:
    case ADD_CARD:
      return { ...state, ...action.decks }

    default:
      return state
  }
}


export default fetchDecks
