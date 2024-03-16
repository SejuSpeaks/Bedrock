from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',city='Gurabo', at='Howwemovematters', header='https://people.com/thmb/0bKE-8t9udDHNr8Q7OUCna7lj6Y=/1024x256/filters:no_upscale():max_bytes(150000):strip_icc()/John-Cena-c3d4f8c2a2c949fc8baa07f63e33cae9.png', artist_account=True, bio='I do my best to capture the essance of my music through rap throughout every struggle i still perseviere something bout rapping again blah blah blah' ,artist_name='John Cena', profile_picture='https://thefader-res.cloudinary.com/private_images/w_750,c_limit,f_auto,q_auto:eco/1MIKEpressphotoMAIN_relb04/1MIKEpressphotoMAIN_relb04.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', at='marnnie', password='password', bio='Advocate for music i love music wow', artist_account=False, profile_picture='https://yt3.googleusercontent.com/ZJGwKd4H-lsmPo6cZ2WJ7aaU6uRJYOAmj-MDIDy_Se0sUu3iM41hG3KXgVz690DeEPRqxaKx=s900-c-k-c0x00ffffff-no-rj')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', at='bobielovesmusic', password='password', artist_account=False, profile_picture='https://upload.wikimedia.org/wikipedia/commons/9/9d/MIKE_-_Bruiser_Thanksgiving%2C_2022.jpg', header='https://i.insider.com/5c3f952edde86702d229f76c?width=1200&format=jpeg')

    musician1 = User(
        username='musician1', email='kingkrule@aa.com', at='kingkrule', password='password', artist_account=True, artist_name='King Krule', profile_picture='https://charts-static.billboard.com/img/2013/09/king-krule-5cf-344x344.jpg')
    musician2 = User(
        username='musician2', email='mike@aa.com', at='bigMikee', password='password', artist_account=True, artist_name='Mike', profile_picture='https://source.unsplash.com/random/200x200')
    musician3 = User(
        username='musician3', email='wiki@aa.com', at='wikispeakkkks', password='password', artist_account=True, artist_name='Wiki', profile_picture='https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/unnamed_3_b5e0da/wiki-oofie-stream.jpg')
    musician4 = User(
        username='musician4', email='maxo@aa.com', at='maxobronx', password='password', artist_account=True, artist_name='Maxo', profile_picture='https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/DSC_5281_copy_e48384_gbi55y/maxo-shares-new-album-even-god-has-a-sense-of-humor.jpg')

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
