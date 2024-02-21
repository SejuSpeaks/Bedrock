from app.models import db, Album, environment, SCHEMA
import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album(
        title='Man On The Moon', cover='https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg', genre='Rap', artist_id = 1, release_date = datetime.datetime(2023,1,29), description='We all live to die'
    )
    album2 = Album(
        title='Disco', cover='https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Mike_Disco_2021.jpg/220px-Mike_Disco_2021.jpg', genre='Rap', artist_id = 1, release_date = datetime.datetime(2023,6,19), description='Big Mike'
    )
    album3 = Album(
        title='TitleRun', cover='https://media.pitchfork.com/photos/599b2faad7cfca73eb7c517f/1:1/w_450%2Cc_limit/no%2520mountains%2520in%2520manhattan_wiki.jpg', genre='Rap', artist_id = 1, release_date = datetime.datetime(2023,12,12), description='Going for the win'
    )
    album4 = Album(
        title='Reflection Eternal', cover='https://upload.wikimedia.org/wikipedia/en/9/94/Train_of_Thought_album.jpg', genre='Rap', artist_id = 5, release_date = datetime.datetime(2010,12,12), description='Train of thought'
    )

    album5 = Album(
        title='LIL BIG MAN', cover='https://media.pitchfork.com/photos/5c8ffe807741b65a56c6c4e8/1:1/w_800,h_800,c_limit/Maxo_LilBigMan.jpg', genre='Rap', artist_id = 7, release_date = datetime.datetime(2010,12,12), description='Just another album man'
    )

    album6 = Album(
        title='Hotep', cover='https://media.pitchfork.com/photos/5929c43fc0084474cd0c364e/master/pass/2c13415b.png', genre='Alternative', artist_id = 6, release_date = datetime.datetime(2016,6,12), description='WE OUTSIDE'
    )

    album7 = Album(
        title='The OOZ', cover='https://media.pitchfork.com/photos/59d6ab987855fa6c9a16f2f1/master/pass/the%20ooz_king%20krule.jpg', genre='Alternative', artist_id = 4, release_date = datetime.datetime(2016,6,12), description='oozing to meet you'
    )

    album8 = Album(
        title='Faith Is a Rock', cover='https://media.pitchfork.com/photos/650314c9eda1f0c52903b58e/master/pass/Faith-Is-a-Rock.jpg', genre='Rap', artist_id = 5, release_date = datetime.datetime(2016,6,12), description='anotha Mike album'
    )

    album9 = Album(
        title='Richard D. James Album', cover='https://f4.bcbits.com/img/a1664460568_16.jpg', genre='electronic', artist_id = 7, release_date = datetime.datetime(2016,6,12), description='electric'
    )

    album10 = Album(
        title='Beware of the Monkey', cover='https://f4.bcbits.com/img/a1907825182_16.jpg', genre='Rap', artist_id = 1, release_date = datetime.datetime(2016,6,12), description='Rap album Rap album RAp album'
    )

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.add(album8)
    db.session.add(album9)
    db.session.add(album10)
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
