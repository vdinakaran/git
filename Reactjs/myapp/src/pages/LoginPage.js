import "./LoginPage.css";
import { useState } from "react";
import { LoginApi } from "../services/Api";
import StudentList from "./StudentList";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function LoginPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    rolename: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }
    if (inputs.rolename == "") {
      errors.rolename.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      LoginApi(inputs)
        .then((response) => {
          console.log(response);
          //storeUserData(response.status);
          let a = response.data;
          alert(inputs.rolename + "  " + "logged successfully");
          //let a = response.data;
          console.log(a);
          // if (a == "logged successfully") {
          //   navigate("/dashboard");
          // }
          sessionStorage.setItem("email", inputs.email);
          sessionStorage.setItem("rolename", inputs.rolename);
          if (response.status == "200") {
            navigate("/dashboard");
            //navigate("/StudentList");
          }
        })
        .catch((err) => {
          if (err.response.data.msg == "email id not exists") {
            setErrors({
              ...errors,
              custom_error: "Email id is incorrect",
            });
          }
          if (err.response.data.msg == "password is incorrect") {
            setErrors({
              ...errors,
              custom_error: "password is incorrect",
            });
          }
          if (err.response.data.msg == "Incorrect role") {
            setErrors({
              ...errors,
              custom_error: "Incorrect role",
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
    email: "",
    password: "",
    rolename: "",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  //   if (isAuthenticated()) {
  //     return <Navigate to="/dashboard" />;
  //   }

  return (
    <div>
      <Navbar />
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Login Now</h2>
              <form onSubmit={handleSubmit} className="login-form" action="">
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
                    name="email"
                    onChange={handleInput}
                    id=""
                  />

                  {errors.email.required ? (
                    <span className="text-danger">Email is required.</span>
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
                    type="password"
                    name="password"
                    onChange={handleInput}
                    id=""
                  />

                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
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
                  <span className="text-danger">
                    {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                  </span>
                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    value="Login"
                    disabled={loading}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Create new account ? Please{" "}
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
