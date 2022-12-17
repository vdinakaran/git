import React, { Component, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StudentApi, StudentOneApi } from "../services/Api";

export default function Dashboard() {
  //let user = new User();
  const user = [];
  const [state, setState] = useState({ user: [] });
  useEffect(() => {
    if (sessionStorage.getItem("rolename") === "admin") {
      StudentApi()
        .then((response) => {
          setState({ user: response.data });
          console.log("user");
          console.log(user);
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (sessionStorage.getItem("rolename") === "student") {
      StudentOneApi()
        .then((response) => {
          setState({ user: response.data });
          console.log(user);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main role="main" className="container mt-5">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>
            <p className="text-bold ">Welcome to Online Education System</p>
          </div>
        </div>
      </main>
      <h1 className="text-center"> Users List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>course Name</th>
          </tr>
        </thead>
        <tbody>
          {state.user.map((u) => (
            <tr>
              <td>{u.email}</td>
              <td>{u.firstname}</td>
              <td>{u.lastname}</td>
              <td>{u.coursename}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// class Dashboard extends React.Component {
//   render() {
//     return (
//       <div>
//         <Navbar />
//         <main role="main" className="container mt-5">
//           <div className="container">
//             <div className="text-center mt-5">
//               <h3>Dashboard page</h3>
//               <p className="text-bold ">Welcome to Online Education System</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }
// export default Dashboard;
