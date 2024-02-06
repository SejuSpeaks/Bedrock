from .db import db, environment, SCHEMA, add_prefix_for_prod


community_users = db.Table(
    'community_users',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, add_prefix_for_prod(db.ForeignKey('users.id'))),
    db.Column('community_id', db.Integer, add_prefix_for_prod(db.ForeignKey('communities.id')))
)



class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))

    owner = db.relationship('User', back_populates='community')
    users = db.relationship('User', secondary=community_users , back_populates='communities_joined')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.artist_id
        }
