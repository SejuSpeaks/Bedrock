from app.models import db, AlbumLikes, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_album_likes():
    like1 = AlbumLikes(
        user_id = 2,
        album_id = 1
    )

    like2 = AlbumLikes(
        user_id=3,
        album_id = 1
    )

    like3 = AlbumLikes(
        user_id= 2,
        album_id = 3
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_album_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_likes"))

    db.session.commit()
