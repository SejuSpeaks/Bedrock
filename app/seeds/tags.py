from app.models import db, Tag, album_tags, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags():
    tag1 = Tag(
        name='Rap'
    )

    tag2 = Tag(
        name='Alternative'
    )

    tag3 = Tag(
        name='10k'
    )

    tag5 = Tag(
        name='Electronic'
    )

    tag6 = Tag(
        name='Rock'
    )

    tag7 = Tag(
        name='Soul'
    )


    tag4 = Tag(
        name='all genres'
    )


    db.session.add(tag4)
    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.commit()

    album_tag1 = album_tags.insert().values(album_id=1, tag_id=2)
    album_tag1_half = album_tags.insert().values(album_id=1, tag_id=7)
    album_tag2 = album_tags.insert().values(album_id=2, tag_id=2)
    album_tag3 = album_tags.insert().values(album_id=3, tag_id=2)
    album_tag4 = album_tags.insert().values(album_id=9, tag_id=5)
    album_tag5 = album_tags.insert().values(album_id=7, tag_id=2)
    album_tag6 = album_tags.insert().values(album_id=2, tag_id=4)
    album_tag7 = album_tags.insert().values(album_id=2, tag_id=4)
    album_tag8 = album_tags.insert().values(album_id=10, tag_id=4)
    album_tag9 = album_tags.insert().values(album_id=6, tag_id=7)
    album_tag10 = album_tags.insert().values(album_id=5, tag_id=3)
    album_tag11 = album_tags.insert().values(album_id=9, tag_id=3)
    album_tag12 = album_tags.insert().values(album_id=9, tag_id=6)


    db.session.execute(album_tag1)
    db.session.execute(album_tag1_half)
    db.session.execute(album_tag2)
    db.session.execute(album_tag3)
    db.session.execute(album_tag4)
    db.session.execute(album_tag5)
    db.session.execute(album_tag6)
    db.session.execute(album_tag7)
    db.session.execute(album_tag8)
    db.session.execute(album_tag9)
    db.session.execute(album_tag10)
    db.session.execute(album_tag11)
    db.session.execute(album_tag12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
