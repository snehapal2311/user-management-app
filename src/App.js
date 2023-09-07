import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {
  //state to store the list  of users and error messages
  const [users, setUsers] = useState([]);
  const [error, setError] = useState([null]);//initialize error as null

  useEffect(() => {
    //fetch user data from an API
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch user data. Please try again later.');
        console.error(error);
      });
  }, []);

  const handleCreateUser = (user) => {
    //create new user and update the state
    axios.post("https://jsonplaceholder.typicode.com/users", user)
      .then((response) => {
        setUsers([...users, response.data]);
      })
      .catch((error) => {
        setError('Failed to create a user. Please try again.');
        console.error(error);
      });
  };

  const handleEditUser = (id, user) => {
    //edit an existing user and update the state
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
      .then((response) => {
        setUsers(users.map((u) => u.id === id ? response.data : u));
      })
      .catch((error) => {
        setError('Failed to edit the user. Please try again.');
        console.error(error);
      });
  };

  const handleDeleteUser = (id) => {
    //delete the exisiting user and update the state
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUsers(users.filter((u) => u.id !== id));
      })
      .catch((error) => {
        setError('Failed to edit the user. Please try again.');
        console.error(error);
      });
  }
  
  return (
    <div className='UserDisplay'>
      <div className="heading">
        <h1>User List</h1>
      </div>
      {error && <p className='error'>{error}</p>}

      <div className="table">
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
             {/* User data goes here */}
            {users.map((user) =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button id='edit' onClick={() =>
                    handleEditUser(user.id, user)}>Edit</button>
                </td>
                <td>
                  <button id='delete' onClick={() =>
                    handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>)}
          </tbody>
        </table>

      </div>
     

      <div className="submitform">
        <div className="form-details">
          <h1>Submission Form</h1>
          {error && <p className='error'>{error}</p>}
        <form onSubmit={(e) => handleCreateUser(e.target.elements.name.value)}>
          <input name="name" placeholder="Name" />
          <input name="email" placeholder="Email" />
          <input name="phone" placeholder="Phone" />
          <button type="submit">Create User</button>
        </form>
        </div>   
      </div>

    </div>
  )
}



export default App


