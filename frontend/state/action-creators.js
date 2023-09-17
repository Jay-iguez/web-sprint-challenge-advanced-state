import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM} from "./action-types"
import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { return {type: MOVE_CLOCKWISE}}

export function moveCounterClockwise() { return {type: MOVE_COUNTERCLOCKWISE} }

export function selectAnswer(id) { return {type: SET_SELECTED_ANSWER, payload: id}}

export function setMessage(message) { return {type: SET_INFO_MESSAGE, payload: message} }

export function setQuiz(quiz) { return {type: SET_QUIZ_INTO_STATE, payload: quiz}}

export function inputChange(inputValues) { return {type: INPUT_CHANGE, payload: inputValues} }

export function resetForm() { return {type: RESET_FORM}}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch(setQuiz(res.data))
    })
    .catch(err => console.error(err))
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    dispatch(selectAnswer(null))
    dispatch(setQuiz(null))
    axios.post('http://localhost:9000/api/quiz/answer', answer)
    .then(res => {
      dispatch(setMessage(res.data.message))
    })
    .catch(err => console.error(err))
  }
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', newQuiz)
    .then(res => {
      dispatch(resetForm())
      dispatch(setMessage(`Congrats: "${newQuiz.question_text}" is a great question!`))
      
    })
    .catch(err => console.error(err))
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
