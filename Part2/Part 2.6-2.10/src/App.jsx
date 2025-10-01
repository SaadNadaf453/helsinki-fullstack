import { useState } from "react";
const Filter = (props) =>{

  const handleSearch=(event) =>{
    setNewSearch(event.target.value)
    
  }

  const filteredPersons = props.persons.filter((person)=>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return(
    <div>Filter show with <input value={props.value} onChange={props.onChange}/></div>
  )
}
const App = () =>{
  const [persons,setPersons] = useState([
    {
      name:'Arto Hellas',
      number: "040-1234567"
    }
  ])

  const [newName,setNewName] = useState('')
  const [newPhone,setNewPhone] = useState('')
  const [newSearch,setNewSearch] = useState('')

  const handleNameChange = (event) =>{
    // event.preventDefault();
    setNewName(event.target.value)
  }
  const handleNumberChange =(event) =>{
    setNewPhone(event.target.value)
  }

  const handleSearch=(event) =>{
    setNewSearch(event.target.value)
    
  }



  const addData =(event) =>{
    event.preventDefault()
    
    const nameExists = persons.some(person => person.name === newName);
    const numberExists = persons.some(person => person.number == newPhone);
    if(nameExists || numberExists)
    {
      alert(`${newName} ${newPhone}is already added to phonebook`);
      return;
    }
    const dataObject ={
      name:newName,
      number:newPhone
    }
    setPersons(persons.concat(dataObject))
    setNewName('')
    setNewPhone('')

  }

  const filteredPersons = persons.filter((person)=>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  return(
    <div>
      <h2>PhoneBook</h2>
      <Filter persons={persons} value={newSearch} onChange={handleSearch}/>
      <h3>Add a New</h3>
      <form onSubmit={addData}>
        <div>
          Name : <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number : {" "}<input value={newPhone} onChange={handleNumberChange} type="number"/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
        }
      </div>
    </div>
  )
}

export default App