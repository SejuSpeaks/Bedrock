from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
    community_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('communities.id')))
    text = db.Column(db.String, nullable=False)

    owner = db.relationship('User', back_populates='posts')
    community = db.relationship('Community', backref='posts')
    post_images = db.relationship('PostImage', back_populates='post')
    comments = db.relationship('Comment', back_populates='post')
    likes = db.relationship('Like', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_username': self.owner.username,
            'owner_profile_picture': self.owner.profile_picture,
            'post_owner': self.user_id,
            'text': self.text,
        }
