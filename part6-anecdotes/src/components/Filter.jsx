import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleFilter = (event) => {
    const filtered = event.target.value
    dispatch(filterChange(filtered))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleFilter} />
    </div>
  )
}

export default Filter