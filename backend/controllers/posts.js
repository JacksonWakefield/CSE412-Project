import { db } from "../db.js";


export const makeAlbum = (req, res) => {
    const q = "SELECT * FROM album WHERE AlbumID = ?";

    db.query(q, [req.body.AlbumID], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("Album name Already Exists!");

        const q2 = "INSERT INTO album (`AlbumID`, `Name`, `OwnerID`, `CreationDate`) VALUES (?)";
        
        const values = [
            req.body.AlbumID,
            req.body.AlbumID,
            req.body.UserID,
            "2023-04-23"
        ];

        db.query(q2, [values], (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json("Album Created!");
        });
    });
}

export const makePost = (req, res) => {
    const q = "SELECT * FROM photo WHERE PhotoID = ?";

    db.query(q, [req.body.PhotoID], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("Photo name Already Exists!");

        const q2 = "INSERT INTO photo (`PhotoID`, `AlbumID`, `Caption`, `Data`) VALUES (?)";
        const values = [
            req.body.PhotoID,
            req.body.AlbumID,
            req.body.Caption,
            req.body.Data
        ]

        db.query(q2, [values], (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json("Photo Created!");
        });
    });
}

export const getPosts = (req, res) => {
    var addOn = "";
    if(req.body[3] && req.body[2].length != 0){
        for(var i = 0; i < req.body[2].tagSearch.length; i++){
            addOn += " AND PhotoID IN (SELECT PhotoID FROM tag WHERE TagID = \"" + req.body[2].tagSearch[i] + "\")";
            //return res.json("WORKED");
        }
    }

    if(req.body[5] && req.body[4].length != 0){
        addOn += " AND PhotoID IN (SELECT PhotoID FROM comment WHERE text = \"" + req.body[4].commentSearch + "\")";
    }

    const q = "SELECT * FROM photo WHERE AlbumID IN \( SELECT AlbumID FROM album WHERE OwnerID = ?\)" + addOn;
    const q2 = "SELECT * FROM photo WHERE AlbumID NOT IN \( SELECT AlbumID FROM album WHERE OwnerID = ?\)" + addOn;

    //console.log(q);

    if(req.body[1]){
        db.query(q, [req.body[0]], (err, data) => {
            if(err) return res.json(err);
            
            return res.status(200).json(data);
        });
    }else{
        db.query(q2, [req.body[0]], (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json(data);
        });
    }
    
}

export const getComments = (req, res) => {
    const q = "SELECT * FROM comment WHERE PhotoID = ?";
    db.query(q, req.body[0], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const makeComment = (req, res) => {
    const q = "INSERT INTO comment (`text`, `UserID`, `PhotoID`, `CommentDate`) VALUES (?)";
    const values = [
        req.body[0],
        req.body[1],
        req.body[2],
        '2023-04-23'
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json("Sucessfully Submitted Comment");
    });
}

export const makeTag = (req, res) => {

}

export const getPicByID = (req, res) => {
    const q = "SELECT * FROM photo AS a, album AS b WHERE PhotoID = ? AND a.AlbumID = b.AlbumID";

    db.query(q, [req.body[0]], (err, data) => {
        if(err) return res.json("here");
        return res.status(200).json(data);
    })
}

export const addTag = (req, res) => {
    const q = "INSERT INTO tag (`TagID`, `PhotoID`) VALUES (?)";


    const values = [
        req.body.TagID,
        req.body.PhotoID2
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json("Successfully Submitted Tag");
    })
}

export const getFriends = (req, res) => {
    const q = "SELECT * FROM friend AS F, user AS U WHERE F.FriendID = U.UserID AND F.UserID = ?";

    db.query(q, [req.body[0]], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
}

export const addFriend = (req, res) => {
    const q = "INSERT INTO friend (`UserID`, `FriendID`, `FormationDate`) VALUES (?)"

    const values = [
        req.body[0],
        req.body[1],
        '2023-04-23'
    ];

    //return res.json(values);

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json("Successfully Added Friend");
    })
}

export const deleteAlbum = (req, res) => {
    
    const q = "DELETE FROM comment WHERE PhotoID IN (SELECT PhotoID FROM photo WHERE AlbumID = ?)"
    const albval = [req.body[0]];

    db.query(q, albval, (err, data) => {
        if(err) return res.json(err);
        
        const q2 = "DELETE FROM tag WHERE PhotoID IN (SELECT PhotoID FROM photo WHERE AlbumID = ?)"
        

        db.query(q2, albval, (err2, data2) => {
            if(err2) return res.json(err2);
            const q3 = "DELETE FROM photo WHERE AlbumID = ?"

            db.query(q3, albval, (err3, data3) => {
                if(err3) return res.json(err3);
                const q4 = "DELETE FROM album WHERE AlbumID = ?"

                db.query(q4, albval, (err4, data4) => {
                    if(err4) return res.json(err4);
                    return res.status(200).json("Deleted Album");
                })
            })
        })
    });
}

export const deletePhoto = (req, res) => {
    
    const q = "DELETE FROM comment WHERE PhotoID = ?";
    const albval = [req.body[0]];

    db.query(q, albval, (err, data) => {
        if(err) return res.json(err);
        
        const q2 = "DELETE FROM tag WHERE PhotoID = ?";
        

        db.query(q2, albval, (err2, data2) => {
            if(err2) return res.json(err2);
            const q3 = "DELETE FROM photo WHERE PhotoID = ?";

            db.query(q3, albval, (err3, data3) => {
                if(err3) return res.json(err3);
                return res.status(200).json("Deleted Photo");
            })
        })
    })
};

export const getPopularTags = (req, res) =>{
    const q = "SELECT TagID FROM tag GROUP BY TagID ORDER BY COUNT(TagID) DESC";

    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const addLike = (req, res) => {
    const q = "INSERT INTO likes (`UserID`, `PhotoID`) VALUES (?)";

    const values = [
        req.body[0],
        req.body[1]
    ]

    console.log(values);
    db.query(q, [values], (err, data) =>{
        if(err) return res.json(err);
        return res.status(200).json("Successfully Added Like");
    })
}

export const getLikes = (req, res) => {
    const q = "SELECT COUNT(PhotoID) AS likeCount FROM likes WHERE PhotoID = ?";

    db.query(q, [req.body[0]], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const getTopUsers = (req, res) => {

    const q1 = "SELECT B.OwnerID, COUNT(B.OwnerID) AS UserTotal\
        FROM photo AS A, album AS B\
        WHERE A.AlbumID = B.AlbumID\
        GROUP BY B.OwnerID\
        ORDER BY UserTotal DESC";

    
    db.query(q1, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })

    

}

export const getRecFriends = (req, res) =>{
    const q = "SELECT FriendID, COUNT(FriendID) AS friendCount FROM friend WHERE UserID IN (SELECT FriendID FROM friend WHERE UserID=?) GROUP BY FriendID ORDER BY friendCount DESC LIMIT 10";
    db.query(q, [req.body[0]], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}