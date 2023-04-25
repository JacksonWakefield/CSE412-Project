Select * from photo;
Select * from tag;
SELECT * from album;
SELECT * FROM Friend;
SELECT * FROM comment;
SELECT * FROM user;
SELECT * FROM likes;

/* this section of SQL code contains the basic structure of every SQL command that I ran 
through the REACT JS library Express. There are many places where I input specific variables
server-side that I can't show here, since they are run on different values depending on the
user who is logged in, values that are in fields, etc. Whenever these values come up I will
replcae them with a "?" so that you know that this is what is occuring. I tried to write
the queries as clear as possible, so it should be easy to tell what the internal elements
of the queries are doing. I'll also include a short descriptor for each function I run
(can be more than one related query both used in one API call) for clarification.*/

/*Also, most of these queries are also in my project directory with path 
"/backend/controllers/posts.js"
or "/backend/controllers/auth.js"*/

/*Check to see if an AlbumID already exists. If so, deny request to create new album*/
SELECT * FROM album WHERE AlbumID = ?

INSERT INTO album (`AlbumID`, `Name`, `OwnerID`, `CreationDate`) VALUES (?)

/*print out posts for Homepage, and include all different filters including viewing just
the logged in user's photos or all photos and searches for tags and comments*/

/*This one is just the basic structure of it*/
SELECT * FROM photo WHERE AlbumID IN \( SELECT AlbumID FROM album WHERE OwnerID = ?\)

/*These two are added on depending on which tags or what comment or both are requested*/
AND PhotoID IN (SELECT PhotoID FROM tag WHERE TagID = ?) /*This one specifically is looped  on itself for every tag*/
AND PhotoID IN (SELECT PhotoID FROM comment WHERE text = ?)

/*Fetch comments on post*/
SELECT * FROM comment WHERE PhotoID = ?

/*insert comment*/
/*you can see how these INSERTs work in-code in the project directory I listed above*/
INSERT INTO comment (`text`, `UserID`, `PhotoID`, `CommentDate`) VALUES (?) 

/*insert tag*/
INSERT INTO tag (`TagID`, `PhotoID`) VALUES (?)

/*Fetch all friends of given user*/
SELECT * FROM friend AS F, user AS U WHERE F.FriendID = U.UserID AND F.UserID = ?

/*insert friend*/
INSERT INTO friend (`UserID`, `FriendID`, `FormationDate`) VALUES (?)

/*delete album*/
/*This one is quite complex, but all of these queries are run separately but sequencially to preserve
integrity. Deleted in this order: comments, tags, photos, album*/
DELETE FROM comment WHERE PhotoID IN (SELECT PhotoID FROM photo WHERE AlbumID = ?)

DELETE FROM tag WHERE PhotoID IN (SELECT PhotoID FROM photo WHERE AlbumID = ?)

DELETE FROM photo WHERE AlbumID = ?

DELETE FROM album WHERE AlbumID = ?

/*also to note - this exact same setup is used when deleting photos, but only the first three statements
above are called (same order, of course). I'll go ahead and not re-add them here*/

/*Fetch the most popular tags among all photos*/
SELECT TagID FROM tag GROUP BY TagID ORDER BY COUNT(TagID) DESC

/*insert like*/
INSERT INTO likes (`UserID`, `PhotoID`) VALUES (?)

/*Fetch likes on certain photo*/
SELECT COUNT(PhotoID) AS likeCount FROM likes WHERE PhotoID = ?

/*Fetch the top users based on user contribution*/
SELECT B.OwnerID, COUNT(B.OwnerID) AS UserTotal
FROM photo AS A, album AS B
WHERE A.AlbumID = B.AlbumID
GROUP BY B.OwnerID

/*Reccomend friends based on Friends-Of-Friends*/
SELECT FriendID, COUNT(FriendID) AS friendCount 
FROM friend WHERE UserID IN 
	(SELECT FriendID FROM friend WHERE UserID=?) 
GROUP BY FriendID ORDER BY friendCount DESC LIMIT 10