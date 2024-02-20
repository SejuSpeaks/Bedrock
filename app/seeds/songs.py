from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_songs():
    song5 = Song(
        album_id=1, name='The Intro', url='exampleurl.com'
    )

    song2 = Song(
        album_id=2 , name = 'The come up', url='exampleurl.com'
    )

    song3 = Song(
        album_id=3, name='No letting go', url='exampleurl.com'
    )

    song4 = Song(
        album_id=1, name='Looking back', url='exampleurl.com'
    )

    song1 = Song(
        album_id=1, name='Day n Nite', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+Kid+Cudi+Day+N+Nite-VrDfSZ_6f4U-192k-1708288007.mp3'
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
