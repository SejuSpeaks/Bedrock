from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_post_images():
    image1 = PostImage(
        url = 'https://f4.bcbits.com/img/a0435376613_10.jpg',
        post_id = 1
    )

    image2 = PostImage(
        url='https://content.imageresizer.com/images/memes/Shrugging-Rat-meme-9.jpg',
        post_id = 3
    )

    image3 = PostImage(
        url='https://www.brooklynvegan.com/wp-content/uploads/2023/04/20/attachment-MIKE-Young-World-festival-2023.jpeg',
        post_id = 2
    )

    image5 = PostImage(
        url='https://sheshreds.com/wp-content/uploads/2019/01/synth-pt2-featured-web.png',
        post_id = 4
    )

    image6 = PostImage(
        url='https://media.wired.com/photos/6595c546f6145f9ca1309145/master/pass/_BC-wired_selmasabanovic_kaylareeferphoto-127.jpg',
        post_id = 5
    )

    image7 = PostImage(
        url='https://media4.manhattan-institute.org/wp-content/uploads/no-nyc-subways-still-arent-safe.jpg',
        post_id = 6
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
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
