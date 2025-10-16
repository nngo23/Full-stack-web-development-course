const Header = ({course}) => {
  return (<h1>{course.name}</h1>)
}
const Part = ({part_name, exercises}) => {
  return (<p>{part_name} {exercises}</p>)
}
const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part => (
        <Part key={part.id} part_name={part.name} exercises={part.exercises}/>
      ))}
    </div>
  )
}

const Total = ({course}) => {
  return (
     <p><strong>Total of {course.parts.reduce((sum,part) => sum+part.exercises,0)} exercises </strong></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>
    </div>
  )

}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
