from flask.cli import AppGroup
from .users import seed_users, undo_users
from .albums import seed_albums, undo_albums
from .communities import seed_communities, undo_communities
from .posts import seed_posts, undo_posts
from .likes import seed_likes, undo_likes
from .comments import seed_comments, undo_comments
from . followers import seed_followers, undo_followers
from .following import seed_following, undo_following
from .songs import seed_songs, undo_songs
from .tags import seed_tags, undo_tags
from.album_images import seed_album_images, undo_album_images
from.post_images import seed_post_images, undo_post_images
from .album_likes import seed_album_likes, undo_album_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_albums()
        undo_communities()
        undo_posts()
        undo_likes()
        undo_comments()
        undo_followers()
        undo_following()
        undo_songs()
        undo_tags()
        undo_post_images()
        undo_album_images()
        undo_album_likes()

    seed_users()
    seed_albums()
    seed_communities()
    seed_posts()
    seed_likes()
    seed_comments()
    seed_followers()
    seed_following()
    seed_songs()
    seed_tags()
    seed_post_images()
    seed_album_images()
    seed_album_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_albums()
    undo_communities()
    undo_posts()
    undo_likes()
    undo_comments()
    undo_followers()
    undo_following()
    undo_songs()
    undo_tags()
    undo_post_images()
    undo_album_images()
    undo_album_images()
    # Add other undo functions here
