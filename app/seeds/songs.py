from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_songs():
    song5 = Song(
        album_id=1, name='The Intro', url='exampleurl.com'
    )

    song2 = Song(
        album_id=2 , name = 'Aww zaza', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+MIKE+Aww+Zaza+-K3XB4eQuCLM-192k-1708495282.mp3'
    )

    song3 = Song(
        album_id=3, name='No letting go', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+Wiki+Pretty+Bull+Official+Music+Video+-29f1FTjTcZs-192k-1708495382.mp3'
    )

    song4 = Song(
        album_id=4, name='Looking back', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+Blast--n3GM5TIUPk-192k-1708495843.mp3'
    )

    song1 = Song(
        album_id=1, name='Day n Nite', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+Kid+Cudi+Day+N+Nite-VrDfSZ_6f4U-192k-1708288007.mp3'
    )

    song6 = Song(
        album_id=5, name='In My Pennys', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+Maxo+In+My+Penny+s-bxGSOP6vZ9w-192k-1708495899.mp3'
    )

    song7 = Song(
        album_id=6, name='Jennahs Interlude', url='https://d137d42ac0f4ae-songs.s3.amazonaws.com/y2mate.is+-+Jennah+s+Interlude-fwtBilr944Q-192k-1708496037.mp3'
    )



    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song6)
    db.session.add(song7)
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
