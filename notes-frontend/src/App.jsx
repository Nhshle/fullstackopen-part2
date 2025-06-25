import { useEffect, useState } from "react"
import Note from "./components/Note"
import NotesForm from "./components/NotesForm"
import noteServices from "./services/note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState({
    successMsg: null,
    errorMsg: null
  })

  useEffect(() => {
    noteServices.getAll()
    .then(initialNote => setNotes(initialNote))
  }, [])

if (!notes) { 
    return null 
  }

const handleNoteChange = (e) => {
  setNewNote(e.target.value)
}

const addNote = (e) => {
  e.preventDefault()

  if (newNote === '') {
    setMessage({
      successMsg: null,
      errorMsg: `Write Some Notes First!`
    })
    setTimeout(() => {
      setMessage({errorMsg: null, successMsg: null})
    }, 5000)
    return
  }

  const noteObject = {
    id: String(notes.length + 1),
    content: newNote,
    important: Math.random() > 0.5
  }
  noteServices.create(noteObject)
  .then(returnedNote => {
    setMessage({
      successMsg: `Note Added Successfully.`,
      errorMsg: null
    })
    setTimeout(() => {
      setMessage({errorMsg: null, successMsg: null})
    }, 5000)
    setNotes(notes.concat(returnedNote))
    setNewNote('')
  })
  .catch (() => {
    setMessage({
      successMsg: null,
      errorMsg: `Error adding note to the server!`
    })
    setTimeout(() => {
      setMessage({errorMsg: null, successMsg: null})
    }, 5000)
  })
}

const deleteNote = (id) => {
  if (window.confirm(`Sure To Delete This Note ?`)){
    noteServices.delete(id)
    .then(() => {
      setMessage({
        successMsg: `Note deleted successfully.`,
        errorMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
    .catch(() => {
      setMessage({
        errorMsg: `This note is already removed from the server!`,
        successMsg: null
      })
      setTimeout(() => {
        setMessage({successMsg: null, errorMsg: null})
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
}

const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(() => {
        setMessage({
        successMsg: null,
        errorMsg: `This note is already removed from the server!`
        })
        setTimeout(() => {
          setMessage({errorMsg: null, successMsg: null})
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification messages={message}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important': 'all'}</button>
      </div>
      <br />
      <NotesForm addNote={addNote} newNote={newNote} onNoteChange={handleNoteChange}/>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            onDelete={() => deleteNote(note.id)}
            />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App