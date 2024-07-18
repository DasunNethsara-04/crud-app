import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

function ShowUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/getusers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, []);

  const makeDeleteRequest = (userId) => {
    console.log(userId);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>All Users</h2>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={"/user"} className="btn btn-outline-primary">
                      <i className="fa-regular fa-user"></i>
                    </Link>
                    &nbsp;
                    <Link
                      to={`/edituser/${user.id}`}
                      className="btn btn-outline-warning"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Link>
                    &nbsp;
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => makeDeleteRequest(user.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowUsers;
