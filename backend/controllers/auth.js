import { db } from "../db.js";
import sha256 from 'crypto-js/sha256.js';

export const register = (req, res) => {
    const q = "SELECT * FROM user WHERE UserID = ?";

    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User Already Exists!");

        const q2 = "INSERT INTO user (`UserID`, `FirstName`, `LastName`, `Email`, `DOB`, `Hometown`, `Gender`, `Password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.DOB,
            req.body.hometown,
            req.body.gender,
            String(sha256(req.body.password))
        ];

        db.query(q2, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        });
    });
}

export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE UserID = ? AND Password = ?";

    db.query(q, [req.body.username, String(sha256(req.body.password))], (err, data) => {
        if(err) return res.json(err);
        if(data.length) {
            return res.json(data);
        }else {
            return res.status(409).json("User Does Not Exist!");
        }
    })
}

export const logout = (req, res) => {
    
}