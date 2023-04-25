import './../styles/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login(){
    const [inputs, setInputs] = useState({
        username: "",
        password:""
    });

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(inputs);
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
            console.log(res);
            if(res.data != null){
                document.getElementById("buttonAppear").innerHTML = '<a href="/Homepage"> Proceed to homepage </a>';
                localStorage.setItem("user", JSON.stringify(res));
            }
        }catch(err){
            console.log(err);
        }
    }


    return (
        
        <div id="parent">
            <h1> Please Log In: </h1>
            <form>
                <label for="username">Username:</label>
                <input type="username" placeholder="mynameplusnumbers" onChange={handleChange} name = "username"></input>

                <label for="password">Password:</label>
                <input type="password" placeholder="*************" onChange={handleChange} name = "password"></input>
            </form>
            <button onClick={handleSubmit}>Log In</button>
            <p> Dont have an account? <a href="/CreateProfile">Create an Account!</a></p>
            <span id="buttonAppear"></span>
        </div>
        
        
    );
}