from app.models import db, Following, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_following():

    following1 = Following(
        user_id=1, followed_user_id =3
    )

    following2 = Following(
        user_id=3, followed_user_id =1
    )

    following3 = Following(
        user_id=2, followed_user_id =1
    )

    following4 = Following(
        user_id=1, followed_user_id =2
    )




    db.session.add(following1)
    db.session.add(following2)
    db.session.add(following3)
    db.session.add(following4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_following():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followings"))

    db.session.commit()
