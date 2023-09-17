// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM} from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case MOVE_CLOCKWISE:
      const clock_Wise_Count = state === 5 ? 0 : state + 1
      return clock_Wise_Count

    case MOVE_COUNTERCLOCKWISE:
      const counter_Wise_Count = state === 0 ? 5 : state - 1
      return counter_Wise_Count

    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case SET_QUIZ_INTO_STATE:
      const quizInformation = action.payload
      return quizInformation
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
   switch(action.type){
    case SET_SELECTED_ANSWER:
      const setAnswer = action.payload
      return setAnswer
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
 switch(action.type){
  case SET_INFO_MESSAGE:
    const setMessage = action.payload
    return setMessage
  default:
    return state
 }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.id] : action.payload.value
      }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
