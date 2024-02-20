from .db import db, environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    post_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('posts.id')))
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
=======
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

    post = db.relationship('Post', back_populates='likes')
    user = db.relationship('User', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id
        }
