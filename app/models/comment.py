from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('posts.id')))
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
    text = db.Column(db.String(255), nullable=False)

    post = db.relationship('Post', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'text':self.text,
            'profile_picture': self.user.profile_picture,
            'username': self.user.username,
            'post_id': self.post_id,
            'user_id': self.user_id
        }
