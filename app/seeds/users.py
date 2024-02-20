from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
<<<<<<< HEAD
<<<<<<< HEAD
        username='Demo', email='demo@aa.io', password='password', artist_account=True, artist_name='John Cena', profile_picture='https://ntvb.tmsimg.com/assets/assets/487578_v9_bb.jpg?w=270&h=360')
=======
        username='Demo', email='demo@aa.io', password='password', artist_account=True, bio='Its John Cena i bet you did SEE that one coming MUAHAHAHAHAH' ,artist_name='John Cena', profile_picture='https://ntvb.tmsimg.com/assets/assets/487578_v9_bb.jpg?w=270&h=360')
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
        username='Demo', email='demo@aa.io', password='password', artist_account=True, bio='Its John Cena i bet you did SEE that one coming MUAHAHAHAHAH' ,artist_name='John Cena', profile_picture='https://ntvb.tmsimg.com/assets/assets/487578_v9_bb.jpg?w=270&h=360')
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', bio='Advocate for music i love music wow', artist_account=False, profile_picture='https://yt3.googleusercontent.com/ZJGwKd4H-lsmPo6cZ2WJ7aaU6uRJYOAmj-MDIDy_Se0sUu3iM41hG3KXgVz690DeEPRqxaKx=s900-c-k-c0x00ffffff-no-rj')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', artist_account=False, profile_picture='https://upload.wikimedia.org/wikipedia/commons/9/9d/MIKE_-_Bruiser_Thanksgiving%2C_2022.jpg')

    musician1 = User(
<<<<<<< HEAD
<<<<<<< HEAD
        username='musician1', email='musician1@example.com', password='password', artist_account=True, artist_name='Eric Clapton', profile_picture='https://source.unsplash.com/random/200x200')
=======
        username='musician1', email='kingkrule@aa.com', password='password', artist_account=True, artist_name='King Krule', profile_picture='https://source.unsplash.com/random/200x200')
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
    musician2 = User(
        username='musician2', email='mike@aa.com', password='password', artist_account=True, artist_name='Mike', profile_picture='https://source.unsplash.com/random/200x200')
    musician3 = User(
        username='musician3', email='wiki@aa.com', password='password', artist_account=True, artist_name='Wiki', profile_picture='https://source.unsplash.com/random/200x200')
    musician4 = User(
<<<<<<< HEAD
        username='musician4', email='musician4@example.com', password='password', artist_account=True, artist_name='Maxo', profile_picture='https://source.unsplash.com/random/200x200')
=======
        username='musician1', email='kingkrule@aa.com', password='password', artist_account=True, artist_name='King Krule', profile_picture='https://source.unsplash.com/random/200x200')
    musician2 = User(
        username='musician2', email='mike@aa.com', password='password', artist_account=True, artist_name='Mike', profile_picture='https://source.unsplash.com/random/200x200')
    musician3 = User(
        username='musician3', email='wiki@aa.com', password='password', artist_account=True, artist_name='Wiki', profile_picture='https://source.unsplash.com/random/200x200')
    musician4 = User(
        username='musician4', email='maxo@aa.com', password='password', artist_account=True, artist_name='Maxo', profile_picture='https://source.unsplash.com/random/200x200')
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
        username='musician4', email='maxo@aa.com', password='password', artist_account=True, artist_name='Maxo', profile_picture='https://source.unsplash.com/random/200x200')
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(musician1)
    db.session.add(musician2)
    db.session.add(musician3)
    db.session.add(musician4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
