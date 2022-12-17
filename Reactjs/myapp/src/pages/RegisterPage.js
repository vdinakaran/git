import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { RegisterApi } from "../services/Api";
import "./RegisterPage.css";
export default function RegisterPage() {
  const initialStateErrors = {
    firstname: { required: false, regEx: false },
    lastname: { required: false, regEx: false },
    coursename: { required: false },
    rolename: { required: false },
    email: { required: false, regEx: false },
    password: { required: false, regEx: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = initialStateErrors;
    let hasError = false;

    let regex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
    let name_regex = /^[a-zA-Z]+$/;
    let password_regex = new RegExp(
      "^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20})$"
    );

    if (inputs.firstname == "") {
      errors.firstname.required = true;
      hasError = true;
    } else if (!inputs.firstname.match(name_regex)) {
      errors.firstname.regEx = true;
      hasError = true;
    }

    if (inputs.lastname == "") {
      errors.lastname.required = true;
      hasError = true;
    } else if (!inputs.lastname.match(name_regex)) {
      errors.lastname.regEx = true;
      hasError = true;
    }

    if (inputs.coursename == "") {
      errors.coursename.required = true;
      hasError = true;
    }
    if (inputs.rolename == "") {
      errors.rolename.required = true;
      hasError = true;
    }

    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    } else if (!inputs.email.match(regex)) {
      errors.email.regEx = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    } else if (!inputs.password.match(password_regex)) {
      errors.password.regEx = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);

      RegisterApi(inputs)
        .then((response) => {
          //storeUserData(response.status);
          console.log(response);

          alert("user added successfully");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.data.msg != null) {
            setErrors({
              ...errors,
              custom_error: "Already this email has been registered",
            });
          }
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    coursename: "",
    rolename: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Navbar />

      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center">Register Now</h2>

              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInput}
                    name="firstname"
                    id=""
                  />
                  {errors.firstname.required ? (
                    <span className="text-danger">
                      First Name is required and should not be empty
                    </span>
                  ) : errors.firstname.regEx ? (
                    <span className="text-danger">
                      First Name should contains only alphabets
                    </span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInput}
                    name="lastname"
                    id=""
                  />
                  {errors.lastname.required ? (
                    <span className="text-danger">
                      Last Name is required and should not be empty
                    </span>
                  ) : errors.lastname.regEx ? (
                    <span className="text-danger">
                      Last Name should contains only alphabets
                    </span>
                  ) : null}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Course Name
                  </label>
                  <br></br>
                  <select
                    name="coursename"
                    className="form-control"
                    //value={""}
                    id="coursenames"
                    onChange={handleInput}
                  >
                    <option value="">--Select option--</option>
                    <option value="IT">IT</option> 
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="Civil">Civil</option>
                    <option value="Mech">Mech</option>
                  </select>

                  {errors.coursename.required ? (
                    <span className="text-danger">Course Name is required</span>
                  ) : null}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInput}
                    name="email"
                    id=""
                  />
                  {errors.email.required ? (
                    <span className="text-danger">
                      Email is required and should not be empty
                    </span>
                  ) : errors.email.regEx ? (
                    <span className="text-danger">Email not valid</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleRole"
                    className="text-uppercase"
                    name="rolename"
                    //onChange={handleInput}
                  >
                    Role Name
                  </label>
                  <br></br>
                  <input
                    type="radio"
                    name="rolename"
                    value="admin"
                    onChange={handleInput}
                  />
                  Admin &nbsp;&nbsp;
                  <input
                    type="radio"
                    name="rolename"
                    value="student"
                    onChange={handleInput}
                  />
                  Student
                  <br></br>
                  {errors.rolename.required ? (
                    <span className="text-danger">Role Name is required</span>
                  ) : null}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    onChange={handleInput}
                    type="password"
                    name="password"
                    id=""
                  />
                  {errors.password.required ? (
                    <span className="text-danger">
                      Password is required and should not be empty
                    </span>
                  ) : errors.password.regEx ? (
                    <span className="text-danger">Password not valid</span>
                  ) : null}
                </div>

                <div className="form-group">
                  <span className="text-danger">
                    {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                  </span>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Register"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have account ? Please <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
