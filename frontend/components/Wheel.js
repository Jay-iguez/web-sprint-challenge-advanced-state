import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

export default function Wheel(props) {
 /** <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>*/
{/* --i is a custom CSS property, no need to touch that nor the style object */}

  const dispatch = useDispatch()
  const activeCog = useSelector((state) => state.wheel)

  const cogAmountMap = Array(6).fill(0)

  return (
    <div id="wrapper">
      <div id="wheel">
        {
          cogAmountMap.map((element, index) => {
            return (
              <div key={index} className={`cog ${index === activeCog ? "active" : ''}`} style={{ "--i": index }}>{index === activeCog ? 'B' : ''}</div>
            )
          })
        }
        
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => dispatch(moveCounterClockwise())}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => dispatch(moveClockwise())}>Clockwise</button>
      </div>
    </div>
  )
}
