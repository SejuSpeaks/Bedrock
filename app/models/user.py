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
    artist_account = db.Column(db.BOOLEAN, nullable=False)
    artist_name = db.Column(db.String(255), unique=True)
    bio = db.Column(db.String(255))
    profile_picture = db.Column(db.String)

    albums = db.relationship('Album', back_populates='artist')
    community = db.relationship('Community', back_populates='owner')
    communities_joined = db.relationship('Community', secondary='community_users' , back_populates='users')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    followers = db.relationship('Follower', back_populates='follower',  foreign_keys='Follower.follower_id')
    following = db.relationship('Following',back_populates='followed_user', foreign_keys='Following.followed_user_id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'artist_name': self.artist_name,
            'bio': self.bio,
        }
