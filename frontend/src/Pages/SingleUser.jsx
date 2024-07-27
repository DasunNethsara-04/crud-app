import React, { useEffect, useState } from "react";
import UserImage from '../assets/user.png';
import NavBar from "../Components/NavBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function SingleUser() {
  // get the user id from the URL
  const { userId } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  useEffect(() => {
    // make an GET request to the backend server to get the user details
    axios.get(`http://localhost:8080/api/v1/user/${userId}`).then(response => {
      if (response.status === 200 && response != null) {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhoneNo(response.data.phoneNo);
      } else {
        alert('User not found in the database');
        window.location.replace('/users'); // redirect to the users page if the user is not found in the database.
      }
    }).catch(err => {
      console.error(err);
      alert('Failed to retrieve user details. Please try again.');
      window.location.replace('/users'); // redirect to the users page if there is an error retrieving the user details.
    });
  }, []);
  return (
    <>
      <NavBar />
      <div className="container mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="row">
          <div className="col-sm-12 col-lg-4 vh-50">
            <div className="bg-body-tertiary rounded text-center">
              <img
                src={UserImage}
                className="img-fluid mt-5"
                alt="..."
                style={{ 'borderRadius': '50%' }}
                width="150"
              />
              <h3 className="form- mt-3">{firstName ? firstName : ""} {" "} {lastName ? lastName : ""}</h3>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8 vh-50">
            <div className="bg-body-tertiary rounded">
              <div className="row mt-5">
                <div className="col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">First name</label>
                    <input type="text"
                      className="form-control"
                      value={firstName ? firstName : ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email ? email : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName ? lastName : ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Phone No.</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNo ? phoneNo : ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <Link to={"/users"} className="btn btn-outline-dark">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleUser;
