import React from "react";
import { useState } from "react";
import axios from 'axios'
import Button from "../components/button";
import InputField from "../components/inputField";
import { useHistory } from "react-router-dom";

const apiEndpoint = 'http://localhost:3000/api/users';

const SignUp = () => {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    document.getElementById("userName").value = '';
    document.getElementById("userEmail").value = '';
    document.getElementById("userPassword").value = '';

    if(!name || !email || !password){
        alert("Please Fill out the Field");
    }
    else {
      let isValid = 1;

      const { data: users } = await axios.get(apiEndpoint)
      for(let i = 0; users[i]; i++){
        if(users[i].email == email){
          isValid = 0;
        }
      }

      if(isValid){
        const obj = { name: name, email: email, password: password }
          
        try{
          await axios.post(apiEndpoint, obj);
        }
        catch (error){
          console.log("Error in Posting Object", error);
        }

        history.push('/log-in');
      }
      else {
        alert("An account with this Email already exists.");
      }
    }
  };

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Please Fill out the Below Fields</h1>
      <br />
      <br />
      <br />

      <h6>Enter a Username for you</h6>
      <InputField
        placeholder={"Type here ..."}
        id="userName"
        onChange={() => {
          setName(document.getElementById("userName").value);
        }}
      />

      <br />
      <br />
      <h6>Enter your Email Address</h6>
      <InputField
        placeholder={"Type here ..."}
        id="userEmail"
        onChange={() => {
          setEmail(document.getElementById("userEmail").value);
        }}
      />

      <br />
      <br />
      <h6>Enter your Password</h6>
      <InputField
        placeholder={"Type here ..."}
        id="userPassword"
        type="password"
        onChange={() => {
          setPassword(document.getElementById("userPassword").value);
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

export default SignUp;
