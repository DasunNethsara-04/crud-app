import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";

function EditUser() {
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    //
  }, []);

  const handleFormSubmit = (e) => {
    //
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

export default EditUser;
