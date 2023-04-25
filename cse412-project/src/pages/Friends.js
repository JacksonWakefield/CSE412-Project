import "../styles/Friends.css";
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Friends(){

    const userData = JSON.parse(localStorage.getItem("user")); //userData.data[0]["UserID"]
    const [friends, setFriends] = useState([]);
    const [f, setF] = useState();
    const [recFriends, setRecFriends] = useState([]);

    useEffect(() => {
        const getFriends = async e =>{
            const res = await axios.post("http://localhost:8800/api/posts/getFriends", [userData.data[0]["UserID"]]);

            setFriends(res.data);
        }

        const getRecFriends = async e => {

            const res = await axios.post("http://localhost:8800/api/posts/getRecFriends", [userData.data[0]["UserID"]]);
            console.log(res.data);
            setRecFriends(res.data);
        }
        getFriends();
        getRecFriends();
    })

    const handleF = e =>{
        setF(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleFSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/addFriend", [userData.data[0]["UserID"], f.UserID]);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Added Friend");
            }
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div className="wrapper">
            <div className="headerFriends">
                <h1>Your Friends</h1>
                <ul>
                    {friends?.map(friend => (
                        <li key={friend.FriendID} className="friendInd">{friend.FirstName} {friend.LastName}</li>
                    ))}
                </ul>
                
            </div>
            <div className="footerFriends">
                <h1>Add Friends</h1>
                <form>
                    <label for="UserID">Enter Username of friend to add: </label>
                    <input type="UserID" placeholder="Friend Username" name="UserID" onChange={handleF}></input>
                    
                </form>
                <button id="addFriendButton" onClick={handleFSubmit}>Add Friend</button>
            </div>
            
            <div className="reccomendHeader">
                <h1>Recommended Friends</h1>
                    {recFriends.map(recFriend => (
                        <li key={recFriend.FriendID}>UserID: {recFriend.FriendID}</li>
                    ))}
            </div>

        </div>
    );
}