#Users - UserID, first name, last name, email, date of birth,
#hometown, gender, and hashed password

import names
import datetime
import random
import string
import csv

def getRandomDate(start, end):
    random_date = start + (end - start) * random.random()
    random_date = "%s-%s-%s" % (random_date.year, random_date.month, random_date.day)
    return random_date

User_Col_Names = ['UserID', 'FirstName', 'LastName', 'Email', 'DOB', 'Hometown', 'Gender', 'Password']
User_Cols = []
for i in range(50):
    User_Cols.append([i, names.get_first_name(), names.get_last_name(), 'myemail' + str(i) + '@email.com',
                      getRandomDate(datetime.datetime(1980, 1, 1), datetime.datetime.now()), #DoB
                      'TownNumber' + str(random.randint(1, 100)), 'M' if random.random() > 0.5 else 'F', 
                      ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))])

#Friends - UserID, FriendID, FormationDate
Friend_Col_Names = ['UserID', 'FriendID', 'FormationDate']
Friend_Cols = []
for user in User_Cols:
    for i in range(0, random.randint(1, 5)):
        Friend_Cols.append([user[0], random.randint(0, 50), getRandomDate(datetime.datetime(2022, 1, 1), datetime.datetime.now())])


with open("User.csv", "w") as User:
    csvwriter = csv.writer(User)
    csvwriter.writerow(User_Col_Names)
    csvwriter.writerows(User_Cols)

with open("Friend.csv", "w") as Friend:
    csvwriter = csv.writer(Friend)
    csvwriter.writerow(Friend_Col_Names)
    csvwriter.writerows(Friend_Cols)

#Albums - AlbumID, Name, OwnerID, CreationDate

#Photos - PhotoID, AlbumID, Caption, Data

#Likes - UserID, PhotoID

#Tags - PhotoID, Tag

#Comments - CommentID, UserID, text, CommentDate





    