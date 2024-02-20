from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    artist_account = db.Column(db.BOOLEAN, nullable=False, default=False)
    artist_name = db.Column(db.String(255), unique=True)
    bio = db.Column(db.String(255))
    profile_picture = db.Column(db.String)

    albums = db.relationship('Album', back_populates='artist')
    album_likes = db.relationship('AlbumLikes', back_populates='user')
    posts = db.relationship('Post', back_populates='owner')
    community = db.relationship('Community', back_populates='owner')
    communities_joined = db.relationship('Community', secondary='community_users' , back_populates='users')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    # followers = db.relationship('Follower', back_populates='follower',  foreign_keys='Follower.follower_id')
    following = db.relationship('Follower',back_populates='follower', foreign_keys='Follower.user_id')
    followers = db.relationship('Following', back_populates='followed_user',  foreign_keys='Following.followed_user_id')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        community_id = self.community[0].id if self.community and self.community[0] else 'no community'

        return {
            'id': self.id,
            'artist_account': self.artist_account,
            'username': self.username,
            'email': self.email,
            'community_id': community_id,
            'artist_name': self.artist_name,
            'bio': self.bio,
            'profile_picture':self.profile_picture,
            'albums': [album.to_dict() for album in self.albums]
        }
