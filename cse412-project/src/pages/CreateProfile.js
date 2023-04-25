import './../styles/CreateProfile.css';
import { useState } from 'react';
import axios from "axios";

//UserID,FirstName,LastName,Email,DOB,Hometown,Gender,Password
export default function CreateProfile(){

    const [inputs, setInputs] = useState({
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        email:"",
        DOB:"",
        hometown:"",
        gender:""
    });

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log("lksjdflsdkjf");
            const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
            console.log(res);
            document.getElementById("pAppear").innerHTML = "<p id='pAppear'> Account Creation Success! Proceed back to login page </p>";
        }catch(err){

            console.log(err);
        }
    }

    console.log(inputs);
    return (
        <div className = "CreateProfile">
            <h1>Create an Account:</h1>
            <form>
                <label for="username">Username:</label>
                <input type="username" placeholder="mynameplusnumbers" onChange={handleChange} name = "username"></input>

                <label for="password">Password:</label>
                <input type="password" placeholder="*************" onChange={handleChange} name = "password"></input>

                <label for="FirstName">First Name:</label>
                <input type="FirstName" placeholder="John" onChange={handleChange} name = "firstname"></input>
                <label for="LastName">Last Name:</label>
                <input type="LastName" placeholder="Doe" onChange={handleChange} name = "lastname"></input>
                <label for="email">Email:</label>
                <input type="email" placeholder="myemail@email.com" onChange={handleChange} name = "email"></input>
                <label for="DOB">Date of Birth:</label>
                <input type="DOB" placeholder="YYYY/MM/DD" onChange={handleChange} name = "DOB"></input>
                <label for="Hometown">Hometown:</label>
                <input type="Hometown" placeholder="City Name" onChange={handleChange} name = "hometown"></input>
                <label for="Gender">Gender:</label>
                <input type="Gender" placeholder="M/F/Other" onChange={handleChange} name = "gender"></input>
            </form>
            <button onClick={handleSubmit}>Create Profile</button>
            <p>Back to <a href="/">log in</a></p>
            <span id="pAppear"></span>
        </div>
    );
}