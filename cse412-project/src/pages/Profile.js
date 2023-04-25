//Link to friends
//Show albums and stuff
//Link to homepage
import '../styles/Profile.css';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Profile (){

    const userData = JSON.parse(localStorage.getItem("user")); //userData.data[0]["UserID"]
    const [posts, setPosts] = useState([]);
    
    const [inputsAlbum, setInputsAlbum] = useState({
        AlbumID: "",
        UserID: userData.data[0]["UserID"]
    });

    const [inputsPhoto, setInputsPhoto] = useState({
        PhotoID: "",
        AlbumID: "",
        Caption: "",
        Data:""
    });

    const handlePhoto = e =>{
        setInputsPhoto(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handlePhotoSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/makePost", inputsPhoto);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Created Photo");
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleAlbum = e =>{
        setInputsAlbum(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleAlbumSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/makeAlbum", inputsAlbum);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Created Album");
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const getPosts = async e =>{
            const res = await axios.post("http://localhost:8800/api/posts/getPosts", [userData.data[0]["UserID"], true]);
            setPosts(res.data);
        }
        getPosts();
    })

    const [tag, setTag] = useState();

    const handleTag = e =>{
        setTag(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleTagSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/addTag", tag);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Created Album");
            }
        }catch(err){
            console.log(err);
        }
    }

    const [delAlbum, setDelAlbum] = useState();
    const [delPhoto, setDelPhoto] = useState();

    const handleDeleteAlbum = e => {
        setDelAlbum(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleDeleteAlbumSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/deleteAlbum", [delAlbum.AlbumID2]);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Deleted Album");
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleDeletePhoto = e =>{
        setDelPhoto(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleDeletePhotoSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/posts/deletePhoto", [delPhoto.PhotoID3]);
            console.log(res);
            if(res.data != null){
                console.log("Successfully Deleted Photo");
            }
        }catch(err){
            console.log(err);
        }
    }
    
    
    //const posts = getPosts();

    return (
        <div className="wrapper">
            <h1>My Profile</h1>
            <div className="albumView">
                <h2 id="albumHeader">Pictures</h2>
                {posts?.map(post=>(
                    <div className="postWrapper" key={post.PhotoID}>
                        <p id="postTitle">{post.PhotoID}</p>
                        <p id="postAlbum">Album: {post.AlbumID}</p>
                        <div className="postImg">
                            <img src={require(`${post.Data}`)} alt=""></img>
                        </div>
                    </div>
                ))}
            </div>
            <div className = "createAlbum">
                <h2>Create Album</h2>
                <form>
                    <label for="AlbumID">Album Name:</label>
                    <input type="AlbumID" placeholder="My Album" onChange={handleAlbum} name="AlbumID"></input>
                </form>
                <button id="cAlbBut" onClick={handleAlbumSubmit}>Create Album</button>
            </div>
            <div className = "createPhoto">
                <h2>Create Photo</h2>
                <form>
                    <label for="PhotoID">Photo Name:</label>
                    <input type="PhotoID" placeholder="My Photo" onChange={handlePhoto} name="PhotoID"></input>
                    <label for="AlbumID">Album Name:</label>
                    <input type="AlbumID" placeholder="My Album" onChange={handlePhoto} name="AlbumID"></input>
                    <label for="Caption">Caption:</label>
                    <input type="Caption" placeholder="My Caption" onChange={handlePhoto} name="Caption"></input>
                    <label for="PhotoSource">Photo Directory:</label>
                    <input type="PhotoSource" placeholder="./picture.jpg" onChange={handlePhoto} name="Data"></input>
                </form>
                <button id="cPhoBut" onClick={handlePhotoSubmit}>Create Photo</button>
            </div>
            <div className="addTag">
                <h2>Add Tag to Photo</h2>
                <form>
                    <label for="PhotoID2">Photo to Tag (Name):</label>
                    <input type="PhotoID2" placeholder="Name of Photo" onChange={handleTag} name="PhotoID2"></input>
                    <label for="TagID">Enter Tag:</label>
                    <input type="TagID" placeholder="Name of Tag" onChange={handleTag} name="TagID"></input>
                </form>
                <div>
                    <button id="tagButton" onClick={handleTagSubmit}>Add Tag</button>
                </div>
                
            </div>
            <div className="deleteAlbum">
                <h2>Delete Album</h2>
                <form>
                    <label for="AlbumID2">Album To Delete:</label>
                    <input type="AlbumID2" placeholder="Name of Album" onChange={handleDeleteAlbum} name="AlbumID2"></input>
                </form>
                <button id="deleteAlbumButton" onClick={handleDeleteAlbumSubmit}>Delete Album</button>
            </div>
            <div className="deletePhoto">
                <h2>Delete Photo</h2>
                <form>
                    <label for="PhotoID3">Photo To Delete:</label>
                    <input type="PhotoID3" placeholder="Name of Photo" onChange={handleDeletePhoto} name="PhotoID3"></input>
                </form>
                <button id="deletePhotoButton" onClick={handleDeletePhotoSubmit}>Delete Photo</button>
            </div>
        </div>
    );
}