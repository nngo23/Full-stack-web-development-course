const Header = ({course}) => {
  return (<h1>{course}</h1>)
}
const Part = ({part_name, exercises}) => {
  return (<p>{part_name} {exercises}</p>)
}
const Content = ({parts}) => {
  return (
  <div>
    <Part part_name={parts[0].name} exercises={parts[0].exercises}/>
    <Part part_name={parts[1].name} exercises={parts[1].exercises}/>
    <Part part_name={parts[2].name} exercises={parts[2].exercises}/>
  </div>
  )
}
const Total = ({parts}) => {
  return (
  <div>
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises} </p>
  </div> 
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts}/>
      <Total parts = {parts}/>
    </div>  
  )
}

export default App
