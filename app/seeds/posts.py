from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        user_id = 2, community_id=1 ,text='Wow man this community is so cool i love it.'
    )
    post2 = Post(
        user_id = 3, community_id=1 ,text='Id love it if i could post pics on here'
    )
    post3 = Post(
        user_id = 2, community_id=1 ,text='We love a good album'
    )
    post4 = Post(
        user_id = 2, community_id=1 ,text='I really wanna make it out there for the new show lets see'
    )
    post5 = Post(
        user_id = 3, community_id=1 ,text='I see the platoform keeps imporving wow this is amazing more more more'
    )
    post6 = Post(
        user_id = 3, community_id=1 ,text='That new Pinball project kinda ehh replay value had been aight'
    )
    post7 = Post(
        user_id = 3, community_id=1 ,text='This is the post of all post the post that will save this community and put us on the map'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities"))

    db.session.commit()
