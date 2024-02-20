from .db import db, environment, SCHEMA, add_prefix_for_prod


class Following(db.Model):
    __tablename__ = 'followings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
    followed_user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
=======
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    followed_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

    user = db.relationship('User', foreign_keys=[user_id])
    followed_user = db.relationship('User', back_populates='followers', foreign_keys=[followed_user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'followed_user_id': self.followed_user_id,
            'profile_picture':self.user.profile_picture,
            'username': self.user.username
        }
