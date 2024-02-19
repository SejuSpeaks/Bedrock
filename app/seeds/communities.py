from app.models import db, Community, community_users, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_communities():
    demo1_community = Community(
        artist_id = 1
    )
    demo2_community = Community(
        artist_id = 4
    )
    demo3_community = Community(
        artist_id = 5
    )
    demo4_community = Community(
        artist_id = 6
    )
    demo5_community = Community(
        artist_id = 7
    )


    db.session.add(demo1_community)
    db.session.add(demo2_community)
    db.session.add(demo3_community)
    db.session.add(demo4_community)
    db.session.add(demo5_community)
    db.session.commit()


    member1 = community_users.insert().values(user_id=2, community_id=1)
    member2 = community_users.insert().values(user_id=3, community_id=1)



    db.session.execute(member1)
    db.session.execute(member2)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities"))

    db.session.commit()
