from .db import db, environment, SCHEMA, add_prefix_for_prod


class AlbumLikes(db.Model):
    __tablename__ = 'album_likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('albums.id')))
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))

    user = db.relationship('User', back_populates='album_likes')
    album = db.relationship('Album', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.id
        }
