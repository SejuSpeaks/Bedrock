from app.models import db, Follower, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_followers():

    follower1 = Follower(
        user_id=3, follower_id =1
    )

    follower2 = Follower(
        user_id=1, follower_id =3
    )

    follower3 = Follower(
       user_id=1, follower_id =2
    )

    follower4 = Follower(
        user_id=2, follower_id =1
    )




    db.session.add(follower1)
    db.session.add(follower2)
    db.session.add(follower3)
    db.session.add(follower4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))

    db.session.commit()
