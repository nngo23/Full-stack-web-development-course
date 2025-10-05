import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Total = ({}) => <div>all {good + neutral + bad}</div>
  const Average = ({}) => <div>average {(good*1 + neutral*0 + bad*(-1))/(good+neutral+bad)}</div>
  const Positive = ({}) => <div> positive {(good*100)/(good+neutral+bad)} %</div>
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>

      <h2>statistics</h2>
      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        <Total /> 
        <Average />
        <Positive />
      </p>
    </div>
  )
}

export default App