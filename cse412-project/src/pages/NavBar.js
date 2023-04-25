import "../styles/NavBar.css";

export default function NavBar(){
    return (
        <div className="NavBar">
            <a href="/Homepage" className="navOption">Homepage</a>
            <a href="/Profile" className="navOption">Profile</a>
            <a href="/" className="navOption">Logout</a>
            <a href="/Friends" className="navOption">Friends</a>
        </div>
        
    );
}