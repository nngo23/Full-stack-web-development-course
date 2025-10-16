const Header = ({course}) => {
  return (<h2>{course.name}</h2>)
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

const Course = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <div key={course.id}>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
        </div>
      ))}
    </div>
  )

}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return <Course courses={courses} />
}

export default App
