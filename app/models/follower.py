from .db import db, environment, SCHEMA, add_prefix_for_prod


class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    followed_user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
    follower_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))

    followed_user = db.relationship('User', foreign_keys=[followed_user_id])
    follower = db.relationship('User', back_populates='followers', foreign_keys=[follower_id])


    def to_dict(self):
        return {
            'id': self.id,
            'followed_user_id': self.user_id,
            'follower_id': self.follower_id
        }
