const Persons = ({persons, onDelete}) => {
  return (
    <div>
      <ul>
        {persons.map(person => 
        <li key={person.id}>{person.name} - {person.number} <button className="delete" onClick={() => onDelete(person.id)}>Delete</button></li>
        )}
      </ul>
    </div>
  )
}

export default Persons