from .db import db, environment, SCHEMA, add_prefix_for_prod


class AlbumImage(db.Model):
    __tablename__ = 'album_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('albums.id')))
    url = db.Column(db.String)

    album = db.relationship('Album', back_populates='album_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }
