const Header = ({course}) => {
  return (<h1>{course}</h1>)
}
const Part = ({part_name, exercises}) => {
  return (<p>{part_name} {exercises}</p>)
}
const Content = ({parts}) => {
  return (
      <Part part_name={parts.name} exercises={parts.exercises}/>
      )
}
const Total = ({part1, part2, part3}) => {
  return (
     <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course}/>
      <Content parts = {part1}/>
      <Content parts = {part2}/>
      <Content parts = {part3}/>
      <Total part1 = {part1} part2 = {part2} part3 = {part3}/>
    </div>  
  )
}

export default App
