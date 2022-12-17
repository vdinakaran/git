import React from "react";
import { LoginApi } from "../services/Api";
class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    LoginApi().then((response) => {
      this.setState({ users: response.data });
    });
  }
  render() {
    return (
      <div>
        <h1 className="text-center"> Users List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <td> User First Name</td>
              <td> User Last Name</td>
              <td> User Email Id</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.email}>
                <td> {user.firstname}</td>
                <td> {user.lastname}</td>
                <td> {user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default StudentList;
