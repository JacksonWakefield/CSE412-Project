import "./../styles/Details.css";
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Details(){

    const userData = JSON.parse(localStorage.getItem("user"));
    const picData = JSON.parse(localStorage.getItem("picName"));

    const [pic, setPic] = useState();

    const [comments, setComments] = useState([]);

    const [tags, setTags] = useState([]);

    const [commentTemp, setCommentTemp] = useState();

    const [likes, setLikes] = useState(0);

    useEffect(() => {

        //TBD
        const getComments = async e =>{
            const res = await axios.post("http://localhost:8800/api/posts/getComments", [picData.PhotoID]);
            setComments(res.data);
            
        }

        const getLikes = async e =>{
            const res = await axios.post("http://localhost:8800/api/posts/getLikes", [picData.PhotoID]);
            setLikes(res.data[0]);
        }
        
        getComments();
        getLikes();
        
    })

    const handleComment = e =>{
        setCommentTemp(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleCommentSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/makeComment", [commentTemp.comment, userData.data[0]["UserID"], picData.PhotoID]);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Created Comment");
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleLike = async e =>{
        const res = await axios.post("http://localhost:8800/api/posts/addLike", [userData.data[0]["UserID"], picData.PhotoID]);
        console.log(res);
    }

    return (
        <div className="wrapper">
            <div className="header">
                <h1>Picture Details</h1>
                <div>
                    <h2>Name: {picData.PhotoID}</h2>
                    <h2>Owner: {picData.OwnerID}</h2>
                </div>
                <div>
                <img src = {require(`${picData.Data}`)}></img>
                </div>
            </div>
            <div className="Comments">
                <h3>Comments:</h3>
                <ul className="CommentsPrint">
                    {comments?.map(comment => (
                        <li key={comment.text} className="commentInd">{comment.UserID}: {comment.text}</li>
                    ))}
                </ul>
                <div>
                    <form>
                        <label for="comment">Add Comment: </label>
                        <input type="comment" name = "comment" placeholder="My Comment Here" onChange={handleComment}></input>
                    </form>
                    <button className="submitButton" onClick={handleCommentSubmit}>Submit Comment</button>
                </div>
            </div>
            <div className="likes">
                <button id="likeButton" onClick={handleLike}>Like Photo</button>
                <h4>Likes: {likes.likeCount}</h4>
            </div>
        </div>
    );
}