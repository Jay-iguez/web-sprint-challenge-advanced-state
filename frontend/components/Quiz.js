import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

export default function Quiz() {
  {/**
<div className="answer selected">
                {quizState.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                {quizState.answers[1].text}
                <button>
                  Select
                </button>
              </div>
*/}
  const dispatch = useDispatch()
  const quizState = useSelector((state) => state.quiz)
  const selectedAnswer = useSelector((state) => state.selectedAnswer)

  useEffect(() => {
    if (quizState === null) {
      dispatch(fetchQuiz())
    } else return
  }, [quizState])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quizState !== null ? (
          <>
            <h2>{quizState.question}</h2>

            <div id="quizAnswers">
              {
                quizState.answers.map((answer, index) => {
                  return (
                    <div key={index} className={`answer ${answer.answer_id === selectedAnswer ? "selected" : ''}`}>
                      {answer.text}
                      <button onClick={() => dispatch(selectAnswer(answer.answer_id))}>
                        {answer.answer_id === selectedAnswer ? 'SELECTED' : 'Select'}
                      </button>
                    </div>
                  )
                })
              }
            </div>

            <button id="submitAnswerBtn" disabled={selectedAnswer === null} onClick={() => dispatch(postAnswer({quiz_id: quizState.quiz_id, answer_id: selectedAnswer}))}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
