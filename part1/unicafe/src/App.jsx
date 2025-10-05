import { useState } from 'react'
const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Total = () => <tr> <td> all </td> <td>{good + neutral + bad}</td> </tr>
  const Average = () => <tr> <td> average </td> <td>{((good*1 + neutral*0 + bad*(-1))/(good+neutral+bad)).toFixed(1)}</td> </tr>
  const Positive = () => <tr> <td> positive </td> <td>{((good*100)/(good+neutral+bad)).toFixed(1)} % </td> </tr>
  
  const StatisticLine = ({text,value}) => <tr> <td>{text}</td> <td>{value}</td> </tr>

  const Statistics = ({}) => {
    return (
      <div>
        {good + neutral + bad === 0 ? (
          <div> No feedback given </div>
         ) : (
            <>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <Total /> 
              <Average />
              <Positive />
          </>
         )}
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h2>statistics</h2>
      <Statistics />
    </div>
  )
}

export default App