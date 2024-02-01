from .db import db, environment, SCHEMA, add_prefix_for_prod


class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))

    owner = db.relationship('User', back_populates='community')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.artist_id
        }
