import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  // get the userId from the URL
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // make a GET request to get all the user details from the user id
    axios
      .get(`http://localhost:8080/api/v1/user/${userId}`)
      .then((response) => {
        if (response.data != null) {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhoneNo(response.data.phoneNo);
        } else {
          alert("user not found in the database");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);

    // make a PUT request to update the user details in the database
    axios
      .put("http://localhost:8080/api/v1/updateuser", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("User Details updated successfully!");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNo("");
          navigate("/users");
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2>Edit User</h2>
        <div className="shadow-lg p-3 mt-5 mb-5 bg-body-tertiary rounded">
          <form onSubmit={handleFormSubmit}>
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
                    value={firstName ? firstName : ""}
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
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName ? lastName : ""}
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
                value={phoneNo ? phoneNo : ""}
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
                value={email ? email : ""}
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

export default EditUser;
