import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'

export function Form(props) {
  const dispatch = useDispatch()
  const formValues = useSelector((state) => state.form)

  const isDisabled = Object.keys(formValues).filter(each => formValues[each].trim().length >= 2).length === 3 ? false : true

  const onChange = evt => {
    const { id, value } = evt.target
    dispatch(inputChange({ id: id, value: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const toPost = {question_text: formValues.newQuestion, true_answer_text: formValues.newTrueAnswer, false_answer_text: formValues.newFalseAnswer}
    dispatch(postQuiz(toPost))
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={(e) => onChange(e)} value={formValues.newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={(e) => onChange(e)} value={formValues.newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={(e) => onChange(e)} value={formValues.newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isDisabled} onSubmit={onSubmit}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
