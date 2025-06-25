const Filter = ({filter, onSearchChange}) => {
  return (
    <div>
        Filter Shown With: <input value={filter} onChange={onSearchChange}/>
      </div>
  )
}

export default Filter