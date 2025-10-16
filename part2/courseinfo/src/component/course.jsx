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

export default Course