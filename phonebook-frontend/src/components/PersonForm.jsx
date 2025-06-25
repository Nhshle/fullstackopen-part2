const PersonForm = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="personform">
          Name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div className="personform">
          Number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm