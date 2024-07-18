import { useState } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";

function AddUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);

    // make the POST request to the backend server
    axios
      .post("http://localhost:8080/api/v1/createuser", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response != null && response.status === 200) {
          alert("User added successfully!");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNo("");
        } else {
          alert("Failed to add user. Please try again.");
        }
      })
      .catch((e) => {
        alert("Failed to add user. Please try again.");
        console.log(e);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2>Add New User</h2>
        <div className="shadow-lg p-3 mt-5 mb-5 bg-body-tertiary rounded">
          <form onSubmit={handleFormSubmit}>
            {" "}
            {/* pass the event `e` to handleFormSubmit */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fname" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="fname"
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="lname" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lname"
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)} // corrected typo from setLastname to setLastName
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone No.
              </label>
              <input
                type="text"
                name="phoneNo"
                id="phone"
                onChange={(e) => setPhoneNo(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-outline-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
