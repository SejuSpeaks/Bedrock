from .db import db, environment, SCHEMA, add_prefix_for_prod


class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
    follower_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
=======
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

    user = db.relationship('User', foreign_keys=[user_id])
    follower = db.relationship('User', back_populates='following', foreign_keys=[follower_id])


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follower_id': self.follower_id,
            'username': self.follower.username,
            'profile_picture':self.follower.profile_picture,
        }
