import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import phoneService from './services/phones'


const App = () =>{
  const [phones,setPhones] = useState([])
  const [newPhone,setNewPhone] = useState('')
  const [newName,setNewName] = useState('')
  const [newSearch,setNewSearch] = useState('')
  const [showAll,setShowAll] = useState(true)

  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }  

  const handlePhoneChange = (event) =>{
    setNewPhone(event.target.value);
  }  

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value);
  }
  

  useEffect(()=>{
    console.log('effect')
    phoneService
      .getAll()
      .then(initialPhones =>{
        console.log('promise fulfilled')
        setPhones(initialPhones)
      })
  },[]);
  console.log('render',phones.length,'notes');

  const addPhoneDetails = (event)=>{
    event.preventDefault();

    const NameExist = phones.some((phone)=>phone.name === newName)
    const PhoneExist = phones.some((phone)=>phone.number === newPhone)

    if(NameExist || PhoneExist)
    {
      alert(`${newName} ${newPhone} Already in List`)
      return;
    }
    const dataObject ={
      name:newName,
      number:newPhone,
    }
    // setPhones(phones.concat(dataObject));
    // Post to backend
    phoneService.
    create(dataObject)
      .then(returnedPhone =>{
        setPhones(phones.concat(returnedPhone));
        setNewName('');
        setNewPhone('');
      })
    

  }

  const filteredPhone =phones.filter((phone)=>
    phone.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const deletePhoneDetail = id =>{
    console.log("Button Pressed"+id)
    const phone = phones.find(p=>p.id ==id);
    const value =confirm(`Delete ${phone.name} ?`)
    if(value===true)
    {
    phoneService
    .deletePhone(id)
    .then(() =>{
      setPhones(phones.filter(phone => phone.id != id));

    });
  }
  

  }

  return(
    <div>
      <form onSubmit={addPhoneDetails}>
      <div>
        Search : <input value={newSearch} onChange={handleSearchChange}/>
      </div>
      <h2>Add Details</h2>
      <div>
        Enter Name<input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        Enter Number <input value={newPhone} onChange={handlePhoneChange} type="number"/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
      <h2>Details</h2>
      <ol>
      {filteredPhone.map(phone =><li key={phone.id}>{phone.name} {phone.number}
        <button type="button" onClick={()=>deletePhoneDetail(phone.id)}>Delete</button>
      </li>)}
      </ol>
      </form>
    </div>
  )
}
export default App