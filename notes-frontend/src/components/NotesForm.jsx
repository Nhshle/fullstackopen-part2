const NotesForm = ({addNote, newNote, onNoteChange}) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={onNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NotesForm