from .db import db, environment, SCHEMA, add_prefix_for_prod


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    album_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('albums.id')))

    album = db.relationship('Album', back_populates='songs')

    def to_dict(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'name': self.name
        }
