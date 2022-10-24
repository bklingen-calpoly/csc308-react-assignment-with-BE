import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Table from './Table'
import Form from './Form'

function MyApp () {
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchAll().then(result => {
      if (result) { setCharacters(result) }
    })
  }, [])

  async function fetchAll () {
    try {
      const response = await axios.get('http://localhost:5050/users')
      return response.data.users_list
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error)
      return false
    }
  }

  async function makePostCall (person) {
    try {
      const response = await axios.post('http://localhost:5050/users', person)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function makeDeleteCall (id) {
    try {
      const response = await axios.delete('http://localhost:5050/users/' + id)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  function removeOneCharacter (index) {
    makeDeleteCall(characters[index]._id).then(result => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        })
        setCharacters(updated)
      }
    })
  }

  function updateList (person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201) {
        setCharacters([...characters, result.data])
        navigate('/users-table')
      }
    })
  }

  return (
    // This is what we had before:
    // <div className='container'>
    //   <Table characterData={characters} removeCharacter={removeOneCharacter} />
    //   <Form handleSubmit={updateList} />
    // </div>
    <div className='container'>
        <nav>
          <ul>
            <li><Link to='/users-table'>List all</Link></li>
            <li><Link to='/form'>Insert one</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path='/'
            element={
              <h1>Choose your path!</h1>
            }
          />
          <Route
            path='/users-table'
            element={
              <Table characterData={characters} removeCharacter={removeOneCharacter} />
            }
          />
          <Route
            path='/form'
            element={
              <Form handleSubmit={updateList} />
            }
          />
        </Routes>
    </div>
  )
}

export default MyApp
