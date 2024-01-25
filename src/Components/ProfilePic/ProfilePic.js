import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../Features/UserSlices";
import "./ProfilePic.css";



function ProfilePic() {  
  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {        
        return;
      }
     
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("userEmail", user.user.userEmail);
      console.log(user.accessToken) 
      const headers = {
        Authorization: `${user.accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      // Make the POST request to upload the file
      const response = await axios.post('http://localhost:5000/uploadImage',  
        formData,
        { headers }
      );
      console.log("File uploaded successfully", response.data);      
      setSelectedFile(null);
      const updatedUser = response.data.user;      
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.error("File upload error:", error);
    }
  };
  return (
    <div className="center-container">
      <div>
        <h3>Profile Details</h3>
        {user && (
          <div className="user-details">
            <img
              src={`http://localhost:5000/images/${user.user.userImage}`}
              alt="Profile"
              className="profile-image"
            />
            <p>Name: {user.user.name}</p>
            <p>Email: {user.user.userEmail}</p>
            <p>Phone: {user.user.userPhone}</p>
          </div>
        )}
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default ProfilePic;
