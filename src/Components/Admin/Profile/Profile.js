import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
import EditUserModal from '../EditUser/EditUserModal';
import AddUserModal from '../AddUser/AddUserModal';
function Profile() {
    const [users,setUsers] = useState([])   
    const [editUserId, setEditUserId] = useState(null);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false); 
    useEffect(() => {
        
        axios.get('http://localhost:5000/admin/fetchUsers')
          .then((response) => {
            const {usersData} = response.data
            setUsers(usersData)
            console.log(usersData)})
          .catch(error => console.error('Error fetching users:', error));
      }, []);
    
      const handleEdit = (userId) => {
        setEditUserId(userId);
        console.log(`Edit user with ID: ${userId}`);
        
      };
    
      const handleDelete = async (userId) => {
        
        console.log(`Delete user with ID: ${userId}`);
        const response = await axios.post(
          `http://localhost:5000/admin/deleteUser?userId=${userId}`,
          
        );
      };
      const openAddUserModal = () => {
        setAddUserModalOpen(true);
      }; 
    
      const closeAddUserModal = () => {
        setAddUserModalOpen(false);
      };
    
      return (
        <div>
          <h2>Users Information:</h2>
          <button onClick={openAddUserModal}>Add User</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(user._id)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddUserModal isOpen={addUserModalOpen} onClose={closeAddUserModal} />
          {editUserId && (
        <EditUserModal
          isOpen={true} 
          onClose={() => setEditUserId(null)}
          userId={editUserId}
        />
      )}
        </div>
      );
}

export default Profile