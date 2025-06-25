const Note = ({ note, toggleImportance, onDelete }) => {
  const label = note.important
    ? 'make not important' : 'make important'

    const style = {
    color: 'white',
    background: note.important ? '#342423' : '#795548',
  }

  return (
    <li>
      {note.content} <button onClick={toggleImportance} style={style}>{label}</button> <button onClick={onDelete} className="delete">Delete</button>
    </li>
  )
}

export default Note