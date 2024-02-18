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
        album_id=1, name='Day n Nite', url='https://d137d42ac0f4ae-songs.s3.us-east-1.amazonaws.com/y2mate.is%20-%20Kid%20Cudi%20Day%20N%20Nite-VrDfSZ_6f4U-192k-1708288007.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBwaCXVzLWVhc3QtMiJHMEUCIHs9hQzJgO%2FrAV%2F%2FsCD3nmh7oUS7mLurMdXVe5Ht%2BhnEAiEAtyLgxFp2H0uw8olOelpJjShw9PXW0dRfbluIUBVyywwq7QII9f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NzUwNTAwNzU0MTciDJOqnbcKq2b7E7gdairBAk5AX83E3NUiwWXIManKu3Apmjh91rPzdm3qh4SQO2SAOawm5O1DZ3t6yENlY%2FR%2Bj0ftnV3eWDSLdU9jg8mo8gmi32WmDjvzJTrHiaub3fovmEfreBD7njithjWLlJ0zXD1pzQX1O69fH7slxoiXlzliAUmawOpYFvXskyrBq9mtAsmQYBpxdc6gwkVkfTUM7rHw2N0JP4YOkztrC8cdH8zCtmeFVGFVhghRlem6DHrcyWyB21v9mRDlRlDlWqAVdhVO%2FY%2B6qYFjxhDLeV893MegbfmrpHnbBOR35BLyLk%2FE76OM80Sn5zjknT5p13KwDR%2BewSjh1ePqj3RlItUuiF95Mjc6%2Bc58QCaJfgC8zwRHde1Uf4hxgtXZv7haMgpx%2F4CEBnqRTKM1NGNdfllRYh%2BIi6917QPKyLz0fbpXrcFUETD7ycmuBjqzApCgbKy3LdC4UhZqOYf4TUkpd%2F4DkPrLCBn1WfZ2SMKkXXvyaZQnS5RBSN3TFubjHQhRWbGDG4EYCum1lCkA3A%2BWwQ4QtVirKj9RwblFXcScZ5fPZHgSUTwRJ6Fo9o91bWIGeOCfUCSc%2FzfN3H0EFhm7q4pTnHHegRcqg3Gr%2F7Zg9K%2BtS23wWQmshkUjW5M01loLYe4mb4j5aHaXRgWkP2NT%2Fsz%2BpDPiL%2BJHGhkhfaHnNfCvcE0ijt63D9U8e%2B29RRJCzF%2F2sNmjOUhvZk82AFbaES6lGeloKwyKdlHe05DhKZCifDayE7AiqaGjqMb2iZZMpvgzMZOYSJ0EKYdQm%2FzMtYdMAWa9zQqMPrKqUl3p3%2BkOkvk%2Fp4NU9Dggyhr6hVVZuFKcgI6N6SIpEZCxpPH8D38%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240218T225451Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA6GBMDNUM2653KCP2%2F20240218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=95c0b3ab20d9f1435eb38bffeb01052e3c6148c9b6e3d0f3357001820f505b54'
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
