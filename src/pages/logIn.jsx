import React from "react";
import { useState } from "react";
import axios from 'axios'
import Button from "../components/button";
import InputField from "../components/inputField";
import { useHistory } from "react-router-dom";

const apiEndpoint = 'http://localhost:3000/api/users';

const LogIn = () => {
  let history = useHistory();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async () => {
    document.getElementById("userLoginEmail").value = '';
    document.getElementById("userLoginPassword").value = '';

    if(!loginEmail || !loginPassword){
        alert("Please Fill out the Field");
    }
    else {
      let present = 0;
      let index;

      const { data: users } = await axios.get(apiEndpoint)
      for(let i = 0; users[i]; i++){
        if(users[i].email == loginEmail){
          present = 1;
          index = i;
        }
      }

      if(present){
        if(users[index].password != loginPassword){
            alert("Password is Incorrect.");
        }
        else {
            localStorage.setItem('id', users[index]._id);
            history.push('/tasks');
        }
      }
      else {
        alert("Account with this Credentials doesn't exist.");
      }
    }
  };

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Please Enter Credentials</h1>
      <br />
      <br />
      <br />

      <h6>Enter your Email Address</h6>
      <InputField
        placeholder={"Type here ..."}
        id="userLoginEmail"
        onChange={() => {
          setLoginEmail(document.getElementById("userLoginEmail").value);
        }}
      />

      <br />
      <br />
      <h6>Enter your Password</h6>
      <InputField
        placeholder={"Type here ..."}
        id="userLoginPassword"
        type="password"
        onChange={() => {
          setLoginPassword(document.getElementById("userLoginPassword").value);
        }}
      />
      

      <br />
      <br />
      <Button
        text="Submit"
        className="btn btn-primary"
        onClick={handleSubmit}
      />
    </React.Fragment>
  );
};

export default LogIn;
