// import React, { useState, useEffect } from "react";
// import "./UserProfile.css";

// const UserProfile = () => {
//   const [userApi, setUserApi] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const url = "https://jsonplaceholder.typicode.com/users";
//       const response = await fetch(url, { method: "GET" });
//       const json = await response.json();
//       setUserApi(json);
//     };

//     fetchUserData();
//   }, []);
//   return (
//     <div>
//       <h1>User Profiles</h1>
//       {userApi.length > 0 ? (
//         <ul>
//           {userApi.map((user) => (
//             <li key={user.id} className="eachUserCard">
//               <div>
//                 <h4>userName: {user.name}</h4>
//                 <p>Name: {user.username}</p>
//                 <p>email: {user.email}</p>
//                 <p>city:{user.address.city}</p>
//                 <p>phone: {user.phone}</p>
//                 <p>website: {user.website}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [userApi, setUserApi] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    city: "",
    phone: "",
    website: "",
    company: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      const response = await fetch(url, { method: "GET" });
      const json = await response.json();
      setUserApi(json);
    };

    fetchUserData();
  }, []);

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditedUser({
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
    });
  };

  const handleDeleteClick = (userId) => {
    setUserApi(userApi.filter((user) => user.id !== userId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveClick = () => {
    setUserApi(
      userApi.map((user) =>
        user.id === editUserId
          ? {
              ...user,
              ...editedUser,
              address: {
                ...user.address,
                street: editedUser.street,
                city: editedUser.city,
              },
              company: { ...user.company, name: editedUser.company },
            }
          : user
      )
    );
    setEditUserId(null);
    setEditedUser({
      name: "",
      username: "",
      email: "",
      street: "",
      city: "",
      phone: "",
      website: "",
      company: "",
    });
  };

  return (
    <div>
      <h1>User Profiles</h1>
      {userApi.length > 0 ? (
        <ul className="overall-user-container">
          {userApi.map((user) => (
            <li key={user.id} className="eachUserCard">
              <div className="user-content">
                <h4>Name: {user.name}</h4>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Street: {user.address.street}</p>
                <p>City: {user.address.city}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
                <p>Company: {user.company.name}</p>
                <div className="btn-container">
                    <button onClick={() => handleEditClick(user)} className= "btn">Edit</button>
                    <button onClick={() => handleDeleteClick(user.id)} className= "btn">
                    Delete
                    </button>
                </div>
              </div>
              {editUserId === user.id && (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="street"
                    value={editedUser.street}
                    onChange={handleInputChange}
                    placeholder="Street"
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedUser.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="website"
                    value={editedUser.website}
                    onChange={handleInputChange}
                    placeholder="Website"
                  />
                  <input
                    type="text"
                    name="company"
                    value={editedUser.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                  />
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
