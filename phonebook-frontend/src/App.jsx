import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import personServices from './services/phonebook'
import Footer from './components/Footer'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    errorMsg: null,
    successMsg: null
  })

useEffect(() => {
  personServices.getAll()
  .then(initialPerson => {
    setPersons(initialPerson)
  })
}, [])

if (!persons) {
  return null
}

  const handleNameChagne = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  
  const addPerson = (e) => {
    e.preventDefault()
    
    if (newName === '' || newNumber === ''){
      setMessage({
        errorMsg: `Both Name and Number should be written!`,
        successMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000)
      return
    }

    const personExists = persons.find(person => person.name === newName)
    
    if (personExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        updatePerson(personExists.id, {...personExists, number: newNumber})
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    personServices.create(personObject)
    .then(returnedPerson => {
      setMessage({
        successMsg: `${newName} added successfully.`,
        errorMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

    const updatePerson = (id, updatedPerson) => {
    personServices.update(id, updatedPerson)
    .then(returnedPerson => {
      setMessage({
        successMsg: `${newName}'s number has been updated successfully.`,
        errorMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000);
      setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
    })
    .catch(() => {
      setMessage({
        errorMsg: `The person "${updatedPerson.name}" was already removed from the server!`,
        successMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
    setPersons(persons.filter((p) => p.id !== id))
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (person && window.confirm(`Sure To Delete ${person.name}`)){
      personServices.delete(id)
    .then(() => {
      setMessage({
        successMsg: `${person.name} deleted successfully.`,
        errorMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch(() => {
      setMessage({
        errorMsg: `${person.name} is already removed from the server!`,
        successMsg: null
      })
      setTimeout(() => {
        setMessage({errorMsg: null, successMsg: null})
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
    }
  }

  const handleSearchFilter = (e) => {
    setFilter(e.target.value)
  }

  const searchFilter = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook Application</h1>
      <Notification
        messages={message}
        />
      <Filter
        filter={filter} 
        onSearchChange={handleSearchFilter}
        />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChagne}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h1>Numbers</h1>
      <Persons
        persons={searchFilter}
        onDelete={deletePerson}
        />
      <Footer />
    </div>
  )
}

export default App