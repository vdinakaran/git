import axios from "axios";
export const RegisterApi = (inputs) => {
  let data = {
    firstname: inputs.firstname,
    lastname: inputs.lastname,
    coursename: inputs.coursename,
    rolename: inputs.rolename,
    email: inputs.email,
    password: inputs.password,
  };
  return axios.post("http://localhost:1718/student/add", data);
};

export const LoginApi = (inputs) => {
  let data1 = {
    email: inputs.email,
    password: inputs.password,
    rolename: inputs.rolename,
  };
  return axios.get(
    `http://localhost:1718/student/login/${data1.email}/${data1.password}/${data1.rolename}`,
    data1
  );
};

export const StudentApi = () => {
  return axios.get(`http://localhost:1718/student/getallstudent`);
};

export const StudentOneApi = () => {
  let data = sessionStorage.getItem("email");
  return axios.get(`http://localhost:1718/student/getOne/${data}`);
};
