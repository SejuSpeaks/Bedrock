from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_post_images():
    image1 = PostImage(
        url = 'example.com',
        post_id = 1
    )

    image2 = PostImage(
        url='example.com',
        post_id = 1
    )

    image3 = PostImage(
        url='example.com',
        post_id = 2
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_images"))

    db.session.commit()
