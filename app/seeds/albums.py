from app.models import db, Album, environment, SCHEMA
import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album(
        title='Man On The Moon', cover='example.com', genre='Rap', artist_id = 1, release_date = datetime.datetime(2023,1,29), description='We all live to die'
    )
    album2 = Album(
        title='Disco', cover='example.com', genre='Rap', artist_id = 1, release_date = datetime.datetime(2023,6,19), description='Big Mike'
    )
    album3 = Album(
        title='TitleRun', cover='example.com', genre='Rap', artist_id = 1, release_date = datetime.datetime(2023,12,12), description='Going for the win'
    )

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
