import '../styles/HomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function HomePage(){
    
    const userData = JSON.parse(localStorage.getItem("user")); //userData.data[0]["UserID"]
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const [filter, setFilter] = useState(false);

    const [popularTags, setPopularTags] = useState([]);
    const [topUsers, setTopUsers] = useState([]);

    const changeFilter = e =>{
        setFilter(!filter);
    }

    useEffect(() => {
        const getPosts = async e =>{
            //console.log(tagSearchBool);
            const res = await axios.post("http://localhost:8800/api/posts/getPosts", [userData.data[0]["UserID"], filter, tagSearch, tagSearchBool, commentSearch, commentSearchBool]);
            if(res.data.length != undefined){;
                setPosts(res.data);
            }else{
                console.log(res.data);
                setPosts([]);
            }
            //console.log(userData.data[0][]);
        }

        const getPopularTags = async e => {
            const res = await axios.post("http://localhost:8800/api/posts/getPopularTags");
            if(res.data.length != undefined){;
                setPopularTags(res.data);
            }else{
                console.log(res.data);
                setPopularTags([]);
            }
        }

        const getTopUsers = async e => {
            const res = await axios.post("http://localhost:8800/api/posts/getTopUsers");
            if(res.data.length != undefined){
                setTopUsers(res.data);
            }else{
                setPopularTags();
            }
        }

        getPosts();
        getPopularTags();
        getTopUsers();
    })

    const handleDetails = async e =>{
        const res = await axios.post("http://localhost:8800/api/posts/getPicByID", [e.target.name]);

        localStorage.setItem("picName", JSON.stringify(res.data[0]));
        navigate("/details");
    }

    const [tagSearch, setTagSearch] = useState([]);
    const [tagSearchBool, setTagSearchBool] = useState(false);

    const [commentSearch, setCommentSearch] = useState([]);
    const [commentSearchBool, setCommentSearchBool] = useState(false);

    const handleTagSearch = e =>{
        const splitString = e.target.value.split(' ');
        //console.log(splitString);

        setTagSearch(prev => ({...prev, [e.target.name]: splitString}));
    }

    const handleTagSearchSubmit = e =>{
        setTagSearchBool(!tagSearchBool);
        console.log(tagSearchBool);
    }

    const handleCommentSearch = e => {
        setCommentSearch(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleCommentSearchSubmit = e =>{
        setCommentSearchBool(!commentSearchBool);
    }

    //popular tags
    


    return (
        <div className = "HomePage">
            <h1 id="hp">Homepage</h1>
            <h1>Browse</h1>
            <div className="filterUserCheck">
                <label for="filterUser">See only your Photos:</label>
                <input type="checkbox" id="filterUser" name="filterUser" onChange={changeFilter}></input>
            </div>
            <div className="tagSearch">
                <label for="tagSearch">Search By Tag: </label>
                <input type="tagSearch" id="tagSearchInput" name="tagSearch" onChange={handleTagSearch} placeholder="MyTag MyTag2"></input>
                <input type="checkbox" id = "tagSearchCheck" name="tagSearchBool" onChange={handleTagSearchSubmit}></input>
            </div>
            <div className="commentSearch">
                <label for="commentSearch">Search By Comment: </label>
                <input type="commentSearch" id="commentSearchInput" name="commentSearch" onChange={handleCommentSearch} placeholder="My Comment"></input>
                <input type="checkbox" id = "commentSearchCheck" name="commentSearchBool" onChange={handleCommentSearchSubmit}></input>
            </div>
            <div className="popularTags">
                <h1 id="popTagHead">Popular Tags:</h1>
                <ul className="popTagUl">
                    {popularTags?.map(tag =>(
                        <li key={tag.TagID} className="popularTag">{tag.TagID}</li>
                    ))}
                </ul>
                
            </div>

            <div className="topUsers">
                <h1 id="topUserHead">Top Users:</h1>
                <ul className="topUsersUl">
                    {topUsers?.map(user =>(
                        <li key={user.UserID} className="topUser">{user.OwnerID}</li>
                    ))}
                </ul>
                
            </div>
            
            

            <div className="albumView">
                <h2 id="albumHeader">Pictures</h2>
                {posts?.map(post=>(
                    <div className="postWrapper" key={post.PhotoID}>
                        <p id="postTitle">{post.PhotoID}</p>
                        <p id="postAlbum">Album: {post.AlbumID}</p>
                        <p id="caption">{post.Caption}</p>
                        <div className="postImg">
                            <img src={require(`${post.Data}`)} alt=""></img>
                        </div>
                        <button className="moreDetails" onClick={handleDetails} name = {post.PhotoID}>See Image Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}